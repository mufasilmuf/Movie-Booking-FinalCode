const db = require("../models");
//-----generate a uuid token----------------------------
//tokgen.generate(); its generate a token.....
const TokenGenerator = require("uuid-token-generator");
//-----generate a uuid token----------------------------
//----generate a uuid4 for the id---------------
//uuid(); its generate a new id.........
const { uuid } = require("uuidv4");
//----generate a uuid4 for the id---------------
const User = db.users;

//it create a new user...
exports.signUp = async (req, res) => {
  const { email_address, password } = req.body;
  try {
    if (email_address && password) {
      const userEmail = await User.findOne({ email: email_address });
      // if user had already been registered
      if (userEmail) {
        res.status(400).json({ message: "User already exists" });
        return;
      }
      try {
        // registering the user
        const newUserId = (await User.find({}).count()) + 1;
        const { first_name, last_name, mobile_number, role } = req.body;
        const newUser = new User({
          userid: newUserId,
          email: email_address,
          first_name,
          last_name,
          username: `${first_name}${last_name}`,
          contact: mobile_number,
          password,
          role: role ? role : "user",
          isLoggedIn: false,
          uuid: "",
          accesstoken: "",
        });
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
      } catch (err) {
        console.log(err);
        res
          .status(500)
          .json({ message: "Some error occured, please try again" });
        return;
      }
    } else {
      res.status(400).json({ message: "Email / Password not entered" });
    }
  } catch (error) {
    res.status(500).json({ message: "Some error occured, please try again" });
  }
};

//login for user...
exports.login = async (req, res) => {
  try {
    const b2a = require("b2a");
    const header = req.header("Authorization").split(" ")[1];
    // decoding the credentials from the header
    const credentials = b2a.atob(header);
    const [username, password] = credentials.split(":");
    // if either username or password field is left blank
    if (!username || !password) {
      res
        .status(400)
        .json({ message: "Please enter your username / password" });
      return;
    }
    const userInDB = await User.findOne({ username });
    if (userInDB) {
      if (password === userInDB.password) {
        // if user is already logged in
        if (userInDB.isLoggedIn) {
          res.status(400).send("You are already logged in");
          return;
        }
        try {
          const tokenObj = new token();
          // generating access token
          const accesstoken = tokenObj.generate();
          // generating uuid for the user
          const id = uuid();
          // updating the login status of the user
          const updatedUserDetails = await User.findOneAndUpdate(
            { username },
            {
              isLoggedIn: true,
              uuid: id,
              accesstoken,
            },
            { new: true }
          );
          res.status(200).json({ id, "access-token": accesstoken });
        } catch (err) {
          console.log(err);
          res
            .status(500)
            .json({ message: "Some error has occured, please try again" });
        }
      } else {
        console.log("Invalid password");
        res.status(401).json({ message: "Invalid username / password" });
      }
    } else {
      res.status(400).send("Please sign up");
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Some error has occured, please try again");
  }
};

//logout for user...
exports.logout = async (req, res) => {
  try {
    const { uuid: uuidUser } = req.body;
    // checking if the user had logged in before or not
    if (uuidUser) {
      try {
        // updating the login status of the user
        const user = await User.findOneAndUpdate(
          { uuid: uuidUser },
          {
            isLoggedIn: false,
            uuid: "",
            accesstoken: "",
          },
          { new: true }
        );
        console.log("logged out");
        res.status(200).json({ message: "Logged Out successfully." });
        return;
      } catch (err) {
        res.status(401).json({ message: "User not found" });
      }
    } else {
      console.log("id not provided");
      res
        .status(400)
        .json({ message: "Please provide credentials to log out" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Some error occured, please try again" });
  }
};

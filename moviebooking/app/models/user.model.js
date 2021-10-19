module.exports = (mongoose) => {
  const User = mongoose.model(
    "users",
    mongoose.Schema(
      {
        userid: {
          type: Number,
          require: true,
        },
        email: {
          type: String,
          require: true,
        },
        first_name: {
          type: String,
          require: true,
        },
        last_name: {
          type: String,
          require: true,
        },
        username: {
          type: String,
          require: true,
        },
        contact: {
          type: String,
          require: true,
        },
        password: {
          type: String,
          require: true,
        },
        role: {
          type: String,
          require: true,
        },
        isLoggedIn: {
          type: Boolean,
          require: true,
        },
        uuid: {
          type: String,
          require: false,
        },
        accesstoken: {
          type: String,
          require: false,
        },
        coupens: [
          {
            id: {
              type: Number,
              require: true,
            },
            discountValue: {
              type: Number,
              require: true,
            },
          },
        ],
        bookingRequests: [
          {
            reference_number: {
              type: Number,
              require: true,
            },
            coupon_code: {
              type: Number,
              require: true,
              show_id: {
                type: Number,
                require: true,
              },
              tickets: [{}],
            },
          },
        ],
      },
      { timestamps: true }
    )
  );
  return User;
};

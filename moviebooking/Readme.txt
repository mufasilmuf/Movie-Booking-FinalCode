No.	Movie Data-Related 

API Routes(needs to be prefixed with root URL)                                         Description
1. 	GET /movies?status=PUBLISHED	This API returns all movies from the database with a status set as “PUBLISHED”; this is handled through the condition in the code.
2.	GET /movies?status=RELEASED	    This API returns all movies from the database with a status set as “RELEASED” ”; this is handled through the condition in the code.
3.	GET /movie/{movieId}	        This API returns details about the movie with id passed as a parameter; this is handled through the condition in code.
4.	GET/movies?status=RELEASED&     
    title={title}&genres={genres}   This API returns all movie data with the filter criteria matching with the parameters passed; this is handled through the condition in the code
    &artists={artists}& 
    start_date={startdate}&end_date={enddate}	
5.	GET movies/{movieid}/shows	    This API returns “shows” available for a specific movie with id passed as a parameter.


No.	Login & Booking related 
      API route            	Description
1.  POST /signup      This API will collect new users' data and add it to the DB.
2.	POST /login	      This API will collect credentials and return the access token if valid.
3.	POST /logout	  This API will remove access token entries from DB.
4.	GET /coupons	  This API will get discount coupons based on id.
5.	POST /bookings	  This API will add show booking related entry and return a reference number stored in DB.

No.	Artist and Genres related 
         API route      	Description
1.	GET /artists	 This API returns all artists from the database.
2.	GET /genres	     This API returns all genres from the database.
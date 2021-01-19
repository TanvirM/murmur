#Features
* The user can follow other users.
* By following, a list of murmurs posted by other users is displayed in the timeline.
* The user can post murmur as many times as he wants.
* Only the user who posted can delete his murmur.
* The user can add LIKE to another person's murmur.
* User authentication (With google firebase).
* user Registration


#Setup:

##MySQL Server
Create a MySQL DB named "murmur"
user : "murmur_db_user",
password : "mmr_pass",

Import the dummy data from ./bd/murmur.sql

# Open terminal
CMD `cd server`
RUN `npm install`
RUN `npm start`

then  `cd ../client/`
RUN `npm install`
RUN `npm start`
PRESS `y` if needed

server: localhost:3000
client : localhost:3001

#Technology used
- ReactJS for front end 
- NodeJS with Express
- Google firebase for Authentication

#APIs

## Dashboard or Timeline
-/api/murmurs/

## Post murmur(create)
-/api/me/murmurs/

## Delete murmur
-/api/me/murmurs/:id/

## Murmur detail
-/api/murmurs/:id/

## Profile
-/api/me/

## Profile Detail
-/api/me/detail/

## Other User Profile
-/api/user/:id/

## Other User Detail
-/api/user/:id/detail/

## List of the user's murmurs
-/api/user/:id/murmurs/

## Murmur detail
-/api/murmur/:id/detail/

## Give like
-/api/user/:id/murmur/:id/give-like/

## Unlike (delete like)
-/api/unlike/:id/murmur/:id/

## Follow user
-/api/user/:id/following/:id/

## Follow user
-/api/user/:id/unfollow/:id/

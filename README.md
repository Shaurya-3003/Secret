# Secret
A website to share and view secrets anonymously  

## Scripts
  - **npm run dev** : Launches client and server simultaneously from the main folder
  - **npm start** : Launches only client from client folder
  - **nodemon index.js** : Launches only server from server folder

## Important
  - Passport Authentication uses cookies. Thus client needs to be launched on 127.0.0.1 instead of localhost
  - Above is handled by local env file for local developement

## Possible Updates
  1. Update Passport-Local Strategy to have usernameField="email" and take username on login
  2. Add Google Auth
  3. Simplify user collection to store reference to posts wherever possible

# Have I Seen This?

## Description

My father has an Excel sheet with a list of all the movies he has ever seen. He doesn't really have it organized in any way. He just basically writes a movie down after he sees it and that's about it. Inspired by that, I want to create an app/site that will be a much better organized and better looking version of that list. Users will be able to efficiently keep track and look up any movie and whether he or she has seen it.

## Tech Stack
I plan on using React to handle the front end design and Ruby on Rails for the backend database and authentication. I will also be implementing the TMDB (The Movie Database) API to pull information for movies.
## Wireframes

#### Home Page
![Home Page](./wireframes/IMG_0856.JPG)

#### Register/Login Pages
![Register/Login Pages](./wireframes/IMG_0860.JPG)

#### Single Movie Page
![Single Movie Page](./wireframes/IMG_0858.JPG)

#### Seen Movies Page
![Seen Movies](./wireframes/IMG_0859.JPG)

## User Stories
When a user goes to the site, they will be able to browse through movies displayed on the page and to search for different titles. They will even be able to click on a movie and see its information displayed (name, release year, director, cast, synopsis, etc.). However, if a user wants to mark whether they have seen a particular film, he or she will need to be logged in to their own account.

Users will be able to register for a new profile where they will provide a username, password, and email address. Upon registration, users will be logged in and be redirected to the homepage with the list of movies. If a user is returning, they will be able to log in at the top of the main page and subsequently log out from there as well. 

Now that the user is logged in, they can begin compiling their list of movies they have seen. User will be able to search for a movie in a search tab at the top of the screen. Once they have entered the title of the movie they are looking for, the API call should return the data for that particular movie. The user should be able to navigate to the movie's individual page and click on a button/icon (this is TBD) to mark whether they have seen it and after they click that button, they can also write if they know the year or even exact date they saw the film (this will admittedly apply more to just-seen films instead of movies seen several years ago). Once this happens, the user will be redirected to their personalized list of movies they have seen.

On this 'Seen Movies' list, a user will be able to open each movies individual page to look at that movie's information. If a user sees a movie in their list they actually have not seen, they will have the option to be able to delete it.
## Database Structure
This project will have at least two tables: a users table and a movies table.

| Users          |
| -------------- | 
| Username       | 
| password_digest| 
| session_token  | 
| email          | 


| Movies       |
| ------------ |
| Title        |
| Tagline      |
| Synopsis     |
| Poster       |
| Genre        |
| Runtime      |
| Release Date |
| Production Company |

This is just a proposed data structure with basic information. This could certainly change as development progresses.                 
## Project Timeline

The short version of this section is as follows: Rails/back-end stuff followed by React/front-end stuff followed by design/CSS.

#### Phase 1

The more detailed version of my timeline toward completetion starts with creating my database, tables, and models. After that, I plan on setting up my routes on the back end followed by creating the methods for my controllers. To wrap up what I need to do on the back end, I will set up my external API

#### Phase 2

After initializing everything on the back-end, I will run `create-react-app` and get started setting up React. I'll `gem install foreman` to get the back and front ends able to work in sync together and after that, I will work on figuring out what components I will need for the project. After that, I will work on getting the home page set up. After that, I will work on setting up a movie's individual page. Both of these components will require setting up my API call on the front end, so that will be done at this point as well so I can begin to see data actually render.

#### Phase 3

After I get those basic components working, I will then begin to implement authentication on the front end. After that, I will work on adding the ability to mark a movie as seen on the single movie component. After that, I'll start working on the 'Seen Movies List' component and connecting movies marked as seen so they will appear on the list of seen movies.

### MVP

#### Phase 4

Styling, bug fixes, and any potential new features that I haven't thought up yet if I have time, which, considering how hard this project is going to be for me thanks to `React`, I doubt I'll be able to do, but it's good to have stretch goals.
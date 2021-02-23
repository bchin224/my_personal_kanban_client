# My Personal Kanban Client
My Personal Kanban is exactly that, your very own Kanban Board! You can add cards to your to-do list, move them to being in progress, and then file them under complete so you know when to start the next task. Great for project managers who use agile and scrum methodologies or for anyone who just likes to check things off their to-do list.

![Imgur](https://i.imgur.com/XnKEwqR.png)

## Links
- [Deployed Client](https://bchin224.github.io/my_personal_kanban_client/)
- [Backend Repo](https://github.com/bchin224/my_personal_kanban_api)
- [Deployed Backend](https://mypersonalkanban22321.herokuapp.com/)

## Planning Process & Problem-Solving Strategy
2/17
- Setting up React front-end client and github repo.

2/18
- Updated url's on auth routes
- Fixed token passing for authenticated components
- Added columns for Kanban Board
- Build button for adding cards
- Got React Modal to open and close through button click

2/19
- Adjusted modal sizing
- Made handleChange and handleCreate functions
- Renamed all cardData to card to match the django card_views.py
- Successfully made axios POST request to create a card

2/20
- Successfully index all cards
- Successfully filtered all cards into respective columns

2/21
- Added update card functionality
- Successfully delete a card functionality
- Began styling for board, column and cards

2/22
- Changed browser title icon
- Adjusted background color to gradient
- Edit and delete buttons now identify the correct resource
- Changed index call to a function that can be called after every other call (refresh)
- Added background and images to unauthenticated homepage
- Fixed footer alignment to the bottom of the screen
- Removed console.logs
- Added message alerts for CRUD actions
- Finishing touches

## Install Preparation
1. Fork and clone this repository.
2. Create and checkout to a new branch for your work.
3. Install any necessary dependencies (React, Boostrap, Dropdown, Modals, etc)
4. Run `npm start` to start launch the application in your local browser.

## User Stories
- As a user, I want to be able to sign up
- As a user, I want to be able to sign in
- As a user, I want to be able to change my password
- As a user, I want to be able to sign out
- As a user, I want to be able to create new kanban cards
- As a user, I want to be able to edit existing kanban cards
- As a user, I want to be able to delete kanban cards
- As a user, I want to be able to change the status of each kanban card
- As a user, I only want to see kanban cards on my kanban board

## Technologies
* HTML/SCSS
* JavaScript
* React
* Bootstrap 4
* Axios

## Wireframe
![Imgur](https://i.imgur.com/ibM7V6R.jpg)

## Unsolved Problems
- Code needs to be refactored
- Cards can extend beyond their respective column length
- Would like to allow a user to save multiple kanban boards for multiple projects

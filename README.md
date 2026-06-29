# Tripleten web_project_around_es

## first stage

This project is part of a web development learning process focused on connecting JavaScript to an HTML page and working with basic programming concepts. In this stage, an array called `initialCards` was created, containing six objects with a name and an image link. The project uses a forEach() method to loop through the array and render the cards on the page.

## second stage

In this stage of the project, the logic to edit the user profile using a popup form was implemented. DOM elements such as forms, inputs, and profile information were selected, and reusable functions were created to open and close the popup. The profile information can be updated dynamically without reloading the page.

## third stage

The functionality to create new cards, like cards, delete cards, and preview images in a popup was added. Form validation was also implemented to ensure that user input is valid before submitting the forms.

## TypeScript and OOP refactor

After building the project with JavaScript, I started refactoring it using TypeScript and Object-Oriented Programming. The code was reorganized into different classes so that each part of the application would have a clear responsibility and be easier to maintain.

- Card is responsible for creating and managing individual cards.
- Section handles displaying cards on the page.
- Popup contains the functionality shared by all popup windows.
- PopupWithImage is used to display image previews.
- PopupWithForm handles forms inside popup windows.
- FormValidator manages form validation and submit button states.
- UserInfo handles displaying and updating the user's profile information.

## API integration

In this stage, the project was connected to the Around API. User information, initial cards, profile editing, new cards, likes, card deletion, and avatar updates are now handled through server requests using a dedicated Api class.

## Technologies used

- HTML5
- CSS3
- JavaScript (ES6 Modules)
- TypeScript
- Object-Oriented Programming (OOP)
- Git
- GitHub

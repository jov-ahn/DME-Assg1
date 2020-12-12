# About Storybook

Storybook is a mobile app that allows users to write a collection of stories about their lives — throughout their lives.

## Design Process

Have you ever had a "I want to remember this moment forever" moment? If so, then Storybook is perfect for you. If not, are you even living?

And thus, Storybook was created.

Here are some User Stories:
- As a teen, I want to write stories about my wild moments, so that I can tell them to my future grandkids.
- As an aspiring writer, I want to write down important moments in my life, so that I will have material for my biography if I ever become famous.
- As an aging old man, I want to leave stories behind, so that future generations will know about our time.

Wireframes:
https://xd.adobe.com/view/dfb7af14-67ef-4ac2-95d0-29796f9ec242-8ae4/?fullscreen

## Features

### Existing Features
- 1. Users can add, delete and edit stories
- 2. Users can customize their profile
- 3. Users can customize the color of their avatar
- 4. Users can reset their profile details
- 5. Users can delete all stories

### Features Left to Implement
- Account system
- Option to undo the deletion of a story
- Addition of media (images, videos, gifs) in stories
- More categorization using "Chapters"
- Sharing of stories through links
- Dark mode

## Technologies Used

- [JQuery](https://jquery.com/)
    - The project uses **JQuery** to simplify DOM manipulation.
    
- [Ionic](https://ionicframework.com/)
    - The project uses **Ionic** for mobile UI components.
    
- [UI Avatars](https://ui-avatars.com/)
    - The project uses **UI Avatars** to generate user avatars.
    
## Testing

1. Adding a story:
    1. Go to the "Home" tab
    2. Tap on the plus icon near the bottom of the screen
    3. Try to submit the empty form and verify that an error message about the required fields appears
    4. Try to submit the form with one input valid and verify that an error message about the required fields appears
    5. Try to submit the form with all inputs valid and verify that a success message appears
    6. Try to submit the form again while the success message is showing and verify that the action is blocked
    7. Wait for the success message to disappear and verify that you are automatically redirected back to the home tab.
    
2. Editing a story:
    1. Go to the "Home" tab
    2. Swipe right on any story
    3. Tap on "Edit" and verify that the correct edit page shows up
    4. Try to submit an empty form and verify that an error message about the required fields appears
    5. Try to submit the form with one input valid and verify that an error message about the required fields appears
    6. Try to submit the form with all inputs valid and verify that a success message appears
    7. Try to submit the form again while the success message is showing and verify that the action is blocked
    8. Wait for the success message to disappear and verify that you are automatically redirected back to the home tab.
    
3. Deleting a story:
    1. Go to the "Home" tab
    2. Swipe left on the any story
    3. Tap on "Delete" and verify that the correct story is deleted
    
4. Search for a story:
    1. Go to the "Home" tab
    2. Tap on "Search"
    3. Try searching for a story title and verify that it appears
    4. Try editing the story as shown above
    5. Try deleting the story as shown above and verify that you are automatically redirected back to the home tab.
    
5. Delete all stories:
    1. Go to the "Profile" tab
    2. Tap on "Delete All Stories" and verify that a confirmation box appears
    3. Tap on "Cancel" and verify that nothing changes
    4. Tap on "Delete All Stories" again
    5. Tap on "Confirm" and verify that all stories are deleted
    
6. Customize profile:
    1. Go to the "Profile" tab
    2. Try to submit an empty form and verify that an error message about the required fields appears
    3. Try to submit the form with an empty display name OR email address and verify that an error message about the required fields appears
    4. Try to submit the form with an invalid hex code for the avatar background AND/OR font color and verify that the invalid input reverts back to its previous value
    5. Try to submit the form with all inputs valid and verify that a success message appears
    
7. Reset profile:
    1. Go to the "Profile" tab
    2. Tap on "Reset Profile" and verify that a confirmation box appears
    3. Tap on "Cancel" and verify that nothing changes
    4. Tap on "Reset Profile" again
    5. Tap on "Confirm" and verify that all inputs are reset to their default values.
    
### Bugs
- Tapping on the clear icon in the searchbar after searching for a story does not load back the whole list of stories. Users will have to hit backspace IF they choose to use the clear icon.

## Credits

### Acknowledgements

- https://dribbble.com/shots/11293510-Nerdoo-Journal-Keeping-App
- https://dribbble.com/shots/8279338--Journalling-App-Dark-vs-Light-Mode

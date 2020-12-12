$(document).ready(function() {
    const storyToRead = JSON.parse(sessionStorage.getItem('storyToRead'));

    const stories = JSON.parse(localStorage.getItem('stories'));
    const storyTitle = stories[storyToRead].title;
    const storyContents = stories[storyToRead].contents;

    $('#read-story-title').text(`Now Reading: ${storyTitle}`);
    $('#read-story-contents').val(storyContents);
});
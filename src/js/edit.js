async function presentToast(msg, color) {
    const toast = document.createElement('ion-toast');
    toast.message = msg;
    toast.color = color;
    toast.duration = 2000;

    document.body.appendChild(toast);
    return toast.present();
}

$(document).ready(function() {
    const storyToEdit = JSON.parse(sessionStorage.getItem('storyToEdit'));

    let stories = JSON.parse(localStorage.getItem('stories'));
    let storyTitle = stories[storyToEdit].title;
    let storyContents = stories[storyToEdit].contents;

    $('#edit-story-title').val(storyTitle);
    $('#edit-story-contents').val(storyContents);

    $('#save-story-changes-btn').click(function () {
        if ($('#edit-story-title').val() !== "" && $('#edit-story-contents').val() !== "") {
            // Disables the button to prevent multiple submissions
            $(this).attr('disabled', 'true');
            
            const newStoryTitle = $('#edit-story-title').val();
            const newStoryContents = $('#edit-story-contents').val();
            
            stories[storyToEdit].title = newStoryTitle;
            stories[storyToEdit].contents = newStoryContents;
            
            localStorage.setItem('stories', JSON.stringify(stories));
            presentToast(`Story renamed to ${newStoryTitle}`, 'success');
            setTimeout(function () {
                window.location.href = 'index.html';
            }, 1000);
        }
        else {
            presentToast('Error: Missing fields', 'danger');
        }
    });
});
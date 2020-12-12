let stories = [];

class Story {
    constructor(title, contents) {
        this.title = title;
        this.contents = contents;
    }
}

function loadStories() {
    $('#list-of-stories').children().remove();
    
    if (stories.length === 0) {
        $('#list-of-stories').prepend(`
            <ion-text color="medium" class="ion-text-center">
                <h4>No stories to display</h4>
                <p>Tap on the plus icon to add one.</p>
            </ion-text>
        `);
    }

    for (let i = 0; i < stories.length; i++) {
        $('#list-of-stories').prepend(`
            <ion-item-sliding class="view-story-details" id=${i}>
                <ion-item>
                    <ion-label>${stories[i].title}</ion-label>
                </ion-item>

                <ion-item-options side="start">
                    <ion-item-option color="primary" class="edit-story-btn">Edit</ion-item-option>
                </ion-item-options>

                <ion-item-options side="end">
                    <ion-item-option color="danger" class="delete-story-btn">Delete</ion-item-option>
                </ion-item-options>
            </ion-item-sliding>
        `);
    }
}

async function presentToast(msg, color) {
    const toast = document.createElement('ion-toast');
    toast.message = msg;
    toast.color = color;
    toast.duration = 2000;

    document.body.appendChild(toast);
    return toast.present();
}

$(document).ready(function () {
    if (localStorage.getItem('stories') === null) {
        let defaultStory = new Story('Welcome to Storybook!', 'To get started, tap on the plus icon near the bottom of your screen.');

        stories.push(defaultStory);
        localStorage.setItem('stories', JSON.stringify(stories));
    }
    else {
        stories = JSON.parse(localStorage.getItem('stories'));
    }

    loadStories();

    $(document).on('click', '#add-story', function () {
        if ($('#story-title').val() !== "" && $('#story-contents').val() !== "") {
            const storyTitle = $('#story-title').val();
            const storyContents = $('#story-contents').val();
            const newStory = new Story(storyTitle, storyContents);

            stories.push(newStory);
            localStorage.setItem('stories', JSON.stringify(stories));
            presentToast(`New Story Added: ${storyTitle}`, 'success');
            setTimeout(function () {
                window.location.href = 'index.html';
            }, 1000);
        }
        else {
            presentToast('Error: Missing fields', 'danger');
        }
    });

    $(document).on('click', '.delete-story-btn', function () {
        const storyToDelete = $(this).closest('.view-story-details').attr('id');
        stories.splice(storyToDelete, 1);
        localStorage.setItem('stories', JSON.stringify(stories));
        loadStories();
    })

    $(document).on('click', '.edit-story-btn', function () {
        sessionStorage.setItem('storyToEdit', JSON.stringify($(this).closest('.view-story-details').attr('id')));
        window.location.href = 'edit.html';
    })
});
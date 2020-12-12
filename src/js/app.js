let stories = [];
let defaultUser;

class User {
    constructor(displayName, email, avatarBgColor, avatarFontColor) {
        this.displayName = displayName;
        this.email = email;
        this.avatarBgColor = avatarBgColor;
        this.avatarFontColor = avatarFontColor;
    }
}

class Story {
    constructor(title, contents) {
        this.title = title;
        this.contents = contents;
    }
}

function loadDefaultUser() {
    $('#storybook-title').text(defaultUser.displayName);
    $('#profile-avatar').attr('src', `https://ui-avatars.com/api/?length=1&size=128&name=${defaultUser.displayName}&background=${defaultUser.avatarBgColor}&color=${defaultUser.avatarFontColor}`);
    $('#profile-display-name').val(defaultUser.displayName);
    $('#profile-email').val(defaultUser.email);
    $('#profile-avatar-bg-color').val(defaultUser.avatarBgColor);
    $('#profile-avatar-font-color').val(defaultUser.avatarFontColor);
}

function loadStories() {
    $('#story-list').children().remove();

    if (stories.length === 0) {
        $('#story-list').prepend(`
            <ion-text color="medium" class="ion-text-center">
                <h4>No stories to display</h4>
                <p>Tap on the plus icon to add one</p>
            </ion-text>
        `);
    }

    for (let i = 0; i < stories.length; i++) {
        $('#story-list').prepend(`
            <ion-item-sliding class="story-list-item" id=${i}>
                <ion-item class="read-story-btn">
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

    $(document).on('click', '#add-story-btn', function () {
        if ($('#story-title').val() !== "" && $('#story-contents').val() !== "") {
            // Disables the button to prevent multiple submissions
            $(this).attr('disabled', 'true');

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

    $(document).on('click', '.read-story-btn', function () {
        sessionStorage.setItem('storyToRead', JSON.stringify($(this).closest('.story-list-item').attr('id')));
        window.location.href = 'read.html';
    });

    $(document).on('click', '.edit-story-btn', function () {
        sessionStorage.setItem('storyToEdit', JSON.stringify($(this).closest('.story-list-item').attr('id')));
        window.location.href = 'edit.html';
    });

    $(document).on('click', '.delete-story-btn', function () {
        const storyToDelete = $(this).closest('.story-list-item').attr('id');

        stories.splice(storyToDelete, 1);
        localStorage.setItem('stories', JSON.stringify(stories));

        loadStories();

        $('#search-story').val('');
    });

    if (localStorage.getItem('defaultUser') === null) {
        defaultUser = new User('John', 'john@doe.com', '5260ff', 'fff');

        localStorage.setItem('defaultUser', JSON.stringify(defaultUser));
    }
    else {
        defaultUser = JSON.parse(localStorage.getItem('defaultUser'));
    }

    loadDefaultUser();

    $(document).on('click', '#save-profile-changes-btn', function () {
        if ($('#profile-display-name').val() !== "" && $('#profile-email').val() !== "" && $('#profile-avatar-bg-color').val() !== "" && $('#profile-avatar-font-color').val() !== "") {
            let newDisplayName = $('#profile-display-name').val();
            let newEmail = $('#profile-email').val();
            let newAvatarBgColor = $('#profile-avatar-bg-color').val();
            let newAvatarFontColor = $('#profile-avatar-font-color').val();
            // https://stackoverflow.com/a/8027444
            const hexPattern = /^([0-9A-F]{3}){1,2}$/i;

            defaultUser.displayName = newDisplayName;
            defaultUser.email = newEmail;
            if (hexPattern.test(newAvatarBgColor)) {
                defaultUser.avatarBgColor = newAvatarBgColor;
            }
            if (hexPattern.test(newAvatarFontColor)) {
                defaultUser.avatarFontColor = newAvatarFontColor;
            }
            localStorage.setItem('defaultUser', JSON.stringify(defaultUser));

            presentToast('Account information updated', 'success');
            loadDefaultUser();
        }
        else {
            presentToast('Error: Missing fields', 'danger');
        }
    });

    $(document).on('keyup', '#search-story', function (e) {
        // https://stackoverflow.com/a/57093996
        const query = e.target.value;

        if (query !== "") {
            $('#story-list').children().remove();

            let queryMatches = [];

            for (const story of stories) {
                if (story.title.toLowerCase().includes(query.toLowerCase())) {
                    queryMatches.push(story);
                }
            }

            for (const queryMatch of queryMatches) {
                const originalIndex = stories.indexOf(queryMatch);

                $('#story-list').prepend(`
                    <ion-item-sliding class="story-list-item" id=${originalIndex}>
                        <ion-item class="read-story-btn">
                            <ion-label>${queryMatch.title}</ion-label>
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
        else {
            loadStories();
        }
    });
});
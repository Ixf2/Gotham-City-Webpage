// ==========================================================
// BLOCK CODE 1
// ==========================================================
function createAndDisplaySuggestion(suggestionData) {
    const list_container = document.getElementById('suggestions-list-container');

    if (!list_container) return;

    const suggestion_div = document.createElement('article');
    suggestion_div.classList.add('commit-card');
    suggestion_div.dataset.id = suggestionData.date;

    //FORMAT DATE. Here i need help to AI. I don´t know how to do it
    const date = new Date(suggestionData.date).toLocaleDateString();

    let contentHTML = `
        <div class="commit-header">
            <p class="commit-name">First Name and Surname: <strong>${suggestionData.name}</strong></p>
            <p class="commit-name">Email: <strong>${suggestionData.email}</strong></p>
            <button class="delete-btn" data-id="${suggestionData.date}">❌ Eliminar</button>
        </div>
        <div class="commit-body">
            <p class="commit-text">Suggestion: <span>${suggestionData.suggestion}</span></p>
            <p class="commit-date">Submitted on: ${date}</p>
        </div>
        <div class="commit-img">`;

    //LATER IN TIME BASE64 IMAGE
    if (suggestionData.imageBase64) {
        contentHTML += `<img src="${suggestionData.imageBase64}" alt="Image suggestion">`;
    }
    // But i don`t prepare the img Base64, this is a notification.
    else if (suggestionData.imageName) {
        contentHTML += `<p>Image: ${suggestionData.imageName} (Local file not displayed)</p>`;
    }

    contentHTML += `</div>`;

    suggestion_div.innerHTML = contentHTML;
    list_container.prepend(suggestion_div);

    suggestion_div.querySelector('.delete-btn').addEventListener('click', handleDeleteSuggestion);
}

function handleDeleteSuggestion(e) {
    const id_to_delete = e.target.dataset.id;

    const suggestions_element = e.target.closest('.commit-card');
    if (suggestions_element) {
        suggestions_element.remove();
    }

    let existing_suggestions = JSON.parse(localStorage.getItem('suggestions')) || [];

    existing_suggestions = existing_suggestions.filter(
        suggestion => suggestion.date !== id_to_delete
    );

    localStorage.setItem('suggestions', JSON.stringify(existing_suggestions));

    alert(`Sugerencia (ID: ${id_to_delete}) eliminada correctamente.`);
}



//Funtion aux for guard centrel and previsualitation
function saveAndDisplay(data) {
    const form = document.querySelector('#form-suggestion-new-character-or-comics form');
    // LOCALSTORAGE
    const existing_suggestions = JSON.parse(localStorage.getItem('suggestions')) || [];
    existing_suggestions.push(data);
    localStorage.setItem('suggestions', JSON.stringify(existing_suggestions));

    //Read immediacy.
    createAndDisplaySuggestion(data);

    alert('Form submitted successfully and saved locally!');

    if (form) {
        form.reset();
    }
}



// ==========================================================
// BLOCK CODE 2
// ==========================================================
document.addEventListener('DOMContentLoaded', function () {
    const existing_suggestions = JSON.parse(localStorage.getItem('suggestions')) || [];

    existing_suggestions.forEach(suggestion => {
        createAndDisplaySuggestion(suggestion);
    });
});





// ==========================================================
// BLOCK CODE 3
// ==========================================================
const form = document.querySelector('#form-suggestion-new-character-or-comics form');

if (form) {
    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const name = document.getElementById('name-and-surname').value.trim();
        const email = document.getElementById('Email').value.trim();
        const suggestion = document.getElementById('suggestion-text').value.trim();
        const img = document.getElementById('img-suggestion').files[0];


        if (!name) {
            alert('You must enter your first and last name.');
            return;
        }


        if (!email) {
            alert('You must enter your email address.');
            return;
        }


        //Validation email. Here i can search in the google, w3schol and AI. 
        //How do I create a form with email validations 
        const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email_pattern.test(email)) {
            alert('Please enter a valid email address.');
            return;
        }


        if (!suggestion) {
            alert('You must write your suggestion.');
            return;
        }

        //IMAGE IS OPTIONAL
        if (img && !img.type.startsWith('image/')) {
            alert('The file must be an image.');
            return;
        }


        if (img) {
            const reader = new FileReader();
            reader.onload = function (event) {
                const base64_image = event.target.result;

                const new_suggestion_with_img = {
                    name: name,
                    email: email,
                    suggestion: suggestion,
                    imageBase64: base64_image,
                    date: new Date().toISOString()
                }
                saveAndDisplay(new_suggestion_with_img);
            }
            //Read the file Base64
            reader.readAsDataURL(img);

        } else {
            const new_suggestion_no_img = {
                name: name,
                email: email,
                suggestion: suggestion,
                imageBase64: null,
                date: new Date().toISOString()
            };
            saveAndDisplay(new_suggestion_no_img);
        }
    });
};
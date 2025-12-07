//Reference: https://developer.mozilla.org/es/docs/Web/JavaScript/Guide
//Reference: https://www.w3schools.com/js/js_htmldom.asp
//Reference: https://javascript.info
//Reference: https://stackoverflow.com/questions/4976344/what-is-dom-summary-and-importance
//Reference: video to the class for LocalStorage, and valitation.
//Reference: work the validation https://github.com/tcrurav/JavaScriptFormValidationExample 


// ==========================================================
// BLOCK CODE 1
// ==========================================================
function createAndDisplaySuggestion(suggestionData) {
  const LIST_CONTAINER = document.getElementById('suggestions-list-container');

  if (!LIST_CONTAINER) return;

  const SUGGESTION_DIV = document.createElement('article');
  SUGGESTION_DIV.classList.add('commit-card');
  SUGGESTION_DIV.dataset.id = suggestionData.date;

  //FORMAT DATE. Here i need help to AI. I don´t know how to do it
  const DATE = new Date(suggestionData.date).toLocaleDateString();

  let contentHTML = `
        <div class="commit-header">
            <p class="commit-name">Name or Nickname: <strong>${suggestionData.name}</strong></p>
            <p class="commit-name">Email: <strong>${suggestionData.email}</strong></p>
            <button class="delete-btn" data-id="${suggestionData.date}">❌ Eliminar</button>
        </div>
        <div class="commit-body">
            <p class="commit-text">Suggestion: <span>${suggestionData.suggestion}</span></p>
            <p class="commit-date">Submitted on: ${DATE}</p>
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

  SUGGESTION_DIV.innerHTML = contentHTML;
  LIST_CONTAINER.prepend(SUGGESTION_DIV);

  SUGGESTION_DIV.querySelector('.delete-btn').addEventListener('click', handleDeleteSuggestion);
}

function handleDeleteSuggestion(e) {
  const ID_TO_DELETE = e.target.dataset.id;

  const SUGGESTIONS_ELEMENT = e.target.closest('.commit-card');
  if (SUGGESTIONS_ELEMENT) {
    SUGGESTIONS_ELEMENT.remove();
  }

  let existing_suggestions = JSON.parse(localStorage.getItem('suggestions')) || [];

  existing_suggestions = existing_suggestions.filter(
    suggestion => suggestion.date !== ID_TO_DELETE
  );

  localStorage.setItem('suggestions', JSON.stringify(existing_suggestions));

  alert(`Sugerencia (ID: ${ID_TO_DELETE}) eliminada correctamente.`);
}



//Funtion aux for guard centrel and previsualitation
function saveAndDisplay(data) {
  const FORM = document.querySelector('#form-suggestion-new-character-or-comics form');
  // LOCALSTORAGE
  const EXISTING_SUGGESTIONS = JSON.parse(localStorage.getItem('suggestions')) || [];
  EXISTING_SUGGESTIONS.push(data);
  localStorage.setItem('suggestions', JSON.stringify(EXISTING_SUGGESTIONS));

  //Read immediacy.
  createAndDisplaySuggestion(data);

  alert('Form submitted successfully and saved locally!');

  if (FORM) {
    FORM.reset();
  }
}



// ==========================================================
// BLOCK CODE 2
// ==========================================================
document.addEventListener('DOMContentLoaded', function () {
  const EXISTING_SUGGESTIONS = JSON.parse(localStorage.getItem('suggestions')) || [];

  EXISTING_SUGGESTIONS.forEach(suggestion => {
    createAndDisplaySuggestion(suggestion);
  });
});





// ==========================================================
// BLOCK CODE 3
// ==========================================================
// const form = document.querySelector('#form-suggestion-new-character-or-comics form');

// if (form) {
//     form.addEventListener('submit', function (e) {
//         e.preventDefault();

//         const name = document.getElementById('name-and-surname').value.trim();
//         const email = document.getElementById('Email').value.trim();
//         const suggestion = document.getElementById('suggestion-text').value.trim();
//         const img = document.getElementById('img-suggestion').files[0];


//         if (!name) {
//             alert('You must enter your first and last name.');
//             return;
//         }


//         if (!email) {
//             alert('You must enter your email address.');
//             return;
//         }


//         //Validation email. Here i can search in the google, w3schol and AI. 
//         //How do I create a form with email validations 
//         const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//         if (!email_pattern.test(email)) {
//             alert('Please enter a valid email address.');
//             return;
//         }


//         if (!suggestion) {
//             alert('You must write your suggestion.');
//             return;
//         }

//         //IMAGE IS OPTIONAL
//         if (img && !img.type.startsWith('image/')) {
//             alert('The file must be an image.');
//             return;
//         }


//         if (img) {
//             const reader = new FileReader();
//             reader.onload = function (event) {
//                 const base64_image = event.target.result;

//                 const new_suggestion_with_img = {
//                     name: name,
//                     email: email,
//                     suggestion: suggestion,
//                     imageBase64: base64_image,
//                     date: new Date().toISOString()
//                 }
//                 saveAndDisplay(new_suggestion_with_img);
//             }
//             //Read the file Base64
//             reader.readAsDataURL(img);

//         } else {
//             const new_suggestion_no_img = {
//                 name: name,
//                 email: email,
//                 suggestion: suggestion,
//                 imageBase64: null,
//                 date: new Date().toISOString()
//             };
//             saveAndDisplay(new_suggestion_no_img);
//         }
//     });
// };


// ==========================================================
// BLOCK CODE 4. VALIDATION
// ==========================================================
document.addEventListener("DOMContentLoaded", () => {
  const FORM = document.querySelector('#form-suggestion-new-character-or-comics form');

  FORM.addEventListener("submit", function (e) {
    e.preventDefault();

    const NAME = document.getElementById("name-and-surname");
    const EMAIL = document.getElementById("Email");
    const SUGGESTION = document.getElementById("suggestion-text");
    const IMG = document.getElementById("img-suggestion").files[0];

    const NAME_ERROR = NAME.parentElement.querySelector('.error-msg');
    const EMAIL_ERROR = EMAIL.parentElement.querySelector('.error-msg');
    const SUGGESTION_ERROR = SUGGESTION.parentElement.querySelector('.error-msg');

    let valid = true;

    NAME_ERROR.textContent = "";
    EMAIL_ERROR.textContent = "";
    SUGGESTION_ERROR.textContent = "";

    //Validations
    if (!NAME.value.trim()) {
      NAME_ERROR.textContent = "* required field";
      valid = false;
    }

    if (!EMAIL.value.trim()) {
      EMAIL_ERROR.textContent = "* required field";
      valid = false;
    } else {
      const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!EMAIL_PATTERN.test(EMAIL.value)) {
        EMAIL_ERROR.textContent = "* Invalid email";
        valid = false;
      }
    }


    if (!SUGGESTION.value.trim()) {
      SUGGESTION_ERROR.textContent = "* required field";
      valid = false;
    }

    if (!valid) return;
    //This validation is OK
    if (valid) {
      if (IMG) {
        const READER = new FileReader();
        READER.onload = function (event) {
          saveAndDisplay({
            name: NAME.value.trim(),
            email: EMAIL.value.trim(),
            suggestion: SUGGESTION.value.trim(),
            imageBase64: event.target.result,
            date: new Date().toISOString()
          });
        }
        READER.readAsDataURL(IMG);
      } else {
        saveAndDisplay({
          name: NAME.value.trim(),
          email: EMAIL.value.trim(),
          suggestion: SUGGESTION.value.trim(),
          imageBase64: null,
          date: new Date().toISOString()
        });
      }
    }


    //BLOCK 5 - FUNCION RESFRESH PAGE FOR LOCALSTORAGE
    function reloadSuggestionList() {
      const LIST_CONTAINER = document.getElementById('suggestions-list-container');
      if (!LIST_CONTAINER) return;

      LIST_CONTAINER.innerHTML = ""; // limpiar

      const SUGGESTIONS = JSON.parse(localStorage.getItem('suggestions')) || [];

      SUGGESTIONS.forEach(sugg => createAndDisplaySuggestion(sugg));
    }

    function redrawSuggestionsList() {
      const LIST_CONTAINER = document.getElementById("suggestions-list-container");
      if (!LIST_CONTAINER) return;

      LIST_CONTAINER.innerHTML = ""; // Limpiar

      const EXISTING_SUGGESTIONS = JSON.parse(localStorage.getItem("suggestions")) || [];
      EXISTING_SUGGESTIONS.forEach(s => createAndDisplaySuggestion(s));
    }


  });
});

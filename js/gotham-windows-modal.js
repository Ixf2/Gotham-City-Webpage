document.addEventListener("DOMContentLoaded", () => {
  const MODAL_TABLE = document.getElementById("windows-modal-update-form");
  const BTNDB = document.querySelector(".crud-update-form input[type='button']");
  const TABLE_BODY = document.getElementById("db-content");

  const MODAL_EDIT = document.getElementById("modal-edit-suggestion");
  const MODAL_DELETE = document.getElementById("modal-delete-confirm");
  const BTN_SAVE_EDIT = document.getElementById("save-edit");
  const BTN_CONFIRM_DELETE = document.getElementById("confirm-delete");
  const BTN_CANCEL_DELETE = document.getElementById("cancel-delete");

  let currentIndex = null;

  //FUNCTION FOR CLOSE MODAL  THE WINDOWS PRESS X
  document.querySelectorAll(".modal .close").forEach(span => {
    span.addEventListener("click", () => {
      span.closest(".modal").style.display = "none";
    });
  });

  //CLOSE THE MODAL OUT THE WINDOWS
  window.addEventListener("click", (e) => {
    document.querySelectorAll(".modal").forEach(modal => {
      if (e.target === modal) modal.style.display = "none";
    });
  });

  //OPEN TABLE MODAL CLICK BUTTON DATABASE
  BTNDB.addEventListener("click", () => {
    const SUGGESTIONS = JSON.parse(localStorage.getItem("suggestions")) || [];
    TABLE_BODY.innerHTML = "";

    if (SUGGESTIONS.length === 0) {
      TABLE_BODY.innerHTML = `<tr><td colspan="6" style="text-align:center;">No suggestions saved yet.</td></tr>`;
    } else {
      SUGGESTIONS.forEach((sugg, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
      <td>${sugg.name}</td>
      <td>${sugg.email}</td>
      <td>${sugg.suggestion}</td>
      <td>${sugg.imageBase64 ? `<img src="${sugg.imageBase64}" style="max-width:100px;">` : "No image"}</td>
      <td><button class="edit-btn" data-index="${index}">Edit</button></td>
      <td><button class="delete-btn" data-index="${index}">Delete</button></td>
    `;
        TABLE_BODY.appendChild(row);
      });


      // Button Edit.
      document.querySelectorAll(".edit-btn").forEach(btn => {
        btn.addEventListener("click", (e) => {
          const idx = parseInt(e.target.dataset.index);
          openEditModal(idx);
        });
      });

      // Button delete
      document.querySelectorAll(".delete-btn").forEach(btn => {
        btn.addEventListener("click", (e) => {
          const idx = parseInt(e.target.dataset.index);
          openDeleteModal(idx);
        });
      });
    }

    MODAL_TABLE.style.display = "block";
  });

  // Edit modal fill out the dates.
  function openEditModal(index) {
    const SUGGESTIONS = JSON.parse(localStorage.getItem("suggestions")) || [];
    currentIndex = index;
    const suggestion = SUGGESTIONS[currentIndex];

    // Dates exist 
    document.getElementById("edit-name").value = suggestion.name;
    document.getElementById("edit-email").value = suggestion.email;
    document.getElementById("edit-text").value = suggestion.suggestion;

    MODAL_EDIT.style.display = "block";
  }


  BTN_SAVE_EDIT.addEventListener("click", () => {
    const SUGGESTIONS = JSON.parse(localStorage.getItem("suggestions")) || [];
    SUGGESTIONS[currentIndex].name = document.getElementById("edit-name").value;
    SUGGESTIONS[currentIndex].email = document.getElementById("edit-email").value;
    SUGGESTIONS[currentIndex].suggestion = document.getElementById("edit-text").value;

    localStorage.setItem("suggestions", JSON.stringify(SUGGESTIONS));
    MODAL_EDIT.style.display = "none";
    BTNDB.click();
    // REFRESH FIRST LIST LOCALSTORAGE
    if (typeof reloadSuggestionList === "function") {
      reloadSuggestionList();
    }
    redrawSuggestionsList();


  });


  // Delete modal
  function openDeleteModal(index) {
    currentIndex = index;
    MODAL_DELETE.style.display = "block";
  }

  BTN_CONFIRM_DELETE.addEventListener("click", () => {
    const SUGGESTIONS = JSON.parse(localStorage.getItem("suggestions")) || [];
    SUGGESTIONS.splice(currentIndex, 1);
    localStorage.setItem("suggestions", JSON.stringify(SUGGESTIONS));
    MODAL_DELETE.style.display = "none";
    BTNDB.click();
    redrawSuggestionsList();

  });

  BTN_CANCEL_DELETE.addEventListener("click", () => {
    MODAL_DELETE.style.display = "none";
  });
});

//
function redrawSuggestionsList() {
  const LIST_CONTAINER = document.getElementById("suggestions-list-container");
  
  LIST_CONTAINER.innerHTML = "";

  const SUGGESTIONS = JSON.parse(localStorage.getItem("suggestions")) || [];

  SUGGESTIONS.forEach(s => {
    createAndDisplaySuggestion(s);
  });
}


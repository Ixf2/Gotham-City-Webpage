const form = document.querySelector('#form-suggestion-new-character-or-comics form');
form.addEventListener('submit', function(e){
    e.preventDefault();


    //Valor obtain
    const name = document.getElementById('name-and-surname').value.trim();
    const email = document.getElementById('Email').value.trim();
    const suggestion = document.getElementById('suggestion-text').value.trim();
    const img = document.getElementById('img-suggestion').files[0];

    //Validation
    if (!name){
        alert('You must enter your first and last name.');
        return;
    }


    if (!email){
        alert('You must enter your email address.');
        return;
    }

    //Validation email. Here i can search in the google, w3schol and AI. 
    //How do I create a form with email validations 
    const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email_pattern.test(email)){
        alert('Please enter a valid email address.');
        return;
    }

    if (!suggestion){
        alert('You must write your suggestion.');
        return;
    }


    //IMAGE IS OPTIONAL
    if (img && !img.type.startsWith('image/')){
        alert('The file must be an image.');
        return;
    }

    

    //LOCALSTORAGE
    const new_suggestion ={
        name: name,
        email: email,
        suggestion: suggestion,
        imageName: img ? img.name : null,
        date: new Date().toISOString()
    }

    //EXISTENCE ACTUAL ARRAY SUGGESTION THIS LOCALSTORAGE.
    const existing_suggestions = JSON.parse(localStorage.getItem('suggestions')) || [];
    existing_suggestions.push(new_suggestion);
    localStorage.setItem('suggestions', JSON.stringify(existing_suggestions));
    
    alert('Form submitted succesfully and save locally!');
    form.reset();
});

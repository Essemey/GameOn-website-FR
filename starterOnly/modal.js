function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const modalCloseBtn = document.querySelectorAll(".close");
const radioInputs = document.querySelectorAll("div.formData input[name='location']");
const form = document.querySelector('form');


// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch close modal event
modalCloseBtn.forEach((btn) => btn.addEventListener("click", closeModal));

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}

//Close modal form
function closeModal() {
  modalbg.style.display = "none";
}


let errors = {};      //Erreurs du formulaire
let formContent = {}; //Contenu du formulaire

radioInputs.forEach(input => {
  input.addEventListener('change', (e) => { //On ajoute la ville sélectionné à formContent
    let value = e.target.value;
    formContent.location = value;
  })
})

const input = formData.forEach(test => { //On parcours les éléments ayant la classe formData
  const arrChildren = [...test.children]; // On met le contenu de l'HTML Collection dans un array
  arrChildren.forEach(child => {
    if (child.id !== '' && child.name !== 'location') { //On écoute sur chaque enfant possédant un id, sauf les radios Buttons
      child.addEventListener('change', (e) => inputVerification(e, child))
    }
  })
})

form.addEventListener('submit', (e) => validate(e)) //Soumission du formulaire



function inputVerification(e, input) { //Vérification des inputs
  let value = e.target.value;
  let checked = e.target.checked;

  console.log('Content: ', formContent)
  console.log('Errors: ', errors)

  switch (input.id) {
    case 'first':
      if (value.length < 2 || value.startsWith(' ') || value.endsWith(' ') || value === undefined) {
        errors.first = 'Votre prénom doit contenir au minimum 2 caractères et ne doit pas se terminer par un espace';
        if (formContent.first !== undefined) {  //Si il y a une erreur on retire le contenu de formContent
          delete formContent.first
        }
      } else {                      //Si les infos sont valides on les enregistre et supprime l'erreur
        formContent.first = value;
        if (errors.first !== undefined) {
          delete errors.first
        }
      }
      break;
    case 'last':
      if (value.length < 2 || value.startsWith(' ') || value.endsWith(' ') || value === '') {
        errors.last = 'Votre nom doit contenir au minimum 2 caractères et ne doit pas se terminer par un espace';
        if (formContent.last !== undefined) {  //Si il y a une erreur on retire le contenu de formContent
          delete formContent.last
        }
      } else {
        formContent.last = value;
        if (errors.last !== undefined) {
          delete errors.last
        }
      }
      break;
    case 'email':
      if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z]+)*$/.test(value)) {
        formContent.email = value;
        if (errors.email !== undefined) {
          delete errors.email
        }
      } else {
        errors.email = "Votre email n'est pas conforme"
        if (formContent.eamil !== undefined) {  //Si il y a une erreur on retire le contenu de formContent
          delete formContent.email
        }
      }
      break;
    case 'birthdate':
      formContent.birthdate = value;
      break;
    case 'quantity':
      const number = parseInt(value)
      if (isNaN(number)) {
        errors.quantity = "La valeur doit être un nombre"
        if (formContent.quantity !== undefined) {  //Si il y a une erreur on retire le contenu de formContent
          delete formContent.quantity
        }
      } else {
        formContent.quantity = value
        if (errors.quantity !== undefined) {
          delete errors.quantity
        }
      }
      break;
    case 'checkbox1':
      if (checked === true) {
        formContent.conditions = checked;
        if (errors.conditions !== undefined) {
          delete errors.conditions
        }
      } else {
        errors.conditions = "Vous devez accepter les conditions d'utilisation";
        if (formContent.conditions !== undefined) {
          delete formContent.conditions
        }
      }
      break;
    case 'checkbox2':
      if (checked === true) {
        formContent.events = checked;
      } else {
        if (formContent.events !== undefined) {
          delete formContent.events
        }
      }

  }


}

function validate(e) {

  e.preventDefault();

  console.log('yes')

  if (Object.keys(errors).length === 0 && errors.constructor === Object) { //Si on a pas d'erreurs

    //Et si tous les champs requis sont présents
    if (formContent['first'] !== undefined && formContent['last'] !== undefined && formContent['quantity'] !== undefined &&
      formContent['location'] !== undefined && formContent['conditions'] !== undefined && formContent['email'] !== undefined) {

      console.log('good')
      form.submit();

    } else {
      console.log('pas bon')
    }


  } else {
    console.log('pas bon')
  }

}



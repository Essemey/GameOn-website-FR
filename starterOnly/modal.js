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
const error = document.createElement('span')

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
    if (errors.location !== undefined) {
      delete errors.location
      delete input.parentNode.dataset.error
      delete input.parentNode.dataset.errorVisible
    }
  })
})

const input = formData.forEach(item => { //On parcours les éléments ayant la classe formData
  const arrChildren = [...item.children]; // On met le contenu de l'HTML Collection dans un array
  arrChildren.forEach(child => {
    if (child.id !== '' && child.name !== 'location') { //On écoute sur chaque enfant possédant un id, sauf les radios Buttons
      child.addEventListener('input', (e) => inputVerification(e, child))
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
        errors.first = '2 caractères minimum, ne peut commencer / se terminer par un espace';
        input.parentNode.dataset.error = errors.first //On affiche l'erreur
        input.parentNode.dataset.errorVisible = true
        if (formContent.first !== undefined) {  //Si il y a une erreur on retire le contenu de formContent
          delete formContent.first
        }
      } else {                      //Si les infos sont valides on les enregistre et supprime l'erreur
        formContent.first = value;
        if (errors.first !== undefined) {
          delete errors.first
          delete input.parentNode.dataset.error
          delete input.parentNode.dataset.errorVisible
        }
      }
      break;
    case 'last':
      if (value.length < 2 || value.startsWith(' ') || value.endsWith(' ') || value === '') {
        errors.last = '2 caractères minimum, ne peut commencer / se terminer par un espace';
        input.parentNode.dataset.error = errors.last //On affiche l'erreur
        input.parentNode.dataset.errorVisible = true
        if (formContent.last !== undefined) {  //Si il y a une erreur on retire le contenu de formContent
          delete formContent.last
        }
      } else {
        formContent.last = value;
        if (errors.last !== undefined) {
          delete errors.last
          delete input.parentNode.dataset.error
          delete input.parentNode.dataset.errorVisible
        }
      }
      break;
    case 'email':
      if (/^([A-Za-z0-9_\-.+])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,})$/.test(value)) {
        formContent.email = value;
        if (errors.email !== undefined) {
          delete errors.email
          delete input.parentNode.dataset.error
          delete input.parentNode.dataset.errorVisible
        }
      } else {
        errors.email = "Votre email n'est pas conforme"
        input.parentNode.dataset.error = errors.email //On affiche l'erreur
        input.parentNode.dataset.errorVisible = true
        if (formContent.eamil !== undefined) {  //Si il y a une erreur on retire le contenu de formContent
          delete formContent.email
        }
      }
      break;
    case 'birthdate':
      if (value !== '') {
        formContent.birthdate = value
        if (errors.birthdate !== undefined) {
          delete input.parentNode.dataset.error
          delete input.parentNode.dataset.errorVisible
          delete errors.birthdate
        }
      } else {
        errors.birthdate = "Vous devez indiquer votre date de naissance"
        input.parentNode.dataset.error = errors.birthdate //On affiche l'erreur
        input.parentNode.dataset.errorVisible = true
        delete formContent.birthdate
      }
      break;
    case 'quantity':
      const number = parseInt(value)
      if (isNaN(number)) {
        errors.quantity = "La valeur doit être un nombre"
        input.parentNode.dataset.error = errors.quantity //On affiche l'erreur
        input.parentNode.dataset.errorVisible = true
        if (formContent.quantity !== undefined) {  //Si il y a une erreur on retire le contenu de formContent
          delete formContent.quantity
        }
      } else {
        formContent.quantity = value
        if (errors.quantity !== undefined) {
          delete errors.quantity
          delete input.parentNode.dataset.error
          delete input.parentNode.dataset.errorVisible
        }
      }
      break;
    case 'checkbox1':
      if (checked === true) {
        formContent.conditions = checked;
        if (errors.conditions !== undefined) {
          delete errors.conditions
          delete input.parentNode.dataset.error
          delete input.parentNode.dataset.errorVisible
        }
      } else {
        errors.conditions = "Vous devez accepter les conditions d'utilisation";
        input.parentNode.dataset.error = errors.conditions //On affiche l'erreur
        input.parentNode.dataset.errorVisible = true
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

    const empty = 'Ce champ est requis'
    let valid = true;

    if (formContent['first'] === undefined) {
      const input = document.getElementById('first')
      input.parentNode.dataset.error = empty //On affiche l'erreur
      input.parentNode.dataset.errorVisible = true
      errors.first = empty
      valid = false;
    }

    if (formContent['last'] === undefined) {
      const input = document.getElementById('last')
      input.parentNode.dataset.error = empty //On affiche l'erreur
      input.parentNode.dataset.errorVisible = true
      errors.last = empty
      valid = false;
    }

    if (formContent['email'] === undefined) {
      const input = document.getElementById('email')
      input.parentNode.dataset.error = empty //On affiche l'erreur
      input.parentNode.dataset.errorVisible = true
      errors.email = empty
      valid = false;
    }

    if (formContent['quantity'] === undefined) {
      const input = document.getElementById('quantity')
      input.parentNode.dataset.error = empty //On affiche l'erreur
      input.parentNode.dataset.errorVisible = true
      errors.quantity = empty
      valid = false;
    }

    if (formContent['conditions'] === undefined) {
      const input = document.getElementById('checkbox1')
      input.parentNode.dataset.error = "Vous devez accepter les conditions d'utilisation" //On affiche l'erreur
      input.parentNode.dataset.errorVisible = true
      errors.conditions = "Vous devez accepter les conditions d'utilisation"
      valid = false;
    }

    if (formContent['location'] === undefined) {
      const input = document.getElementById('location1')
      input.parentNode.dataset.error = "Vous devez sélectionner une ville" //On affiche l'erreur
      input.parentNode.dataset.errorVisible = true
      errors.location = "Vous devez sélectionner une ville"
      valid = false;
    }

    if (formContent['birthdate'] === undefined) {
      const input = document.getElementById('birthdate')
      input.parentNode.dataset.error = empty//On affiche l'erreur
      input.parentNode.dataset.errorVisible = true
      errors.birthdate = empty
      valid = false;
    }

    if (valid === true) {
      form.submit()
    }

  }

}



const form = document.querySelector('#form');
const souhait = document.querySelector('#souhait');
const texte = document.querySelector('#texte');


form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (souhait.value == "") {
        texte.innerText = "veuillez souhaitez quelque chose";
    }else{
        texte.innerText = "Votre souhait est : " + souhait.value;
    }
    
  });
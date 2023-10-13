const counter = document.querySelector('#counter');
const text = document.querySelector('#text');
const clickBtn = document.querySelector('#clickBtn');

let count = 0;

clickBtn.addEventListener('click', () => {
    count++;;
    counter.innerHTML = count;

    if (count == 5) {
        text.innerHTML = "Bravo, bel échauffement !";
    }

    if (count == 10) {
        text.innerHTML = "Vous êtes passé maître en l'art du clic !";
    }

    if (count >= 20) {

        text.innerHTML = "TU EST EN FEUUUU!!!!!!";
        
        counter.className = " ";
        setTimeout(function() {
            counter.className = "animate__animated animate__bounce animate__duration-2ms";
        }, 0.5)
        


    }

  });



const divs = document.querySelectorAll(".color-div");

divs.forEach((div) =>{
    div.addEventListener("mouseover", addText);
    div.addEventListener("mouseout", remove);
    
    function addText() {
        div.innerText = `${div.style.backgroundColor.toString()}`;
    }

    function remove() {
        div.innerText = "";
    }
})
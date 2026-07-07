function help(){
    alert("Ваш запит відправлено!");
}

const search = document.getElementById("search");

search.addEventListener("keyup", function(){

    let text = search.value.toLowerCase();

    cards.forEach(function(card){

        if(card.innerText.toLowerCase().includes(text)){
            card.style.display = "block";
        }else{
            card.style.display = "none";
        }

    });

});
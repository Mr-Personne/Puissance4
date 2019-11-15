var ligne6 = document.querySelectorAll(".ligne6 td");
var trous = document.querySelectorAll("td");
var tableau = [];
// var turn = 0;
// console.log(trous);
var player1 = true;
var jetonActif = "jeton-rouge";
var index = 0;
var JetonALaSuite = 0;
var pseudo= "pseudo"
point=1
var ajoutJeton = function (event) {
    console.log("ajoutJeton");
    //si l'emplacement est déja pris
    if (event.target.classList.value == "jeton-rouge" || event.target.classList.value == "jeton-jaune") {
        console.log("not free space, go up");
        // addOnTop(event);
        return;
    }
    else {
        if (player1 == true) {
            jetonActif = "jeton-rouge";
            player1 = false;
        }
        else if (player1 == false) {
            jetonActif = "jeton-jaune";
            player1 = true;
        }

        event.target.classList = jetonActif;
        makeTopClickable(event)
    }
    console.log(" player1 ", player1);

    verifWin()
}

for (var i = 0; i < ligne6.length; i++) {
    console.log("ajoutJeton");
    ligne6[i].addEventListener("click", ajoutJeton);
    // ligne6[i].addEventListener("click", function (event) {


    //     //si l'emplacement est déja pris
    //     if (event.target.classList.value == "jeton-rouge" || event.target.classList.value == "jeton-jaune") {
    //         console.log("not free space, go up");
    //         // addOnTop(event);
    //         return;
    //     }
    //     else {
    //         if (player1 == true) {
    //             jetonActif = "jeton-rouge";
    //             player1 = false;
    //         }
    //         else if (player1 == false) {
    //             jetonActif = "jeton-jaune";
    //             player1 = true;
    //         }

    //         event.target.classList = jetonActif;
    //         makeTopClickable(event)
    //     }

    //     console.log(" player1 ", player1);

    //     verifWin()

    // });
}

function verifWin() {
    var tableau = [];

    for (var i = 0; i < trous.length; i++) {
        tableau.push(trous[i]);
    }

    for (var j = 0; j < tableau.length; j++) {
        // tableau.push(trous[i]);
        if (tableau[j].classList == "jeton-rouge") {
            JetonALaSuite++;
            console.log("tableau class", JetonALaSuite);
            //faire une autre boucle de 4 pour verif si 4 a la suite
            for (var k = 1; k < 4; k++) {
                console.log("tableau[j + k]",tableau[j + k])
                if (tableau[j + k].classList == undefined) {
                    console.log("undefined");
                    return;
                }
                else if (tableau[j + k].classList == "jeton-rouge" ) {
                    JetonALaSuite++;
                }
            }
            if (JetonALaSuite == 4  ) {
                alert("winner is you");
                var score=document.querySelector("p")
               score.innerText=point
              point++
            }
        }

    }
    console.log("test tableau ");
    // console.log("tableau ", tableau)
}



function makeTopClickable(event) {
    var nextPos = event.target.parentElement.previousElementSibling.querySelectorAll("td");
    //trouve l'index position de la case clické
    var cellRowIndex = event.target.cellIndex;

    nextPos[cellRowIndex].addEventListener("click", ajoutJeton);
}





//not used for now (or ever...?)
function addOnTop(event) {
    //trouve la prochaine row (a utiliser si on click sur un emplacement pris)
    //et créer une array de td de la row au dessus de celle clické
    var nextPos = event.target.parentElement.previousElementSibling.querySelectorAll("td");
    //trouve l'index position de la case clické
    var cellRowIndex = event.target.cellIndex;
    // console.log("index =", nextPos);
    // console.log("event ", event);
    // console.log("current jeton: ", event.target.classList.value);
    console.log("next available pos at : ", nextPos[cellRowIndex]);

    //use below if you want it to try and put a jeton on top automaticaly
    if (player1 == true) {
        jetonActif = "jeton-rouge";
        player1 = false;
    }
    else if (player1 == false) {
        jetonActif = "jeton-jaune";
        player1 = true;
    }
    nextPos[cellRowIndex].classList = jetonActif;
}

function test() {
    console.log("test");
}



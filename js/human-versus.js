var ligne6 = document.querySelectorAll(".ligne6 td");
var trous = document.querySelectorAll("td");
var tableau = [];
// var turn = 0;
// console.log(trous);
var player1 = true;
var jetonActif = "jeton-rouge";
var index = 0;
var JetonALaSuite = 0;


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
        makeTopClickable(event);
    }
    console.log(" player1 ", player1);

    verifWin(event);
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

// var rowNum = 6;
//verif suite horizontale
function verifHorizontale(event) {
    // if (rowNum == undefined) {
    //     var num = 6
    //     console.log("num : ", num);
    // }
    // else {
    //     var num = rowNum;
    //     console.log("num : ", num);
    // }

    var ligne6 = document.querySelectorAll(".ligne6 td");
    var ligne5 = document.querySelectorAll(".ligne5 td");
    var ligne4 = document.querySelectorAll(".ligne4 td");
    var ligne3 = document.querySelectorAll(".ligne3 td");
    var ligne2 = document.querySelectorAll(".ligne2 td");
    var ligne1 = document.querySelectorAll(".ligne1 td");
    var lignesArray = [ligne6,ligne5,ligne4,ligne3,ligne2,ligne1];

    var rowNum = event.target.parentElement;
    // console.log("lignes :  ", ligne6, ligne5, ligne4, ligne3, ligne2, ligne1);
    // var currentRow = document.querySelectorAll(".ligne" + 6 + " td");

    for (var i = 0; i < 6; i++) {
        // currentRow = document.querySelectorAll(".ligne" + i + " td");
        var currentRow = lignesArray[i];
        
        console.log("current row ", currentRow);
        for (var j = 0; j < 7; j++) {
            if (currentRow[j].classList == "jeton-rouge" && currentRow[j + 1].classList == "jeton-rouge"
                && currentRow[j + 2].classList == "jeton-rouge" && currentRow[j + 3].classList == "jeton-rouge") {

                alert("winner is red");

            }
            else if (currentRow[j].classList == "jeton-jaune" && currentRow[j + 1].classList == "jeton-jaune"
                && currentRow[j + 2].classList == "jeton-jaune" && currentRow[j + 3].classList == "jeton-jaune") {

                alert("winner is yellow");

            }
        }
    }

    // for (var i = 0; i < currentRow.length; i++) {
    //     // console.log("currentRow[i]+123 ", currentRow[i], currentRow[i + 1], currentRow[i + 2], currentRow[i + 3])
    //     //verif des jetons rouges a la suite horizontale gauche droite
    //     if (currentRow[i].classList == "jeton-rouge" && currentRow[i + 1].classList == "jeton-rouge"
    //         && currentRow[i + 2].classList == "jeton-rouge" && currentRow[i + 3].classList == "jeton-rouge") {

    //         alert("winner is red");

    //     }
    //     else if (currentRow[i].classList == "jeton-jaune" && currentRow[i + 1].classList == "jeton-jaune"
    //         && currentRow[i + 2].classList == "jeton-jaune" && currentRow[i + 3].classList == "jeton-jaune") {

    //         alert("winner is yellow");

    //     }
    // }



}
//verif suite verticale

//verif suite diagonale "//" (gauche à droite)
function verifDiagonaleGaucheDroite() {
    var tableau = [];

    for (var i = 0; i < trous.length; i++) {
        tableau.push(trous[i]);
    }

    for (var j = 0; j < tableau.length; j++) {
        // tableau.push(trous[i]);

        // //verif des jetons rouges a la suite horizontale gauche droite
        // if (tableau[j].classList == "jeton-rouge") {

        //     console.log("tableau class", JetonALaSuite);
        //     //faire une autre boucle de 4 pour verif si 4 a la suite
        //     for (var k = 0; k <= 4; k++) {
        //         // console.log("tableau[j + k]",tableau[j + k]);
        //         // console.log("undefined test",tableau[j + k].classList);
        //         if (tableau[j + k].classList.value == "jeton-rouge") {
        //             console.log("[j + k] ==", j ," ",k);
        //             console.log("tableau[j + k] ==", tableau[j + k]);
        //             JetonALaSuite++;
        //             console.log("jetonsuite", JetonALaSuite);
        //         }
        //         // else if (tableau[j + k].classList.value == "" || tableau[j + k].classList == undefined) {
        //         //     console.log("undefined");
        //         //     break;
        //         // }
        //     }
        //     if (JetonALaSuite == 4) {
        //         alert("winner is you");
        //     }
        // }
        console.log("tableau[j]+123 ", tableau[j], tableau[j + 1], tableau[j + 2], tableau[j + 3])
        //verif des jetons rouges a la suite horizontale gauche droite
        if (tableau[j].classList == "jeton-rouge" && tableau[j + 1].classList == "jeton-rouge"
            && tableau[j + 2].classList == "jeton-rouge" && tableau[j + 3].classList == "jeton-rouge") {

            alert("winner is red");

        }
        if (tableau[j].classList == "jeton-yellow" && tableau[j + 1].classList == "jeton-yellow"
            && tableau[j + 2].classList == "jeton-yellow" && tableau[j + 3].classList == "jeton-yellow") {

            alert("winner is yellow");

        }


    }
    console.log("test tableau ");
    // console.log("tableau ", tableau)
}
//verif suite digonale "\\"  (droite à gauche)



function verifWin(event) {
    verifHorizontale(event);
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



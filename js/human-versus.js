var ligne6 = document.querySelectorAll(".ligne6 td");
var ligne6State = ["0", "0", "0", "0", "0", "0"];
// var turn = 0;
console.log(ligne6);
var player1 = true;
var index = 0;

for (var i = 0; i < ligne6.length; i++) {
    console.log("index ",index);
    ligne6[i].addEventListener("click", function (event) {
        var j = index;
        console.log("index =", j);
        if (player1 == true) {
            var jetonActif = "jeton-rouge";
            player1 = false;
        }
        else if (player1 == false) {
            var jetonActif = "jeton-jaune";
            player1 = true;
        }


        // console.log(event);
        event.target.classList = jetonActif;
        // console.log(ligne6State);
        ligne6State[i] = jetonActif;
        // console.log(ligne6State);
    });
    index = index+1;
}


// function ajoutJeton(event, index) {
//     ligne6[i].addEventListener("click", function (event, i) {
//         var j = event;
//         console.log("j =", j);
//         if (player1 == true) {
//             var jetonActif = "jeton-rouge";
//             player1 = false;
//         }
//         else if (player1 == false) {
//             var jetonActif = "jeton-jaune";
//             player1 = true;
//         }


//         console.log(event);
//         event.target.classList = jetonActif;
//         console.log(ligne6State);
//         ligne6State[i] = jetonActif;
//         console.log(ligne6State);
//     });
// }

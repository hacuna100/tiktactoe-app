// variables declared for program
let play = document.querySelector("input[name=gType]");
let playType = document.getElementById("gResult");
let fieldArray = document.querySelectorAll('div[name="pField"]');
let resultArray = [];
const p1 = "❌";
const p2 = "⭕";

playType.innerHTML = "Computer";

// Event listener that detects the click in the grid and calls
// necessary function for the game
fieldArray.forEach(function(field) {
    field.addEventListener("click", function() {
        resultArray = [];

        // Validates which mode the game is in
        if (playType.innerHTML == "VS") {
            if (field.firstChild.innerHTML == '') {
                vsPlay(field);
            }
        }
        else if (playType.innerHTML == "Computer") {

        }

        // Moves the inputs into an array
        resultArray = trackerArray(resultArray)

        // validates if there is a winner
        winValidation(resultArray);
    })
})

// Event listener that detects the change for its game mode
// either VS or against computer
play.addEventListener("change", function() {
    if (this.checked) {
        playType.innerHTML = "VS";
        document.getElementById("pField").innerHTML = "P1";
        document.getElementById("pField").style.paddingBottom = "20px";
        document.getElementById("gMode").disabled = true;
    }
    else {
        playType.innerHTML = "Computer";
        document.getElementById("pField").innerHTML = "";
        document.getElementById("pField").style.paddingBottom = "0";
        document.getElementById("gMode").disabled = false;
    }
    reset();
})

// Function that allows the selection option of X or O to change
// after click
function vsPlay(pTurn) {
    if (document.getElementById("pField").innerHTML == "P1") {
        pTurn.firstChild.innerHTML = p1;
        document.getElementById("pField").innerHTML = "P2";
    }
    else if (document.getElementById("pField").innerHTML == "P2") {
        pTurn.firstChild.innerHTML = p2;
        document.getElementById("pField").innerHTML = "P1";
    }
}

// Function that checks the array to see if there is a winner
function winValidation(rArray) {
    // Check Rows
    for (let i = 0; i < 3; i++) {
        const start = i * 3;
        if (rArray[start] === rArray[start + 1] && rArray[start + 1] === rArray[start + 2] && rArray[start] !== '') {
        openForm(rArray[start]);
            //confirm("Player " + rArray[start] + " wins!");
        }
    }
    
    // Check columns
    for (let j = 0; j < 3; j++) {
        if (rArray[j] === rArray[j + 3] && rArray[j + 3] === rArray[j + 6] && rArray[j] !== '') {
            //confirm("Player " + rArray[j] + " wins!");
            openForm(rArray[j]);
        }
    }
    
    // Check diagonals
    if ((rArray[0] === rArray[4] && rArray[4] === rArray[8] && rArray[0] !== '')) {
        //confirm("Player " + rArray[0] + " wins!");
        openForm(rArray[0]);
    }

    // Check diagonals
    if ((rArray[2] === rArray[4] && rArray[4] === rArray[6] && rArray[2] !== '')) {
        //confirm("Player " + rArray[2] + " wins!");
        openForm(rArray[2]);
    }
}

// Converts all inputs in the grid into an array for validation 
function trackerArray(arry) {
    for (k = 0; k < fieldArray.length; k++) {
        if(fieldArray[k].firstChild.innerHTML != null && fieldArray[k].firstChild.innerHTML != "" )
        {
            arry.push(fieldArray[k].firstChild.innerHTML);
        }
        else {
            arry.push("");
        }           
    }

    return arry;
}

// Pops up a notification once the game is complete
function openForm(result) {
    document.getElementById("win").insertAdjacentHTML('beforeend', result);
    document.getElementById("popupForm").style.display = "block";
    document.getElementById("bckrnd").style.display = "block";
  }
  function closeForm() {
    document.getElementById("popupForm").style.display = "none";
    document.getElementById("bckrnd").style.display = "none";
  }

// Resets game in any state
function reset() {
    fieldArray.forEach(function(fields) {
        fields.firstChild.innerHTML = "";
    })
    if (document.getElementById("pField").innerHTML != "") {
        document.getElementById("pField").innerHTML = "P1";
    }
}
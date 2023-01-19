// variables for the HTML element
const box = document.querySelectorAll('#cell')
const sttatus = document.querySelector('#status')
const restarts = document.querySelector('#restart')


// setting up the scores
scores = {
    x: 0,
    o: 0,
    draws: 0,
}


// declaring variables for when game is running, the player(current player) and winning conditions
let running = false;
let player = 'X'; //current start game player
let selected = ["","","","","","","","",""]; //an array to add the clicked cell
let winConditions = [
    ['0','1','2'],
    ['3','4','5'],
    ['6','7','8'],
    ['0','3','6'],
    ['1','4','7'],
    ['2','5','8'],
    ['0','4','8'],
    ['2','4','6']
]

// function to start game
startGame()

// event listener for restarting the game
restarts.addEventListener('click',restartBtn)
function startGame() {
    box.forEach(pick => pick.addEventListener('click',boxClicked))
    running = true;
}

// when a cell is clicked
function boxClicked() {

    const boxIndex = this.getAttribute('cellIndex')
    updateBox(this, boxIndex) //update value when a box is clicked
    checkWin()//check if there is a winner
    changePlayer()//change the player if no winner
    
    
}

// updating the cell on the browser
function updateBox(pick , index) {
    selected[index] = player//update the 'selected' array with the player value(X OR O) to the 
    pick.textContent = player //update a box with the player value
    
}

// change player
function changePlayer(){
    player = (player == 'X') ? 'O':'X' //the current player is X, Change to O otherwise X
    if (running) {
        sttatus.textContent = `${player} turn` //If game is not runnig, update the player turn
    }
}

// checking if the game is won
function checkWin(){
    
    roundWon = false;
    for (let x = 0; x < winConditions.length; x++) { //iterate through the winCondition array
        const condition = winConditions[x]; // this will be the first condition in the iterating array
        
        const check1 = selected[condition[0]]//asign the first object in the condition array to this variable and so on below...
        const check2 = selected[condition[1]]
        const check3 = selected[condition[2]]
            
        if (check1 == "" || check2 == "" || check3 == "" ) { //check for empty spaces
            continue
        }
        if (check1 == check2 && check2 == check3  ) {//check if the values are same hence a winner
            if (check1 == 'X') {// check if winner is X
                scores.x +=1 
                roundWon = true;
            }
            else if (check1 == 'O') {//check if winner is O
                scores.o +=1
                roundWon = true;
            }
            sttatus.textContent = `${player} wins`
            running = false //close the game if there is a winner
            break;
        }
    }
                
                
    if(!selected.includes("")){ //check if there are empty spaces
        if (!roundWon) { //check if the round is won
            scores.draws += 1 //if no its a draw so add 1 to the draw
            sttatus.textContent = "draw"
            running = false;
        }
    }
    document.querySelector('#drawScores').textContent = scores.draws
    document.querySelector('#xScores').textContent = scores.x
    document.querySelector('#oScores').textContent = scores.o
    
}

// function for restarting the game
function restartBtn() {
    player = `${player}`
    sttatus.textContent = `${player} turn`
    selected = ["","","","","","","","",""] //resetting the selected boxes
    box.forEach(pick => pick.textContent = '') //resetting the boxes
    running = true;
    
}
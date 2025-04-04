// Global variables to track score in game
let computerScore = 0;
let humanScore = 0;

function getRandomInt(max)
{
    // Returns a random int from 0 to max (exclusive)
    return Math.floor(Math.random() * max);
}

function getMove(choice)
{
    // Compare the value of choice to a play
    // Return that corresponding play
    switch(choice)
    {
        case 0:
            return "Rock";
        case 1:
            return "Paper";
        case 2:
            return "Scissors";
        default:
            alert("Invalid selection");
            break; 
    }
}

function getComputerChoice()
{
    // Retrieve a randomly generated int
    const choice = getRandomInt(3);

    // Return the corresponding move of that int
    return getMove(choice).toLowerCase();
}

function getHumanChoice()
{
    /* Select the list that contains the buttons that the human selects
        Using event delegation and bubbling, we capture the id of the
        selected button, which will be the play made by the human.
    */
    return new Promise((resolve) => {
        const gameButtons = document.getElementById("choice-buttons");

        function handleClick(event) {
            if (event.target.tagName === 'BUTTON')
            {
                gameButtons.removeEventListener('click', handleClick);
                resolve(event.target.id);
            }
        }

        gameButtons.addEventListener('click', handleClick);
    });

}

function playRound(humanChoice, ComputerChoice)
{
    // Compare human and computer choice to eachother
    // Based on game rules, increment the score of the winner
    // Display a win or lose message for the human player

    let outcome;
    if (humanChoice === ComputerChoice)
    {
        outcome = "Tie! No winner this round!";
    }
    else if (isHumanWinner(humanChoice, ComputerChoice))
    {
        outcome = `${humanChoice} beats ${ComputerChoice}!
            You win this round!`;
        ++humanScore;
    }
    else
    {
        outcome = `${ComputerChoice} beats ${humanChoice}!
            You lose this round!`;
        ++computerScore;
    }

    return `${outcome}`;
}

function recordPlay(roundMessage)
{
    const gameBoard = document.getElementById('game-results');
    gameBoard.append(roundMessage);
    return;
}

function isHumanWinner(humanChoice, ComputerChoice)
{
    // Compare the human and computer plays
    // Return True if Human wins
    // Return False if computer wins (Human player loses)
    if (humanChoice === 'rock')
    {
        if (ComputerChoice === 'scissors')
        {
            return true;
        }
    }
    else if (humanChoice === 'paper')
    {
        if (ComputerChoice === 'rock')
        {
            return true;
        }
    }
    else if (humanChoice === 'scissors')
    {
        if (ComputerChoice === 'paper')
        {
            return true;
        }
    }
    else return false;
}

async function playGame()
{
    // Initialize a variable with number of remaining rounds
    let remainingRounds = 5;

    // Create a loop that runs so long as we have remaining rounds
    while (remainingRounds > 0)
    {
        updateRoundCounter(remainingRounds);

        const humanSelection = await getHumanChoice();
        const computerSelection = getComputerChoice();

        currentPlay(humanSelection, computerSelection);

        const roundInfo = document.createElement('p');
        roundInfo.textContent = playRound(humanSelection, computerSelection);
        --remainingRounds;

        updateScoreboard();
        recordPlay(roundInfo);
    }

    // Update round count once loop ends
    updateRoundCounter(remainingRounds);

    const winnerContainer = document.getElementById('winner-box');
    const outcomeMessage = document.createElement('p');
    
    if (humanScore === computerScore)
    {
        outcomeMessage.textContent = "You tied the game! How is that possible?";
    }
    else if (humanScore > computerScore)
    {
        outcomeMessage.textContent = "You won the game!";
    }
    else
    {
        outcomeMessage.textContent = "CPU wins the game!";
    }

    winnerContainer.append(outcomeMessage);
    playAgain();
}

function currentPlay(humanPick, computerPick) 
{
    // Updates the "current play" board on HTML with the users and CPU's
    // choice for the given round.
    const humanPlay = document.getElementById("player-choice");
    const computerPlay = document.getElementById("computer-choice");

    humanPlay.textContent = humanPick;
    computerPlay.textContent = computerPick;
}

function updateScoreboard()
{
    // Targets HTML element that displays the current score
    // Then updates it to the current score values after each round
    const humanScoreVal = document.getElementById("human-score");
    const computerScoreVal = document.getElementById("computer-score");
    
    humanScoreVal.textContent = humanScore;
    computerScoreVal.textContent = computerScore;
}

function updateRoundCounter(remainingRounds)
{
    const roundCount = document.getElementById("round-counter");
    roundCount.textContent = remainingRounds;
}

function playAgain()
{
    const playAgain = document.createElement('button');
    playAgain.textContent = "Restart";
    const buttonContainer = document.getElementById("replay-button-container");

    buttonContainer.append(playAgain);
    
    let restartGame = false;
    function restartHandler()
    {
        playAgain.remove();
        playGame()
    }

    playAgain.addEventListener('click', restartHandler);
}

// Uncomment to run game
playGame()
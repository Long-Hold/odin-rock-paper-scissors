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
            console.alert("Invalid selection");
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
    return prompt("Rock, Paper, Scissors: ").toLowerCase();
}

function playRound(humanChoice, ComputerChoice)
{
    // Compare human and computer choice to eachother
    // Based on game rules, increment the score of the winner
    // Display a win or lose message for the human player
    if (isHumanWinner(humanChoice, ComputerChoice))
    {
        alert("You win!");
        ++humanScore;
    }
    else
    {
        alert("You lose!");
        ++computerScore;
    }
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

// const humanSelection = getHumanChoice();
const computerSelection = getComputerChoice();

// playRound(humanSelection, computerSelection);


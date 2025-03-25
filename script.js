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

function playRound(humanChoice, getComputerChoice)
{
    //
}

// const humanSelection = getHumanChoice();
// const computerSelection = getComputerChoice();


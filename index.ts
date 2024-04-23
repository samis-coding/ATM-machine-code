#!/usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";

async function getUserInput() {
  console.log(chalk.bgWhite('Welcome to Typescript based ATM Machine code'))  
  console.log(chalk.blue("Creating Your Account"));  
  const questions = [
    {
      type: 'input',
      name: 'username',
      message: chalk.blue('Enter your username:'),
    },
    {
      type: 'password',
      name: 'password',
      message: chalk.red ('Enter your password:'), 
      mask: "*"     
    },
    {
      type: 'number',
      name: 'amount',
      message: chalk.gray ('Enter the amount in dollars:'),
    },
  ];

  const answers = await inquirer.prompt(questions);
  return answers;
}

async function main() {
  const userInput = await getUserInput();
  console.log(chalk.yellow('Username:'), userInput.username);
  console.log(chalk.yellow('Password: '),userInput.password);
  console.log(chalk.yellow('Amount:'), userInput.amount);

  const pinAnswer = await inquirer.prompt({
    type:'password',
    name:'pin',
    message: 'Enter your pin number',
    mask:'*'
  });

  console.log(chalk.blue('User Input Password:'), userInput.password);
  console.log(chalk.blue('User Input PIN:'), pinAnswer.pin);
  
  //let myBalance = userInput.amount;

  if (pinAnswer.pin === userInput.password){
    console.log(chalk.green("Correct Pin code!!"));
    const operationAns = await inquirer.prompt([
      {
        type:"list",
        name:"operations",
        message:"Select one option to perform:",
        choices: ["Withdraw", "Check Balance","Fast Cash"]      
      }
    ]);

    if (operationAns.operations === "Check Balance"){
      console.log(chalk.yellow('Your Balance: $'), userInput.amount);
    } else if(operationAns.operations === "Withdraw"){
      // Prompt user to select withdrawal method
      let withdrawAns = await inquirer.prompt([
        {
          name: "withdrawMethod",
          type: "list",
          message: "Select a Withdrawal method:",
          choices: ["Fast Cash", "Enter Amount"]
        }
      ]);
      
      if(withdrawAns.withdrawMethod === "Fast Cash"){
        // Prompt user to select amount for Fast Cash withdrawal
        let fastCashAns = await inquirer.prompt([
          {
            name: "fastCash",
            type: "number",
            message: "Enter Amount:",
            
          }
        ]);

        // Check if user has sufficient balance
        if(fastCashAns.fastCash > userInput.amount){
          console.log(chalk.red("Insufficient Balance"));
        } else {
            userInput.amount -= fastCashAns.fastCash;
          console.log(chalk.green(`${fastCashAns.fastCash} Withdraw successfully`));
          console.log(chalk.yellow(`Your Remaining Balance is: $${userInput.amount}`));
        }
      } else if(withdrawAns.withdrawMethod === "Enter Amount"){
        // Prompt user to enter custom withdrawal amount
        let amountAns = await inquirer.prompt([
          {
            name: "amount",
            type: "number",
            message: "Enter the amount to Withdraw:",
          }
        ]);

        // Check if user has sufficient balance
        if(amountAns.amount > userInput.amount){
          console.log(chalk.red("Insufficient Balance"));
        } else {
            userInput.amount -= amountAns.amount;
          console.log(chalk.green(`${amountAns.amount} Withdraw successfully`));
          console.log(chalk.yellow(`Your Remaining Balance is: $${userInput.amount}`));
        }
      }
    }
  } 
  else {
    console.log(chalk.red("Sorry! Incorrect Pin code.."));
    console.log(chalk.red("Your Account is Blocked.."));
  }
}

main();

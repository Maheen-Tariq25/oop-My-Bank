#! /usr/bin/env  node 
import inquirer from "inquirer";
//  Create BankAccount Class
class BankAcccount {
    accountNumber;
    balance;
    constructor(accountNumber, balance) {
        this.accountNumber = accountNumber;
        this.balance = balance;
    }
    // Debit Money
    withdraw(amount) {
        if (this.balance >= amount) {
            this.balance -= amount;
            console.log(`wWithdrawl of $${amount} is successfull, Remaining balance is $${this.balance}`);
        }
        else {
            console.log("Insufficient Balance");
        }
    }
    // Credit Money
    deposit(amount) {
        if (amount > 100) {
            amount -= 1;
            this.balance += amount;
            console.log(`Deposit of $${amount} is successfull, Current balance is $${this.balance}`);
        }
    }
    //  Check Balance
    checkBalance() {
        console.log(`Your current balance is $${this.balance}`);
    }
}
//  Customer Class
class Customer {
    firstName;
    lastName;
    age;
    gender;
    mobileNumber;
    account;
    constructor(firstName, lastName, age, gender, mobileNumber, account) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.age = age;
        this.gender = gender;
        this.mobileNumber = mobileNumber;
        this.account = account;
    }
}
// Create Accounts
const accounts = [
    new BankAcccount(1001, 500),
    new BankAcccount(1002, 1000),
    new BankAcccount(1003, 2000)
];
//  Create Customers
const customers = [
    new Customer("Jeon", "Jungkook", 28, "Male", 3308768999, accounts[0]),
    new Customer("Park", "Jimin", 30, "Male", 3108768999, accounts[1]),
    new Customer("Jung", "Hoseok", 31, "Male", 3208768999, accounts[2])
];
async function service() {
    do {
        const accountNumberInput = await inquirer.prompt({
            name: "ans",
            type: "number",
            message: "Enter your account number:"
        });
        const customer = customers.find(customer => customer.account.accountNumber === accountNumberInput.ans);
        if (customer) {
            console.log(`Welcome ${customer.firstName} ${customer.lastName}\n`);
            const option = await inquirer.prompt([{
                    name: "ans",
                    type: "list",
                    message: "  Select an option",
                    choices: ["Deposit", "Withdrawl", "Check Balance", "Exit"]
                }]);
            switch (option.ans) {
                case "Deposit":
                    const depositamount = await inquirer.prompt({
                        name: "ans",
                        type: "number",
                        message: "Enter your amount:"
                    });
                    customer.account.deposit(depositamount.ans);
                    break;
                case "Withdrawl":
                    const withdrawlamount = await inquirer.prompt({
                        name: "ans",
                        type: "number",
                        message: "Enter your amount:"
                    });
                    customer.account.withdraw(withdrawlamount.ans);
                    break;
                case "Check Balance":
                    customer.account.checkBalance();
                    break;
                case "Exit":
                    console.log("Exiting The Program....");
                    console.log("Thank you for using our services");
                    return;
            }
        }
        else {
            console.log("Your account number is incorrect, Please try again");
        }
    } while (true);
}
service();

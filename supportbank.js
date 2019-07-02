const fs = require("fs");

//var fileOutput = fs.readFileSync("Transactions2014.csv","utf8");

//console.log("File output: +", fileOutput);

//console.log("TEST")

//store all accounts here
var Accounts = [];

class Account {
    constructor(Name){
        //this creates the user, storing their name, the (initially empty) array of their transactions, and adds them to the accounts array
        this.name =Name;
        this.transactions = [];
        Accounts.push(this);
    }

    //add a transaction with data about whether or not this involves this account owing or being owed money
    addTransaction(transaction,isFrom) {
        var newTransaction = [transaction,isFrom];
        this.transactions.push(newTransaction);
    }
}

class Transaction {
    constructor(date, from, to, narrative, amount) {
        this.date = date;
        this.narrative = narrative;
        this.amount = amount;

        GiveAccountTransaction(from,true);
        GiveAccountTransaction(to,false);

        //adds the function to the account, or creates a new one if necessary
        function GiveAccountTransaction(name, isFrom) {
            var relevantAccount = Accounts.find(element => (element.name === name));
            if (!relevantAccount){
                addNecessaryAccount(isFrom, name);
            } else {
                var thisTransaction = this;
                relevantAccount.addTransaction(thisTransaction, isFrom);
            }
        }

        function addNecessaryAccount(isFrom, name) {
            var placeholdername = new Account(name);
            placeholdername.addTransaction("test data",isFrom);
        }
    }
}

var nice = new Transaction("DATE","FROMADDRESS","TOADDRESS","NARRATIVE","AMOUNT");
var nice2 = new Transaction("DATE2","FROMADDRESS","TOADDRESS2","NARRATIVE2","AMOUNT2");

console.log("");
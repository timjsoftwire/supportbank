const csvreader =require('./csvreader');

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
    getTotalOwed() {
        var acc =0;
        this.transactions.forEach(element => {
            if(element[1] ===true) {
                 acc= acc- parseFloat(element[0].amount);
            } 
            else { 
                acc = acc + parseFloat(element[0].amount);
            }})
        return acc;
    }

    getAllTransactions() {
        var acc = [];
        this.transactions.forEach(element => acc.push(element[0]));
        return acc;
    }

}

class Transaction {
    constructor(date, from, to, narrative, amount) {
        this.date = date;
        this.narrative = narrative;
        this.amount = amount;  
    }
}

function MakeNewTransaction( date, from, to, narrative, amount)  {
    var newTransaction = new Transaction(date, from, to, narrative, amount);
    GiveAccountTransaction(from,true, newTransaction);
    GiveAccountTransaction(to,false, newTransaction);
}

 //adds the function to the account, or creates a new one if necessary
 function GiveAccountTransaction(name, isFrom, newTransaction) {
    var relevantAccount = Accounts.find(element => (element.name === name));
    if (!relevantAccount){
        addNecessaryAccount(isFrom, name, newTransaction);
    } else {
        relevantAccount.addTransaction(newTransaction, isFrom);
    }
}

function addNecessaryAccount(isFrom, name,newTransaction) {
    var placeholdername = new Account(name);
    placeholdername.addTransaction(newTransaction,isFrom);
}

for (i = 0; i < csvreader.getNumberOfTransactions(); i++) {
    var currentTransaction = csvreader.getTransaction(i);
    MakeNewTransaction(currentTransaction[0],currentTransaction[1],currentTransaction[2],currentTransaction[3],currentTransaction[4]);
}

function ListAll() {
    Accounts.forEach(element => console.log(element.name , ": ", element.getTotalOwed()));
}

function List(name) {
    console.log(Accounts.find(element => element.name === name).getAllTransactions());
}
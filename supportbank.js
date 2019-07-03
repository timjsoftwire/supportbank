
const log4js = require("log4js");
log4js.configure({
    appenders: {
        file: { type: 'fileSync', filename: 'logs/debug.log' }
    },
    categories: {
        default: { appenders: ['file'], level: 'debug'}
    }
});
const logger = log4js.getLogger('<supportbank.js>');

const moment = require("moment");
const csvreader =require('./csvreader');
const jsonreader = require('./jsonreader');
const xmlreader = require('./xmlreader.js');
const transactionjs = require('./transaction');



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

function ListAll() {
    Accounts.forEach(element => console.log(element.name , ": ", element.getTotalOwed()));
}

function List(name) {
    console.log(Accounts.find(element => element.name === name).getAllTransactions());
}

function Import_File (filename) {
    startup(filename);
}

function getTransactionsFromFile (filename) {
    if (filename.slice(-4) === ".csv") {
        return csvreader.getTransactions(filename);
    }
    else if (filename.slice(-5).toLowerCase() === ".json" ) {
        return jsonreader.getTransactions(filename);
    }
    else if (filename.slice(-4) === ".xml") {
        return xmlreader.getTransactions(filename);
    }
}







function startup(filename) { //TODO: tidy up this function
    //go through all transactions in the spreadsheet, make them into Transactions (the class) (and in doing so, add those transactions to the Accounts (creating extra accounts when necessary)).
    allTransactions = getTransactionsFromFile(filename);
    

    for (i = 0; i < allTransactions.length; i++) {
        var currentTransaction = allTransactions[i];
        //makeTransaction(currentTransaction);
        //Error handling
        var transactionAddable = true; //stores whether or not a transaction is written in an acceptable enough way to be added
        if(typeof currentTransaction[5] !=="undefined") {//is there an extra column
            logger.debug("The ".concat(i+2,"th row of the spreadsheet has data in its 6th column that wasn't expected - the spreadsheet may be of the wrong format"));
        }
        for (var j = 0; j<5;j++) {// is anything blank
            if (currentTransaction[j] ==="") {
                logger.debug("The cell on the ".concat(i+2,"th row and ",j+1,"th column was unexpectedly empty."));
                transactionAddable = false;
            }
        }
        if (isNaN(currentTransaction[4])) {//amount NaN
            logger.debug("The amount on the ".concat(i+2,"th row could not be converted to a number."));
            transactionAddable = false;
        }
        if (!moment(currentTransaction[0],'DD/MM/YYYY',true).isValid()) {//is the date a date?
            
            currentTransaction[0] = currentTransaction[0].slice(0,10);
            if (moment(currentTransaction[0],'YYYY-MM-DD').isValid()) {//if the date is in this other format, change it to the normal one
                currentTransaction[0] = moment(currentTransaction[0], "YYYY-MM-DD").format('DD/MM/YYYY');
            } else if (!currentTransaction[0].isNaN && currentTransaction[0] > 35000) {//if the date is in the weird xml format, try to fix it
                logger.debug("Encounted the weird xml format while trying to read a file.");
            }
            else {
                
            logger.debug("The date on the ".concat(i+2,"th row could not be converted to a date."));
            transactionAddable = false;
            }
        }

        if (!transactionAddable) {
            logger.debug("As such, the transaction on the ".concat(i+2, "th row could not be added.\n"));
            continue;
        }
        transactionjs.NewTransaction(currentTransaction[0],currentTransaction[1],currentTransaction[2],currentTransaction[3],currentTransaction[4]);
        }

        //now that all transactions are in the array of transactions, attach those transactions to accounts.
        transactionjs.GetAllTransactions().forEach(element =>   {  
            GiveAccountTransaction(element.from,true, element);
            GiveAccountTransaction(element.to,false, element);})
}

Import_File("Transactions2014.csv");

ListAll();

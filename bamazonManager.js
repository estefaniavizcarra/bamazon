var mysql = require("mysql");
var inquirer = require("inquirer");
var colors = require("colors")
var mysql = require("mysql");
var inquirer = require("inquirer");
var colors = require("colors")


var connection = mysql.createConnection({
  host: "localhost",
  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "1155850Bety*",
  database: "bamazon_db",

});
connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
});
  
function options() {
    inquirer.createPromptModule([
{
    name:"option",
    type:"list",
    message: "Choose an option",
    choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"],
    filter: function(val){
        if (val === "View Products for Sale") {
            return "";
        }else if(val === "View Low Inventory") {
            return "";

        }else if(val === "Add to Inventory") {
            return "";

        }else if(val === "Add New Product") {
            return "";

        } else {
            console.log('ERROR: Unsupported operation!');
            exit(1);
            
        }
    }
}   
])
}

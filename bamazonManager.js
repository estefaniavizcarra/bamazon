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
    inquirer.prompt([
{
    name:"option",
    type:"list",
    message: "Choose an option",
    choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"],
    filter: function(val){
        if (val === "View Products for Sale") {
            return "productsForSale";
        }else if(val === "View Low Inventory") {
            return "lowInventory";

        }else if(val === "Add to Inventory") {
            return "addInventory";

        }else if(val === "Add New Product") {
            return "createNewProduct";

        } else {
            console.log('ERROR: Unsupported operation!');
            exit(1);
            
        }
    }
}   
]).then(function(input) {
    if (input.option ==='productsForSale') {
        productsForSale();
    } else if (input.option === 'lowInventory') {
        lowInventory();
    } else if (input.option === 'addInventory') {
        addInventory();
    } else if (input.option === 'createNewProduct') {
        createNewProduct();
    } else {
        // This case should be unreachable
        console.log('ERROR: Unsupported operation!');
        exit(1);
    }
})
}



function productsForSale(){
    connection.query('SELECT * FROM `products`', function (err, res) {
        if (err) throw err;
        console.log(colors.bgWhite("==========================================="));
        console.log(res);
        console.log(colors.bgMagenta("============================================================="));

        connection.end();
})
}

function lowInventory(){
connection.query("SELECT * FROM `products` WHERE stock_quantity < 5", function (err, res) {
    if (err) throw err;
    console.log(res)
    connection.end();

});
}

function addInventory(){
    inquirer.prompt([
{
            type: 'input',
			name: 'item_id',
			message: 'Enter de ID of the item you want to add more units',

},

{
            type: 'input',
            name: 'quantity',
            message: 'How many would you like to add?',
}
    ]).then(function(input){
        var queryStr = 'INSERT INTO products SET ?';

        var item = input.item_id;
        var addQuantity = input.quantity;
        connection.query(queryStr, {item_id: item}, function(err, data) {

            if (err) throw err;
            console.log(res)
            connection.end();
            if (data.length === 0) {
				console.log("Item ID incorrect");
				addInventory();

			} else {
				var productData = data[0];
				var updateQueryStr = 'UPDATE products SET stock_quantity = ' + (productData.stock_quantity + addQuantity) + ' WHERE item_id = ' + item;

                connection.query(updateQueryStr, function(err, data) {
					if (err) throw err;

					console.log('Stock count for Item ID ' + item + ' has been updated to ' + (productData.stock_quantity + addQuantity) + '.');
					console.log("\n---------------------------------------------------------------------\n");

					// End the database connection
					connection.end();
				})
			}
	
    
        
});
    })
}

function createNewProduct(){
    inquirer.prompt([
		{
			type: 'input',
			name: 'product_name',
			message: 'which product do you want to add?',
		},
		{
			type: 'input',
			name: 'department_name',
			message: 'What department sells the product??',
		},
		{
			type: 'input',
			name: 'price',
			message: 'What is the price of this article?',
		},
		{
			type: 'input',
			name: 'stock_quantity',
			message: 'How many items do you want to add??',
		}

    ]).then(function (input) {
        var queryStr = 'INSERT INTO products SET ?';
        
        connection.query(queryStr, input, function (error, results) {
            if (error) throw error;
            console.log('New product has been added  ' + results.insertId + '.');
            console.log("\n---------------------------------------------------------------------\n");
            connection.end();



    })

});
}
options()

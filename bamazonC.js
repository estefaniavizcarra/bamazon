
// 6. The app should then prompt users with two messages.

//    * The first should ask them the ID of the product they would like to buy.
//    * The second message should ask how many units of the product they would like to buy.

// 7. Once the customer has placed the order, your application should check if your store has enough of the product to meet the customer's request.

//    * If not, the app should log a phrase like `Insufficient quantity!`, and then prevent the order from going through.

// 8. However, if your store _does_ have enough of the product, you should fulfill the customer's order.
//    * This means updating the SQL database to reflect the remaining quantity.
//    * Once the update goes through, show the customer the total cost of their purchase.

// - - -

// * If this activity took you between 8-10 hours, then you've put enough time into this assignment. Feel free to stop here -- unless you want to take on the next challenge.
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
  
  
    connection.query('SELECT * FROM `products`', function (err, res) {
      if (err) throw err;
      console.log(colors.bgWhite("====================="));
      console.log(colors.rainbow("=========WELCOME TO BAMAZON====="))
      console.table(res);
      start()

    });

    function start() {
        inquirer
        .prompt({
    
            name:"id",
            type:"input",
            message:"What is the id of the item you want to buy?",
            })
            .then(function (answer1) {
              var selection = answer1.id;
              connection.query("SELECT *  FROM products WHERE item_id= ?", selection, function(
              err,
              res
               ) {
        if (err) throw err;
        if (res.length === 0) {
          console.log(colors.red(
            "That Product doesn't exit enter a valid ID"
          ));
          start();
        }else{
          inquirer
            .prompt({
              name: "quantity",
              type: "input",
              message: "How many items would you like to purchase?"

        })
        .then(function(answer2){
          var quantity = answer2.quantity;
          if(quantity > res[0].stock_quantity){
            console.log("There's only" + res[0].stock_quantity +"items of the products selected");
            start();

          }else{
            console.log(res[0].products_name + " purchased");
            console.log(quantity + "      $" + res[0].price);

            var actualizarInv = res[0].stock_quantity - quantity;
            connection.query(
              "UPDATE products SET stock_quantity = " +
              actualizarInv +
              " WHERE id = " + res[0].id,
              function (err, resUpdate) {
                console.log("Your order has been Processed correctly");
                connection.end();
                
              }
              );
            }
          });
      }
    });
  });
};
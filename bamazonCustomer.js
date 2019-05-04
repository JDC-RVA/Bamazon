var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "Password",
  database: "bamazon"
});

// console log connection ID
connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
  readProducts();
});

function readProducts() {
  console.log("Selecting all products...\n");
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;
    var display = "";
    for (var i = 0; i < res.length; i++) {
      display = "";
      display += "Item ID: " + res[i].item_id + "  ~  ";
      display += "Product Name: " + res[i].product_name + "  ~  ";
      display += "Department: " + res[i].department_name + "  ~  ";
      display += "Price: $" + res[i].price + "\n";

      console.log(display);
    }
    userPrompt();
  });
}

function userPrompt() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "item_id",
        message: "What would you like to buy? Please enter in product item ID"
      },
      {
        type: "input",
        name: "quantity",
        message: "How many do you need?"
      }
    ])
    .then(function(input) {
      var itemID = input.item_id;
      var quantity = input.quantity;
      connection.query(
        `SELECT stock_quantity, price FROM products WHERE item_id = ${itemID}`,
        function(err, res) {
          if (err) throw err;
          // console.log(res)

          var availableQuantity =
            parseInt(res[0].stock_quantity) - parseInt(quantity);
          var price = res[0].price;
          if (availableQuantity > 0) {
            connection.query(
              `UPDATE products SET stock_quantity = ${availableQuantity} WHERE item_id = ${itemID}`,
              function(err, res) {
                console.log(`Your total is: ${price * quantity}`);
                connection.end();
              }
            );
          } else {
            console.log("Insufficient quantity!");
            connection.end();
          }
        }
      );
    });
}

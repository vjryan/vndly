const Inventory = require('./inventory');
const Invoice   = require('./invoice');


var inventory = new Inventory();

inventory.addItem("1 book at 12.49");
inventory.addItem("1 music CD at 14.99");
inventory.addItem("1 chocolate bar at 0.85");

var invoice = new Invoice(inventory);

invoice.calculate();

// ===========================

inventory = new Inventory();
inventory.addItem("1 imported box of chocolates at 10.00");
inventory.addItem("1 imported bottle of perfume at 47.50");

invoice = new Invoice(inventory);

invoice.calculate();


// ===========================

inventory = new Inventory();
inventory.addItem("1 imported bottle of perfume at 27.99");
inventory.addItem("1 bottle of perfume at 18.99");
inventory.addItem("1 packet of headache pills at 9.75");
inventory.addItem("1 box of imported chocolates at 11.25");

invoice = new Invoice(inventory);

invoice.calculate();

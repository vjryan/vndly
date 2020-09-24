const Inventory = require('../inventory');
const Invoice = require('../invoice');


describe('Testing Invoice functionality', () => {

    test('Invoice sceneio 1', () => {
        inventory = new Inventory();
        invoice   = new Invoice(inventory);

        inventory.addItem("1 book at 12.49");
        inventory.addItem("1 music CD at 14.99");
        inventory.addItem("1 chocolate bar at 0.85");

        let result = invoice.calculate(true);

        expect(result[0]).toContain('1 book: 12.49');
        expect(result[1]).toContain('1 music CD: 16.49');
        expect(result[2]).toContain('1 chocolate bar: 0.85');
        expect(result[3]).toContain('Sales Taxes: 1.50');
        expect(result[4]).toContain('Total: 29.83');
    });

    
    test('Invoice sceneio 2', () => {
        inventory = new Inventory();
        invoice   = new Invoice(inventory);

        inventory.addItem("1 imported box of chocolates at 10.00");
        inventory.addItem("1 imported bottle of perfume at 47.50");

        let result = invoice.calculate(true);
        
        expect(result[0]).toContain('1 imported box of chocolates: 10.5');
        expect(result[1]).toContain('1 imported bottle of perfume: 54.65');
        expect(result[2]).toContain('Sales Taxes: 7.65');
        expect(result[3]).toContain('Total: 65.15');
    });

    test('Invoice sceneio 3', () => {
        inventory = new Inventory();
        invoice   = new Invoice(inventory);

        inventory.addItem("1 imported bottle of perfume at 27.99");
        inventory.addItem("1 bottle of perfume at 18.99");
        inventory.addItem("1 packet of headache pills at 9.75");
        inventory.addItem("1 box of imported chocolates at 11.25");

        let result = invoice.calculate(true);
        
        expect(result[0]).toContain('1 imported bottle of perfume: 32.19');
        expect(result[1]).toContain('1 bottle of perfume: 20.89');
        expect(result[2]).toContain('1 packet of headache pills: 9.75');
        expect(result[3]).toContain('1 box of imported chocolates: 11.85');
        expect(result[4]).toContain('Sales Taxes: 6.70');
        expect(result[5]).toContain('Total: 74.68');
    });


    test('adding additional quantity of items', () => {
        inventory = new Inventory();
        invoice   = new Invoice(inventory);

        inventory.addItem("4 stephen king books at 27.99");
        inventory.addItem("3 bottle of perfume at 18.99");
        inventory.addItem("6 packet of muscle relief gel at 9.75");
        inventory.addItem("14 boxes of imported walnuts at 11.25");

        let result = invoice.calculate(true);
        
        expect(result[0]).toContain('4 stephen king books: 111.96');
        expect(result[1]).toContain('3 bottle of perfume: 62.67');
        expect(result[2]).toContain('6 packet of muscle relief gel: 64.35');
        expect(result[3]).toContain('14 boxes of imported walnuts: 181.15');
        expect(result[4]).toContain('Sales Taxes: 35.20');
        expect(result[5]).toContain('Total: 420.13');
    });
});
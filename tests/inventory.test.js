
const Inventory = require('../inventory');

test('Inventory constructs with no value', () => {
    let inventory = new Inventory();
    expect(typeof inventory )
        .toBe('object');
});

describe('Testing Inventory Item functionality', () => {

    test('Adding inventory item without any values, will return false', () => {
        let inventory = new Inventory();
        let result    = inventory.add();
        expect(result).toBeFalsy();
    });
    
    test('Adding inventory item with just NAME', () => {
        let inventory = new Inventory();
        let name      = 'Book';
        let result    = inventory.add(name);
        expect(result).toBeFalsy();
    });

    test('Adding inventory item with Name & Price', () => {
        
        let inventory = new Inventory();
        let name      = 'Book';
        let price     = 1.99;

        let result    = inventory.add(name, price);
        expect(result).toEqual(
            {"Book": {"isImported": false, "isTaxExempt": false, "name": "Book", "price": 1.99, "quantity": 1}}
        );
    });

    test('Adding inventory item with Name & Price=0', () => {
        
        let inventory = new Inventory();
        let name      = 'Book';
        let price     = 0;

        let result    = inventory.add(name, price);
        expect(result).toBeFalsy();
    });


    test('Adding inventory item that should be imported', () => {
        
        let inventory       = new Inventory();
        let items           = ['imported bottle of perfume', 'box of imported chocolates'];
        let price           = 20.45;
        let name            = items[Math.floor(Math.random()*items.length)];
        let result    = inventory.add(name, price);

        expect(result).toHaveProperty([name, 'isImported'], true);
    });

    test('Adding inventory item that is tax exempt', () => {
        
        let inventory       = new Inventory();
        let items           = ['book', 'chocolate', 'pills'];
        let price           = 20.45;
        let name            = items[Math.floor(Math.random()*items.length)];
        let result          = inventory.add(name, price);

        expect(result).toHaveProperty([name, 'isTaxExempt'], true);
    });

    //

    test('Adding inventory item as sentence', () => {
        
        let inventory       = new Inventory();
        let sentence        = "6 pencils at 12.49";
        let result          = inventory.addItem(sentence);

        expect(result).toEqual({
                "pencils": {
                    "isImported": false,
                    "isTaxExempt": false,
                    "name": "pencils",
                    "price": 12.49,
                    "quantity": 6
                }
            });
    });
});
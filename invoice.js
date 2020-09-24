class Invoice {

    constructor(inventory)
    {
        this.inventory      = inventory || {};
        this.baseSalesTax   = 10 / 100; // 0.10
        this.importTax      = 5 / 100   // 0.05
        this.rounding       = 1 / 20    // 0.05
    }

    calculate(returnOutput = false)
    {
        const items          = this.inventory.items;
        var salesTaxTotal    = 0;
        var total            = 0;
        var output           = [];

        for (const [key, data] of Object.entries(items)) {
            
            let gross         = 0;
            let net           = data.price;
            let quantity      = data.quantity;
            
            let regularTax = this.determineTaxes(data);   
            let roundedTax = this.roundedTax(regularTax);

            
            let itemTotal = Number( ( (net * quantity) + roundedTax).toFixed(2));
            
            // Because javascript is not great with floats.
            // if(itemTotal.toString().split('.')[1].length > 2){
            //     itemTotal = Number(itemTotal.toFixed(2));
            // }
            

            let outputString  = quantity.toString() +' '+ key + ': ' + itemTotal;

            output.push(outputString);

            salesTaxTotal += roundedTax;
            total         += itemTotal;
            
        } 

        output.push('Sales Taxes: '+salesTaxTotal.toFixed(2));
        output.push('Total: '+total.toFixed(2));
        output.push('=============================');
        output.push('');

        // return array of values;
        if(returnOutput === true){
            return output;
        }

        // print it to screen
        this.print(output);
    }

    determineTaxes(data)
    {
        let net           = data.price;
        let quantity      = data.quantity;
        let tax           = 0;

        // books, food, and medical products that are exempt
        if(data.isTaxExempt === false){
            tax = this.baseSalesTax;
        }

        // imported items
        if(data.isImported === true){
            tax += this.importTax;
        }

        return (net * quantity) * tax;  
    }

    roundedTax(tax)
    { 
        return Number( (Math.ceil(tax * 20 - this.rounding) / 20).toFixed(2) );
    }

    print(output)
    {
        for(var i in output){
            console.log(output[i]);
        }
    }
}

module.exports = Invoice;
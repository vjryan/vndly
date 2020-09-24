
class Inventory {

    constructor()
    { 
        this.taxExemptItems = ['book', 'chocolate', 'pills'];
        this.items = {}
    }

    add(name, price, quantity, isTaxExempt, isImported){

        if(typeof name === 'undefined' || name.length === 0){
            return false;
        }

        if(typeof price === 'undefined' || Number(price) <= 0){
            return false;
        }

        this.items[name] = {
            'name' : name,
            'price': price, 
            'quantity': quantity || 1,
            'isTaxExempt': this.isTaxExempt(name) || false, 
            'isImported': this.isImported(name)   || false, 
        };

        return this.items
    }

    addItem(item)
    {
        if(typeof item !== 'string' || item.length === 0){
            return this.items;
        }

        // splut the string into parts
        const data     = item.split(" at ");
        const regex    = /(^\d+)/gm;
        const quantity = regex.exec(data[0])[0];

        const name     = data[0].substring(
                                quantity.toString().length,
                                data[0].length
                            ).trim();
        const price    = parseFloat(data[1].trim());

        return this.add(
            String(name),
            Number(price),
            Number(quantity)
        );
    }

    isTaxExempt(name)
    {
        for(let i = 0; i < this.taxExemptItems.length; i++){
            if(name.search(this.taxExemptItems[i]) !== -1){
                return true;
            }
        }
        return false;
    }

    isImported(name)
    {
        return (name.search('import') !== -1);
    }
}

module.exports = Inventory;
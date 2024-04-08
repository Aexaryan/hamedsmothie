document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('order-btn').addEventListener('click', () => {
        const fruits = Array.from(document.querySelectorAll('input[name="fruits"]:checked'));
        if (fruits.length === 0) {
            alert("Please select at least one fruit.");
            return;
        }

        const order = new Smoothie();
        order.base = document.getElementById('base').value;
        order.size = document.getElementById('size').value;
        order.fruits = fruits.map(fruit => ({
            name: fruit.value, 
            price: parseFloat(fruit.getAttribute('data-price'))
        }));
        order.extras = document.getElementById('extras').value.split(',').map(extra => extra.trim()).filter(extra => extra);

        const orderSummaryDiv = document.getElementById('order-summary');
        orderSummaryDiv.innerHTML = order.describe();
        orderSummaryDiv.classList.add('visible');
    });
});

class Smoothie {
    constructor() {
        this.base = '';
        this.size = '';
        this.fruits = [];
        this.extras = '';
        this.basePrices = { milk: 2, yogurt: 2.5, juice: 1.5, water: 1, almond_milk: 2.5, coconut_water: 2 };
        this.sizePrices = { small: 0.8, medium: 1, large: 1.2 };
        this.extrasPrice = 0.5;
    }

    calculateTotal() {
        let total = this.basePrices[this.base] * this.sizePrices[this.size];
        this.fruits.forEach(fruit => {
            total += fruit.price;
        });
        total += this.extras.length * this.extrasPrice;
        return total.toFixed(2);
    }

    describe() {
        const fruitList = this.fruits.map(fruit => fruit.name).join(', ') || 'None';
        const extrasList = this.extras.join(', ') || 'None';
        const imageUrl = `images/${this.base}.png`; // Placeholder for smoothie image

        return `
            <h2>Your Smoothie Order</h2>
            <img src="${imageUrl}" alt="Your Smoothie" style="max-width:100%; height:auto;">
            <p>Base: ${this.base} ($${this.basePrices[this.base].toFixed(2)})</p>
            <p>Size: ${this.size}</p>
            <p>Fruits: ${fruitList}</p>
            <p>Extras: ${extrasList}</p>
            <h3>Total Price: $${this.calculateTotal()}</h3>
        `;
    }
}

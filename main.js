const cart = [];
const maxCartSize = 14;
const purchaseButton = document.getElementById('purchaseButton');

function talk() {
    document.querySelector('.bought').innerText =
    "Hi! My name is Lisa. What would you like to buy?";
}

function addToCart(item) {
    if (cart.length < maxCartSize) {
        cart.push(item);
        updateCartDisplay();

        if (cart.length === maxCartSize) {
            purchaseButton.disabled = true;
            document.querySelector('.display').innerText = "Cart is full!";
        }
    }
}

function updateCartDisplay() {
    const cartContainer = document.querySelector('.bought');
    cartContainer.innerHTML = '';  // Clear previous items

    // Add each item with a "Remove" button
    cart.forEach((cartItem, index) => {
        const itemElement = document.createElement('li');
        itemElement.innerText = cartItem;

        // Add a "Remove" button for each item
        const removeButton = document.createElement('button');
        removeButton.innerText = 'Remove';
        removeButton.onclick = () => removeFromCart(index);

        itemElement.appendChild(removeButton);
        cartContainer.appendChild(itemElement);
    });
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartDisplay();

    if (cart.length < maxCartSize) {
        purchaseButton.disabled = false;
        document.querySelector('.display').innerText = '';  // Clear message when item is removed
    }
}

function purchase() {
    if (cart.length === 0) {
        document.querySelector('.display').innerText = 'Your cart is empty!';
    } else {
        speak();  // Display purchase message
        const cartContainer = document.querySelector('.bought');
        cartContainer.innerHTML = '';
        cart.length = 0;  // Clear the cart

        purchaseButton.disabled = false;
        document.querySelector('.display').innerText = '';  // Clear message after purchase
    }
}

function speak() {
    const message = cart.length > 0 
        ? `You have purchased: ${cart.join(', ')}` 
        : 'Your cart is empty';
    document.querySelector('.display').innerText = message;
}
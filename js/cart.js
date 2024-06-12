document.addEventListener("DOMContentLoaded", function () {
    // Retrieve cart items from local storage
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Display cart items and calculate total
    const cartItems = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");

    let total = 0;

    cart.forEach((item, index) => {
        const cartItemDiv = document.createElement("div");
        cartItemDiv.classList.add("cart-item");

        const itemName = document.createElement("h2");
        itemName.textContent = item.name;

        const itemImage = document.createElement("img");
        itemImage.src = item.image;
        itemImage.alt = item.name;

        const itemPrice = document.createElement("p");
        itemPrice.className = "p1";
        itemPrice.textContent = `MYR ${item.price.toFixed(2)}`;

        const quantityDisplay = document.createElement("p");
        quantityDisplay.className = "p2";
        quantityDisplay.textContent = `Quantity: ${item.quantity}`;

        const removeButton = document.createElement("button");
        removeButton.textContent = "Remove";
        removeButton.addEventListener("click", () => {
            removeFromCart(index);
        });

        cartItemDiv.appendChild(itemImage);
        cartItemDiv.appendChild(itemName);
        cartItemDiv.appendChild(itemPrice);
        cartItemDiv.appendChild(quantityDisplay);
        cartItemDiv.appendChild(removeButton);
        cartItems.appendChild(cartItemDiv);

        total += item.price * item.quantity;
    });

    cartTotal.textContent = total.toFixed(2);

    // Display total amount + 5
    const cartTotalPlusFive = document.getElementById("fee");
    const totalPlusFive = total + 5;
    cartTotalPlusFive.textContent = totalPlusFive.toFixed(2);
});


function removeFromCart(index) {
    // Retrieve cart items from local storage
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Decrease the quantity of the item at the specified index
    if (cart[index].quantity > 1) {
        cart[index].quantity -= 1;
    } else {
        // If the quantity is 1, remove the item from the cart
        cart.splice(index, 1);
    }

    // Save the updated cart back to local storage
    localStorage.setItem("cart", JSON.stringify(cart));

    // Refresh the cart display
    location.reload();
    updateCartDisplay();
    //cart count
    updateCartCount();
}

function updateCartCount() {
    // Retrieve the cart from local storage
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Calculate the total item quantity in the cart
    const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);

    // Update the cart count in the first UI element
    const cartCount1 = document.getElementById("cart-count");
    if (cartCount1) {
        cartCount1.textContent = totalQuantity;
    }

    // Update the cart count in the second UI element
    const cartCount2 = document.getElementById("amount");
    if (cartCount2) {
        cartCount2.textContent = totalQuantity;
    }
}

function updateCartDisplay() {
    // Get the cart items list element
    const cartItemsList = document.getElementById("cart-items");

    // Clear the existing cart items
    cartItemsList.innerHTML = "";

    // Add the updated cart items
    cart.forEach((item, index) => {
        const li = document.createElement("li");
        li.textContent = `${item.name} (Quantity: ${item.quantity})`;
        cartItemsList.appendChild(li);
    });
}


const paymentMethodRadios = document.querySelectorAll('input[name="payment"]');
const creditCardFields = document.getElementById('creditCardFields');
const cashFields = document.getElementById('cashFields');
const googleFields = document.getElementById('googleFields');

paymentMethodRadios.forEach(radio => {
    radio.addEventListener('change', function () {
        // Hide all payment method fields
        creditCardFields.style.display = 'none';
        googleFields.style.display = 'none';
        field.style.display = 'none';

        // Show fields for the selected payment method
        if (radio.checked) {
            const selectedPaymentMethod = radio.value;
            if (selectedPaymentMethod === 'debit') {
                field.style.display = 'block';
                creditCardFields.style.display = 'block';
            } else if (selectedPaymentMethod === 'google') {
                field.style.display = 'block';
                googleFields.style.display = 'block';
            }
        }
    });
});

// Function to open a window with the card form
function openWindow() {
    // URL of the card form page
    const cardFormURL = 'lp_card.html';

    // Define window features (remove borders, toolbar, etc.)
    const windowFeatures = 'width=500,height=350,resizable=no,scrollbars=no,toolbar=no,location=no,status=no';

    // Open a new window with the card form and specified features
    window.open(cardFormURL, '_blank', windowFeatures);
}

function myOrder() {
    alert("Order Successfully !!!");
}

function googlep() {
    alert("Connection Error !!! Please Try Again!")
}

updateCartCount();
updateCartDisplay();
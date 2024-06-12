
let slideIndex = 0;
showSlides();

function showSlides() {
    let i;
    let slides = document.getElementsByClassName("mySlides");
    let dots = document.getElementsByClassName("dot");
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slideIndex++;
    if (slideIndex > slides.length) { slideIndex = 1 }
    slides[slideIndex - 1].style.display = "block";
    setTimeout(showSlides, 2000); // Change image every 2 seconds
}


function addcart(productName, productPrice, productImage) {
    // Retrieve the cart from local storage
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Check if the item is already in the cart
    const existingItemIndex = cart.findIndex(item => item.name === productName);

    if (existingItemIndex !== -1) {
        // If the item is already in the cart, increase its quantity
        cart[existingItemIndex].quantity += 1;
    } else {
        // If the item is not in the cart, add it with quantity 1
        const newItem = {
            name: productName,
            price: productPrice,
            image: productImage,
            quantity: 1
        };
        cart.push(newItem);
    }

    // Save the updated cart back to local storage
    localStorage.setItem("cart", JSON.stringify(cart));

    updateCartCount();

}

function updateCartCount() {
    // Retrieve the cart from local storage
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Calculate the total item quantity in the cart
    const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);

    // Update the cart count in the UI
    const cartCount = document.getElementById("cart-count");
    cartCount.textContent = totalQuantity;
}

updateCartCount();

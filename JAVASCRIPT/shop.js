var cart = [];

function initializeShop() {
    let productBoxes = document.querySelectorAll('.box');
    productBoxes.forEach((box, index) => {
        let image = box.querySelector('.images').src;
        let title = box.querySelector('.bottom p').textContent;
        let price = parseFloat(box.querySelector('.bottom h2').textContent.replace('$', ''));
        
        // Add click event to Add to Cart button
        let addButton = box.querySelector('button');
        addButton.onclick = function() {
            addtocart(index);
        };
    });
}

function addtocart(index) {
    let itemBox = document.querySelectorAll('.box')[index];
    let image = itemBox.querySelector('.images').src;
    let title = itemBox.querySelector('.bottom p').textContent;
    let price = parseFloat(itemBox.querySelector('.bottom h2').textContent.replace('$', ''));
    
    let found = cart.find(product => product.title === title);
    if (found) {
        found.quantity += 1;
    } else {
        cart.push({ image, title, price, quantity: 1 });
    }
    displaycart();
}

function changeQuantity(index, quantity) {
    if (quantity === 0) {
        delElement(index);
    } else {
        cart[index].quantity = quantity;
    }
    displaycart();
}

function delElement(index) {
    cart.splice(index, 1);
    displaycart();
}

function displaycart() {
    let total = 0;
    document.getElementById("count").innerHTML = cart.length;
    let cartItemDiv = document.getElementById("cartItem");
    if (cart.length === 0) {
        cartItemDiv.innerHTML = "Your cart is empty";
        document.getElementById("total").innerHTML = "$ 0.00";
    } else {
        cartItemDiv.innerHTML = cart.map((item, index) => {
            total += item.price * item.quantity;
            document.getElementById("total").innerHTML = `$ ${total.toFixed(2)}`;
            return (
                `<div class='cart-item'>
                    <div class='row-img'>
                        <img class='rowimg' src=${item.image}>
                    </div>
                    <p>${item.title}</p>
                    <h2>$ ${item.price.toFixed(2)} x ${item.quantity}</h2>
                    <div class="quantity" style="display: flex; align-items: center;">
                        <button onclick="changeQuantity(${index}, ${item.quantity - 1})">-</button>
                        <div class="count" style="margin: 0 10px;">${item.quantity}</div>
                        <button onclick="changeQuantity(${index}, ${item.quantity + 1})">+</button>
                    </div>
                    <i class='fa-solid fa-trash' onclick='delElement(${index})'></i>
                </div>`
            );
        }).join('');
    }
}

// Initialize shop
initializeShop();
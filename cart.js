 var removeCartItemButtons = document.getElementsByClassName('btn-danger');
    for (var i = 0; i < removeCartItemButtons.length; i++) {
        var button = removeCartItemButtons[i];
        button.addEventListener('click', removeCartItem);
    }

    var quantityInputs = document.getElementsByClassName('cart-quantity-input');
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i];
        input.addEventListener('change', quantityChanged);
    }

    var addToCartButtons = document.getElementsByClassName('shop-item-button');
    for (var i = 0; i < addToCartButtons.length; i++) {
        var button = addToCartButtons[i];
        button.addEventListener('click', addToCartClicked);
    }
function totalNumOfItems(){
    var cartItemContainer = document.getElementsByClassName('cart-items')[0];
    var cartRows = cartItemContainer.getElementsByClassName('cart-row');
    var totalItemsInCart = 0;
    for (var i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i];
        var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0];
        var quantity = quantityElement.value;
        totalItemsInCart = parseInt(totalItemsInCart) + parseInt(quantity);
    }
    document.getElementById('numOfItems').innerHTML= totalItemsInCart;
}
function removeCartItem(event) {
    var buttonClicked = event.target;
    buttonClicked.parentElement.parentElement.remove();
    updateCartTotal();
    totalNumOfItems();
}

function quantityChanged(event) {
    var input = event.target;
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1;
    }
    updateCartTotal();
    totalNumOfItems();
}

function addToCartClicked(event) {
    var button = event.target;
    var shopItem = button.parentElement.parentElement;
    var title = shopItem.getElementsByClassName('shop-item-title')[0].innerText;
    var price = shopItem.getElementsByClassName('shop-item-price')[0].innerText;
    var imageSrc = shopItem.getElementsByClassName('shop-item-image')[0].src;
    addItemToCart(title, price, imageSrc);
    updateCartTotal();
    totalNumOfItems();
}

function addItemToCart(title, price, imageSrc) {
    var cartRow = document.createElement('div');
    cartRow.classList.add('cart-row');
    var cartItems = document.getElementsByClassName('cart-items')[0];
    var cartItemNames = cartItems.getElementsByClassName('cart-item-title');
    for (var i = 0; i < cartItemNames.length; i++) {
        if (cartItemNames[i].innerText == title) {
            alert('This item is already added to the cart');
            return;
        }
    }
    var cartRowContents = `
        <div class="cart-item cart-column">
            <img class="cart-item-image" src="${imageSrc}" width="100" height="100"><br><br>
            <span class="cart-item-title">${title}</span>
        </div>
        <span class="cart-price cart-column">${price}</span>
        <div class="cart-quantity cart-column">
            <input class="cart-quantity-input" type="number" value="1">
            <button class="btn btn-danger" type="button">X</button>
        </div>`
    alert("Item added to cart");
    cartRow.innerHTML = cartRowContents;
    cartItems.append(cartRow);
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem);
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged);
}

function updateCartTotal() {
    var cartItemContainer = document.getElementsByClassName('cart-items')[0];
    var cartRows = cartItemContainer.getElementsByClassName('cart-row');
    var total = 0;
    for (var i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i];
        var priceElement = cartRow.getElementsByClassName('cart-price')[0];
        var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0];
        var price = parseFloat(priceElement.innerText.replace('Rs.', ''));
        var quantity = quantityElement.value;
        total = total + (price * quantity);
    }
    total = Math.round(total * 100) / 100;
    document.getElementsByClassName('cart-total-price')[0].innerText = 'Rs.' + total;
}
function changeClass(){
    var element = document.getElementById("cartId");
        element.classList.remove("cart");
        element.classList.add("show-cart");
        updateCartTotal();
    totalNumOfItems();
}
function openPayment(){
    var ttotal = document.getElementsByClassName('cart-total-price')[0].innerText.replace('Rs.', '');
    if(ttotal!=0)
    window.location.href="payment.html";
}
function changeClass2(){
    var element2 = document.getElementById("cartId");
        element2.classList.remove("show-cart");
        element2.classList.add("cart");
}
function feedback(){
    alert("Order Confirmed..!");
}
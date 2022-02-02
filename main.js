let carts = document.querySelectorAll('.add-cart');

let products = [
    {
        name: 'Chocolate Cake',
        tag: 'chococake',
        price: 600,
        inCart: 0
	},
    {
        name: "Red Velvet Cake",
        tag: "redcake",
        price: 700,
        inCart: 0
	},
    {
        name: "Blueberry Cake",
        tag: 'bluecake',
        price: 1000,
        inCart: 0
	},
    {
        name: "Butter Scotch Cake",
        tag: 'buttercake',
        price: 500,
        inCart: 0
	},
    {
        name: "Black Forest Cake",
        tag: "blackcake",
        price: 650,
        inCart: 0
	},
    {
        name: "Kit Kat Cake",
        tag: 'kitkatcake',
        price: 900,
        inCart: 0
	},
    {
        name: 'Chocolate Cupcake',
        tag: 'chococc',
        price: 80,
        inCart: 0
	},
    {
        name: "Red Velvet Cupcake",
        tag: 'redcc',
        price: 100,
        inCart: 0
	},
    {
        name: "Blueberry Cupcake",
        tag: 'bluecc',
        price: 120,
        inCart: 0
	},
    {
        name: "Rainbow Cupcake",
        tag: 'raincc',
        price: 90,
        inCart: 0
	},
    {
        name: "Strawberry Cupcake",
        tag: 'strawcc',
        price: 50,
        inCart: 0
	},
    {
        name: "Oreo Cupcake",
        tag: 'cookiescc',
        price: 100,
        inCart: 0
	},
    {
        name: 'Choco Truffle Pastry',
        tag: 'chocopas',
        price: 60,
        inCart: 0
	},
    {
        name: "Rainbow Pastry",
        tag: 'rainpas',
        price: 75,
        inCart: 0
	},
    {
        name: "Strawberry Vanilla Pastry",
        tag: 'strawpas',
        price: 40,
        inCart: 0
	},
    {
        name: "Red Velvet Pastry",
        tag: 'redpas',
        price: 55,
        inCart: 0
	},
    {
        name: "Oreo Pastry",
        tag: 'oreopas',
        price: 65,
        inCart: 0
	},
    {
        name: "Black Forest Pastry",
        tag: 'blackpas',
        price: 50,
        inCart: 0
	},

    {
        name: 'Chocolate Macaron',
        tag: 'cmac',
        price: 60,
        inCart: 0
	},
    {
        name: "Blueberry Macaron",
        tag: 'bluemac',
        price: 70,
        inCart: 0
	},
    {
        name: "Mint Macaron",
        tag: 'mintmac',
        price: 65,
        inCart: 0
	},
    {
        name: "Red Velvet macaron",
        tag: 'redmac',
        price: 50,
        inCart: 0
	},
    {
        name: "Lemon Macaron",
        tag: 'lemonmac',
        price: 65,
        inCart: 0
	},
    {
        name: "Strawberry Macaron",
        tag: 'strawberrymac',
        price: 45,
        inCart: 0
	},
    {
        name: "Strawberry Donut",
        tag: 'strawdon',
        price: 50,
        inCart: 0
	},
    {
        name: 'Chocolate Donut',
        tag: 'cdon',
        price: 65,
        inCart: 0
	},
    {
        name: "Space Donut",
        tag: 'spacedon',
        price: 100,
        inCart: 0
	},
    {
        name: "Rainbow Donut",
        tag: 'raindon',
        price: 120,
        inCart: 0
	},
    {
        name: "Red Velvet Donut",
        tag: 'reddon',
        price: 90,
        inCart: 0
	},
    {
        name: "Oreo Donut",
        tag: 'oreodon',
        price: 110,
        inCart: 0
	}


];

for (let i = 0; i < carts.length; i++) {
    carts[i].addEventListener('click', () => {
        alert("Item added to cart");
        cartNumbers(products[i]);
        totalCost(products[i]);

    })
}

function onLoadCartNumbers() {
    let productNumbers = localStorage.getItem('cartNumbers');

    if (productNumbers) {
        document.querySelector('.cart span').textContent = productNumbers;
    }
}

function cartNumbers(product) {

    let productNumbers = localStorage.getItem('cartNumbers');

    productNumbers = parseInt(productNumbers);

    if (productNumbers) {
        localStorage.setItem('cartNumbers', productNumbers + 1);
        document.querySelector('.cart span').textContent = productNumbers + 1;
    } else {
        localStorage.setItem('cartNumbers', 1);
        document.querySelector('.cart span').textContent = 1;
    }
    setItems(product)
}

function setItems(product) {
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);

    if (cartItems != null) {

        if (cartItems[products.tag] == undefined) {
            cartItems = {
                ...cartItems,
				[product.tag]: product
            }
        }
        cartItems[product.tag].inCart += 1;
    } else {
        product.inCart = 1;

        cartItems = {
		[product.tag]: product
        }
    }

    localStorage.setItem("productsInCart", JSON.stringify(cartItems));

}

function totalCost(product) {
    let cartCost = localStorage.getItem('totalCost');

    localStorage.setItem("totalCost", product.price);
    if (cartCost != null) {
        cartCost = parseInt(cartCost);
        localStorage.setItem("totalCost", cartCost + product.price);
    } else {
        localStorage.setItem("totalCost", product.price);
    }
}

function displayCart() {
    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);
    let productContainer = document.querySelector(".products-Container");
    let cartCost = localStorage.getItem('totalCost');
    console.log(cartItems);
    if (cartItems && productContainer) {
        productContainer.innerHTML = '';
        Object.values(cartItems).map(item => {
            productContainer.innerHTML += `
           <div class="product">
			<div class="itemname"><img class="jsimg" src="images/${item.tag}.jpg"><br><span class="jsname">${item.name}</span></div>  
			<div class="itemprice"><br><br><br>Rs.${item.price}</div>
			<div class="itemquantity"><br><br><br><ion-icon name="caret-back-circle-outline"></ion-icon>&nbsp;&nbsp;
			<span>${item.inCart}</span>&nbsp;&nbsp;
			<a  class="add-cart" href="#"><ion-icon name="caret-forward-circle-outline"></ion-icon></a></div>
             <div class="itemtotal"><br><br><br>Rs.${item.inCart * item.price}</div>
			<div class="itemtag"><br><ion-icon class="ttag" name="close-circle-outline"></ion-icon></div>
			</div>
             <hr>
			`;
        });
        productContainer.innerHTML += `
		<div class="basketTotalContainer">
		<h4 class="basketTotalTitle">
		Basket Total <span class="rupees"> Rs.${cartCost}</span>
		</h4><hr>
`
    }

}
onLoadCartNumbers();
displayCart();

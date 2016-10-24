(function (){ //IIFE
	
	function getCartArray() {
		var cartArray = localStorage['cartArray'];
		if (!cartArray) {
			cartArray = [];
			localStorage.setItem('cartArray', JSON.stringify(cartArray));
		} else {
			cartArray = JSON.parse(cartArray);
		}
		return cartArray;
	}

	var cartArray = getCartArray();

	// Loop through items in local storage

	for (var i = 0; i < cartArray.length; i++) {
		var key = cartArray[i];
		var value = localStorage[key];
		addCartItems(value)
	}

	// Add cart items to DOM

	function addCartItems(value) {
		var cart = document.querySelector('.cart');
		row = document.createElement('tr');
		data = document.createElement('td');
		data.innerHTML = value;
		row.appendChild(data);
		cart.appendChild(row);
	}

	// Add item to Cart

	var button = document.querySelector('.add');
	button.addEventListener('click', function () {
		var cartArray = getCartArray();
		var currentDate = new Date();
		var key = 'item_' + currentDate.getTime();
		var itemArray = [];
		var description = document.querySelector('.description').innerHTML;
		var price = document.querySelector('.price').innerHTML;
		itemArray.push({'desc':description})
		itemArray.push({'price': price})
		var value = JSON.stringify(itemArray);
		localStorage.setItem(key, value);
		cartArray.push(key);
		localStorage.setItem('cartArray', JSON.stringify(cartArray));
	});

})();
'use strict'

;(function() { // IIFE

    var cartArray, itemArray, key, value, item, desc, price, quantity, cart, row, dataDesc, dataPrice, dataQuantity, deleteData, deleteButton, subTotal, itemTotal, total, button, currentDate, description, sum

    // Create or return cart array

    function getCartArray() {
        cartArray = localStorage['cartArray']
        if (!cartArray) {
            cartArray = []
            localStorage.setItem('cartArray', JSON.stringify(cartArray))
        } else {
            cartArray = JSON.parse(cartArray)
        }
        return cartArray
    }

    // Use cart array

    cartArray = getCartArray()

    // Get item array

    function getItemArray() {
        if (!itemArray) {
            itemArray = []
        } 
        return itemArray
    }

    itemArray = getItemArray()

    // Loop through items in local storage

    for (var i = 0; i < cartArray.length; i++) {
        key = cartArray[i]
        value = localStorage[key]
        addCartItems(value)
    }

    // Add cart items to DOM

    function addCartItems(value) {
        value = JSON.parse(value)
        // Loop through array and retrieve description, price and quantity from local storage.
        for (item in value) {
            desc = value[0].desc
            price = value[1].price
            quantity = value[2].qty
        }
        // Add description, price, quantity to the DOM
        cart = document.querySelector('.cart')
        row = document.createElement('tr')
        dataDesc = document.createElement('td')
        dataDesc.innerHTML = desc;
        dataPrice = document.createElement('td')
        dataPrice.innerHTML = '$ ' + price;
        dataQuantity = document.createElement('td')
        dataQuantity.innerHTML = quantity;
        deleteData = document.createElement('td')
        deleteButton = document.createElement('button')
        deleteButton.setAttribute('class', key)
        deleteData.appendChild(deleteButton).innerHTML = 'delete';
        subTotal = document.createElement('td')
        subTotal.classList.add('subtotal')
        subTotal.innerHTML = '$ ' + (price * quantity).toFixed(2)
        row.appendChild(dataDesc)
        row.appendChild(dataPrice)
        row.appendChild(dataQuantity)
        row.appendChild(subTotal)
        row.appendChild(deleteData)
        cart.appendChild(row)
    }

    // Display total amount of items in the cart

    itemTotal = cartArray.length
    total = document.querySelector('.item-total')
    total.innerHTML = itemTotal

    // Add item to cart

    button = document.querySelectorAll('.add')

    for (var i = 0; i < button.length; i++) {

        button[i].addEventListener('click', function() {
            // Create unique id / timestamp for each product added.
            currentDate = new Date()
            key = 'item_' + currentDate.getTime()
            // Get value from DOM
            description = this.parentElement.querySelector('.description').innerHTML
            price = this.parentElement.querySelector('.price').innerHTML
            quantity = this.parentElement.querySelector('.qty').value
            // Push items value into item array
            itemArray.push({ 'desc': description })
            itemArray.push({ 'price': price })
            itemArray.push({ 'qty': quantity })
            localStorage.setItem(key, JSON.stringify(itemArray))
            cartArray.push(key)
            localStorage.setItem('cartArray', JSON.stringify(cartArray))
            // Update amount of items in the cart
            itemTotal++
            total.innerHTML = itemTotal
            location.reload() // Reload page
        });
    }

    // Cart total

    subTotal = document.querySelectorAll('.subtotal')
    sum = 0
    for (var i = 0; i < subTotal.length; i++) {
        sum += parseInt(subTotal[i].innerHTML.slice(2))
    }
    sum = sum.toFixed(2)

    // Add total if more than 0 items int he cart.

    if (cartArray.length > 0) {
        document.querySelector('.cart-contents').innerHTML = '<strong>Total: </strong> $ ' + sum
    }

    // Delete items

    deleteButton = document.querySelector('table').querySelectorAll('button')

    for (var i = 0; i < deleteButton.length; i++) {
        deleteButton[i].addEventListener('click', deleteItem)
    }

    function deleteItem(e) {
        key = e.target.className
        if (cartArray) {
            for (var i = 0; i < cartArray.length; i++) {
                if (key == cartArray[i]) {
                    cartArray.splice(i, 1)
                }
            }
        }
        localStorage.setItem('cartArray', JSON.stringify(cartArray))
        location.reload()
    }


})()

'use strict'

;(function() { // IIFE

    // Create or return cart array

    var cartArray = getCartArray()

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

    // Get item array

    var itemArray = getItemArray()

    function getItemArray() {
        if (!itemArray) {
            itemArray = []
        }
        return itemArray
    }

    // Loop through items in local storage

    for (var i = 0; i < cartArray.length; i++) {
        var key = cartArray[i]
        var value = localStorage[key]
        addCartItems(value)
    }

    // Add cart items to DOM

    var desc, price, quantity

    function addCartItems(value) {
        value = JSON.parse(value)
        // Loop through array and retrieve description, price and quantity from local storage.
        for (var item in value) {
            desc = value[0].desc
            price = value[1].price
            quantity = value[2].qty
        }
        // Add description, price, quantity to the DOM
        const cart = document.querySelector('.cart')
        const row = document.createElement('tr')
        const dataDesc = document.createElement('td')
        dataDesc.innerHTML = desc;
        const dataPrice = document.createElement('td')
        dataPrice.innerHTML = '$ ' + price;
        const dataQuantity = document.createElement('td')
        dataQuantity.innerHTML = quantity;
        const deleteData = document.createElement('td')
        const deleteBtn = document.createElement('button')
        deleteBtn.setAttribute('class', key)
        deleteData.appendChild(deleteBtn).innerHTML = 'delete';
        const subTotal = document.createElement('td')
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

    var itemTotal = cartArray.length
    const total = document.querySelector('.item-total')
    total.innerHTML = itemTotal

    // Add item to cart

    const btn = document.querySelectorAll('.add')

    for (var i = 0; i < btn.length; i++) {

        btn[i].addEventListener('click', function() {
            // Create unique id / timestamp for each product added.
            const id = this.parentElement.getAttribute('id')
            key = 'item_' + id
            // Get value from DOM
            desc = this.parentElement.querySelector('.description').innerHTML
            price = this.parentElement.querySelector('.price').innerHTML
            quantity = this.parentElement.querySelector('.qty').value
            // Push items value into item array
            itemArray.push({ 'desc': desc })
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

    const grandTotal = document.querySelectorAll('.subtotal')
    var sum = 0
    for (var i = 0; i < grandTotal.length; i++) {
        sum += parseInt(grandTotal[i].innerHTML.slice(2))
    }
    sum = sum.toFixed(2)

    // Add total if more than 0 items int he cart.

    if (cartArray.length > 0) {
        document.querySelector('.cart-contents').innerHTML = '<strong>Total: </strong> $ ' + sum
    }

    // Delete items

    const deleteBtn = document.querySelector('table').querySelectorAll('button')

    for (var i = 0; i < deleteBtn.length; i++) {
        deleteBtn[i].addEventListener('click', deleteItem)
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

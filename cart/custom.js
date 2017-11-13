'use strict'

{ // Scope

    // Create or return cart array
    let cartArray
    const getCartArray = () => {
        cartArray = localStorage['cartArray']
        if (!cartArray) {
            cartArray = []
            localStorage.setItem('cartArray', JSON.stringify(cartArray))
        } else {
            cartArray = JSON.parse(cartArray)
        }
        return cartArray
    }
    cartArray = getCartArray()

    // Get item array
    let itemArray
    const getItemArray = () => {
        if (!itemArray) {
            itemArray = []
        }
        return itemArray
    }
    itemArray = getItemArray()

    // Loop through items in local storage
    let key
    cartArray.map(item => {
      key = item
      let value = localStorage[key]
      addCartItems(value)
    })

    // Add cart items to DOM
    function addCartItems(value) {
        value = JSON.parse(value)
        // Loop through array and retrieve description, price and quantity from local storage.
        let desc, price, quantity
        for (let item in value) {
            desc = value[0].desc
            price = value[1].price
            quantity = value[2].qty
        }
        // Add description, price, quantity to the DOM
        const cart = document.querySelector('.cart')
        const row = document.createElement('tr')
        const dataDesc = document.createElement('td')
        dataDesc.innerHTML = desc
        const dataPrice = document.createElement('td')
        dataPrice.innerHTML = `$ ${price}`
        const dataQuantity = document.createElement('td')
        dataQuantity.innerHTML = quantity
        const deleteData = document.createElement('td')
        const deleteBtn = document.createElement('button')
        deleteBtn.setAttribute('class', key)
        deleteData.appendChild(deleteBtn).innerHTML = 'delete';
        const subTotal = document.createElement('td')
        subTotal.classList.add('subtotal')
        subTotal.innerHTML = `$ ${(price * quantity).toFixed(2)}`
        row.appendChild(dataDesc)
        row.appendChild(dataPrice)
        row.appendChild(dataQuantity)
        row.appendChild(subTotal)
        row.appendChild(deleteData)
        cart.appendChild(row)
    }

    // Display total amount of items in the cart
    let itemTotal = cartArray.length
    const total = document.querySelector('.item-total')
    total.innerHTML = itemTotal

    // Add item to cart
    const btn = document.querySelectorAll('.add')

    for (let i = 0; i < btn.length; i++) {
        btn[i].addEventListener('click', function() {
            // Create unique id / timestamp for each product added.
            // May need to create unique ID or if ID is the same add to quantity.
            const id = this.parentElement.getAttribute('id')
            key = `item_${id}`
            // Get value from DOM
            let desc = this.parentElement.querySelector('.description').innerHTML
            let price = this.parentElement.querySelector('.price').innerHTML
            let quantity = this.parentElement.querySelector('.qty').value
            // Add items value into item array
            itemArray = [...itemArray, { 'desc': desc }, { 'price': price }, { 'qty': quantity }]
            localStorage.setItem(key, JSON.stringify(itemArray))
            cartArray = [...cartArray, key]
            localStorage.setItem('cartArray', JSON.stringify(cartArray))
            // Update amount of items in the cart
            itemTotal++
            total.innerHTML = itemTotal
            location.reload() // Reload page
        });
    }

    // Cart total
    const grandTotal = document.querySelectorAll('.subtotal')
    let sum = 0
    for (let i = 0; i < grandTotal.length; i++) {
        sum += parseInt(grandTotal[i].innerHTML.slice(2))
    }
    sum = sum.toFixed(2)

    // Add total if more than 0 items int he cart.
    if (cartArray.length > 0) {
        document.querySelector('.cart-contents').innerHTML = `<strong>Total: </strong> $ ${sum}`
    }

    // Delete items
    // Still need to delete contents from itemArray (under development)
    const deleteBtn = document.querySelector('table').querySelectorAll('button')
    const deleteItem = (e) => {
        key = e.target.className
        if (cartArray) {
            cartArray.map(item => {
              if (key == item) {
                cartArray.splice(item, 1)
              }
            })
        }
        localStorage.setItem('cartArray', JSON.stringify(cartArray))
        location.reload()
    }
    for (let i = 0; i < deleteBtn.length; i++) {
        deleteBtn[i].addEventListener('click', deleteItem)
    }
}

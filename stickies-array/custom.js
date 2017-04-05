'use strict'

;(function() { // IIFE

    var stickiesArray, key, value, stickies, sticky, span, button, currentDate, clearButton

    // Stickies array

    function getStickiesArray() {
        stickiesArray = localStorage['stickiesArray']
        if (!stickiesArray) {
            stickiesArray = []
            localStorage.setItem('stickiesArray', JSON.stringify(stickiesArray))
        } else {
            stickiesArray = JSON.parse(stickiesArray)
        }
        return stickiesArray
    }

    stickiesArray = getStickiesArray();

    // Loop through items in local storage

    for (var i = 0; i < stickiesArray.length; i++) {
        key = stickiesArray[i]
        value = localStorage[key]
        addSticky(value)
    }

    // Add items to DOM

    function addSticky(value) {
        stickies = document.querySelector('.stickies')
        sticky = document.createElement('li')
        span = document.createElement('span')
        sticky.setAttribute('class', key)
        span.innerHTML = value
        sticky.appendChild(span)
        stickies.appendChild(sticky)
        sticky.addEventListener('click', deleteSticky)
    }

    // Create a new item

    button = document.querySelector('.add')
    button.addEventListener('click', function () {
        createSticky()
    });

    function createSticky() {
        stickiesArray = getStickiesArray()
        currentDate = new Date()
        key = 'sticky_' + currentDate.getTime()
        value = document.querySelector('.note').value
        localStorage.setItem(key, value)
        stickiesArray.push(key)
        localStorage.setItem('stickiesArray', JSON.stringify(stickiesArray))
        addSticky(value)
    }

    // Clear storage

    clearButton = document.querySelector('.clear')
    clearButton.addEventListener('click', function() {
        clearStorage()
        location.reload() // Reload page
    });

    function clearStorage() {
        localStorage.clear()
    }

    // Delete sticky item

    function deleteSticky(e) {
        key = e.target.className
        if (e.target.tagName.toLowerCase() == 'span') {
            key = e.target.parentNode.className
        }
        localStorage.removeItem(key)
        stickiesArray = getStickiesArray()
        if (stickiesArray) {
            for (var i = 0; i < stickiesArray.length; i++) {
                if (key == stickiesArray[i]) {
                    stickiesArray.splice(i, 1)
                }
            }
        }
        localStorage.setItem('stickiesArray', JSON.stringify(stickiesArray))
        location.reload()
    }

})()

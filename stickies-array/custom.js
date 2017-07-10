'use strict'

;(function() { // IIFE

    // Stickies array

    var stickiesArray = getStickiesArray();

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

    // Loop through items in local storage

    for (var i = 0; i < stickiesArray.length; i++) {
        var key = stickiesArray[i]
        var value = localStorage[key]
        addSticky(value)
    }

    // Add items to DOM

    function addSticky(value) {
        const stickies = document.querySelector('.stickies')
        const sticky = document.createElement('li')
        const span = document.createElement('span')
        sticky.setAttribute('class', key)
        span.innerHTML = value
        sticky.appendChild(span)
        stickies.appendChild(sticky)
        sticky.addEventListener('click', deleteSticky)
    }

    // Create a new item

    const btn = document.querySelector('.add')
    btn.addEventListener('click', function () {
        createSticky()
    });

    function createSticky() {
        stickiesArray = getStickiesArray()
        var currentDate = new Date()
        key = 'sticky_' + currentDate.getTime()
        value = document.querySelector('.note').value
        localStorage.setItem(key, value)
        stickiesArray.push(key)
        localStorage.setItem('stickiesArray', JSON.stringify(stickiesArray))
        addSticky(value)
    }

    // Clear storage

    const clearBtn = document.querySelector('.clear')
    clearBtn.addEventListener('click', function() {
        clearStorage()
        location.reload() // Reload page
    });

    function clearStorage() {
        localStorage.clear()
    }

    // Delete sticky item

    function deleteSticky(e) {
        key = e.target.className
        // If you click on the span element check parent elements class name
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

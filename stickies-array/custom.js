'use strict'

{ // Scope

    // Stickies array
    let stickiesArray
    const getStickiesArray = () => {
        stickiesArray = localStorage['stickiesArray']
        if (!stickiesArray) {
            stickiesArray = []
            localStorage.setItem('stickiesArray', JSON.stringify(stickiesArray))
        } else {
            stickiesArray = JSON.parse(stickiesArray)
        }
        return stickiesArray
    }
    stickiesArray = getStickiesArray()

    // Loop through items in local storage
    let key, value
    stickiesArray.map(item => {
      key = item
      value = localStorage[key]
      addSticky(value)
    })

    // Add items to DOM
    function addSticky(value) {
        const stickies = document.getElementById('stickies')
        const sticky = document.createElement('li')
        const span = document.createElement('span')
        sticky.classList.add(key)
        span.innerHTML = value
        sticky.appendChild(span)
        stickies.appendChild(sticky)
        sticky.addEventListener('click', deleteSticky)
    }

    // Create a new item
    const createSticky = () => {
        var currentDate = new Date()
        key = `sticky_${currentDate.getTime()}`
        value = document.getElementById('note').value
        localStorage.setItem(key, value)
        stickiesArray = [...stickiesArray, key]
        localStorage.setItem('stickiesArray', JSON.stringify(stickiesArray))
        addSticky(value)
    }
    const btn = document.getElementById('add')
    btn.addEventListener('click', createSticky)

    // Clear storage
    const clearBtn = document.getElementById('clear')
    clearBtn.addEventListener('click', () => {
        localStorage.clear()
        location.reload()
    })

    // Delete sticky item
    function deleteSticky(e) {
        key = e.target.className
        // If you click on the span element check parent elements class name
        if (e.target.tagName.toLowerCase() == 'span') {
            key = e.target.parentNode.className
        }
        localStorage.removeItem(key)
        if (stickiesArray) {
            stickiesArray.map( item => {
                if (key == item) {
                    stickiesArray.splice(item, 1)
                }
            })
        }
        localStorage.setItem('stickiesArray', JSON.stringify(stickiesArray))
        location.reload()
    }
}

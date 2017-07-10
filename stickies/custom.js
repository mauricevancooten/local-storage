'use strict'

;(function() { // IIFE

  // Loop through items in local storage

  for (var i = 0; i < localStorage.length; i++) {
    var key = localStorage.key(i)
    if (key.substring(0, 6) == 'sticky') { // test to see if begins with sticky
      var value = localStorage.getItem(key)
      addSticky(value)
    }
  }

  // Add items to DOM

  function addSticky(value) {
    const stickies = document.querySelector('.stickies')
    const sticky = document.createElement('li')
    const span = document.createElement('span')
    span.setAttribute('class', 'sticky')
    span.innerHTML = value
    sticky.appendChild(span)
    stickies.appendChild(sticky)
  }

  // Create a new item

  const btn = document.querySelector('.add')
  btn.addEventListener('click', function() {
    createSticky()
  })

  function createSticky() {
    value = document.querySelector('.note').value
    key = 'sticky_' + localStorage.length
    localStorage.setItem(key, value)
    addSticky(value)
  }

  // Clear storage

  const clearBtn = document.querySelector('.clear')
  clearBtn.addEventListener('click', function() {
    localStorage.clear()
  })

})()

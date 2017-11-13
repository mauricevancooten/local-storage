'use strict'

{ // Scope

  // Loop through items in local storage
  let value, key
  for (let i = 0; i < localStorage.length; i++) {
    key = localStorage.key(i)
    if (key.substring(0, 6) === 'sticky') { // test to see if begins with sticky
      value = localStorage.getItem(key)
      addSticky(value)
    }
  }

  // Add items to DOM
  function addSticky(value) {
    const stickies = document.getElementById('stickies')
    const sticky = document.createElement('li')
    const span = document.createElement('span')
    span.classList.add('sticky')
    span.innerHTML = value
    sticky.appendChild(span)
    stickies.appendChild(sticky)
  }

  // Create a new item
  const createSticky = () => {
    value = document.getElementById('note').value
    key = `sticky_${localStorage.length}`
    localStorage.setItem(key, value)
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

}

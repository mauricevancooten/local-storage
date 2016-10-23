(function() { // IIFE

    // Stickies array

    function getStickiesArray() {
        var stickiesArray = localStorage['stickiesArray'];
        if (!stickiesArray) {
            stickiesArray = [];
            localStorage.setItem('stickiesArray', JSON.stringify(stickiesArray));
        } else {
            stickiesArray = JSON.parse(stickiesArray);
        }
        return stickiesArray;
    }

    var stickiesArray = getStickiesArray();

    // Loop through items in local storage

    for (var i = 0; i < stickiesArray.length; i++) {
        var key = stickiesArray[i];
        var value = localStorage[key];
        addSticky(value);
    }

    // Add items to DOM

    function addSticky(value) {
        var stickies = document.querySelector('.stickies'),
            sticky = document.createElement('li'),
            span = document.createElement('span');
        sticky.setAttribute('class', key);
        span.innerHTML = value;
        sticky.appendChild(span);
        stickies.appendChild(sticky);
        sticky.addEventListener('click', deleteSticky)
    }

    // Create a new item

    var button = document.querySelector('.add');
    button.addEventListener('click', function () {
        createSticky();
    });

    function createSticky() {
        var stickiesArray = getStickiesArray();
        var currentDate = new Date();
        var key = 'sticky_' + currentDate.getTime();
        var value = document.querySelector('.note').value;
        localStorage.setItem(key, value);
        stickiesArray.push(key);
        localStorage.setItem('stickiesArray', JSON.stringify(stickiesArray));
        addSticky(value);
    }

    // Clear storage

    var clearButton = document.querySelector('.clear');
    clearButton.addEventListener('click', function() {
        clearStorage();
        location.reload(); // Reload page
    });

    function clearStorage() {
        localStorage.clear();
    }

    // Delete sticky item

    function deleteSticky(e) {
        var key = e.target.className;
        if (e.target.tagName.toLowerCase() == 'span') {
            key = e.target.parentNode.className;
        }
        localStorage.removeItem(key);
        var stickiesArray = getStickiesArray();
        if (stickiesArray) {
            for (var i = 0; i < stickiesArray.length; i++) {
                if (key == stickiesArray[i]) {
                    stickiesArray.splice(i, 1)
                }
            }
        }
        localStorage.setItem('stickiesArray', JSON.stringify(stickiesArray));
        location.reload();
    }

})();

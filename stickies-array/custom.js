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
        span.setAttribute('class', 'sticky');
        span.innerHTML = value;
        sticky.appendChild(span);
        stickies.appendChild(sticky);
    }

    // Create a new item

    var button = document.querySelector('.add');
    button.addEventListener('click', function() {
        createSticky();
    });

    function createSticky() {
        var value = document.querySelector('.note').value;
        var key = 'sticky_' + localStorage.length;
        localStorage.setItem(key, value);
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

})();

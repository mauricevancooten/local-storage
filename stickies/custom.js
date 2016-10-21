(function() { // IIFE

    // Loop through items in local storage

    for (var i = 0; i < localStorage.length; i++) {
        var key = localStorage.key(i);
        if (key.substring(0, 6) == 'sticky') { // Test to see if begins with sticky
            var value = localStorage.getItem(key);
            addSticky(value);
        }
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

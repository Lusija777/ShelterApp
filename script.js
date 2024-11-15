document.addEventListener('DOMContentLoaded', function() {
    // Load the navigation
    fetch('navigation.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('navigation').innerHTML = data;
        })
        .catch(error => console.error('Error loading navigation:', error));

    // Load the footer
    fetch('footer.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('footer').innerHTML = data;
        })
        .catch(error => console.error('Error loading footer:', error));
});

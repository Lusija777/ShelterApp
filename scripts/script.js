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

function redirectToPage(page) {
    switch (page) {
        case 'adopt':
            window.location.href = 'not_implemented.html';
            break;
        case 'walk':
            window.location.href = 'walk_out.html';
            break;
        case 'help':
            window.location.href = 'not_implemented.html';
            break;
        case 'contact':
            window.location.href = 'not_implemented.html';
            break;
        default:
            window.location.href = 'not_implemented.html';
    }
}
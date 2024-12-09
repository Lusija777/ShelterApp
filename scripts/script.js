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

    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
    const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))
});

function removeDataInLocalStorageForWalk() {
    localStorage.removeItem('userData');
    localStorage.removeItem('selectedDogId');
    localStorage.removeItem('selectedDate');
    localStorage.removeItem('selectedTime');
    localStorage.removeItem('timeId');
}

function redirectToPage(page) {
    switch (page) {
        case 'adopt':
            window.location.href = 'catalog.html';
            break;
        case 'walk':
            removeDataInLocalStorageForWalk();
            window.location.href = 'walk_out.html';
            break;
        case 'help':
            window.location.href = 'not_implemented.html';
            break;
        case 'contact':
            window.location.href = 'not_implemented.html';
            break;
        case 'index':
            window.location.href = 'index.html';
            break;
        default:
            window.location.href = 'not_implemented.html';
    }
}
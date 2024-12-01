document.addEventListener('DOMContentLoaded', function() {
    let button = document.querySelector('#submit');
    button.addEventListener('click', function() {
        history.back();
    });
});
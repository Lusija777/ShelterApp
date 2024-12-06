document.getElementById('submitButton').addEventListener('click', function() {
    window.location.href = 'index.html';
});
document.addEventListener('DOMContentLoaded', () => {
    localStorage.setItem('isInReservationProcess', false);
});

document.addEventListener('DOMContentLoaded', function() {
    const selectedDate = localStorage.getItem("selectedDate");
    const selectedTime = localStorage.getItem("selectedTime");

    if (selectedDate && selectedTime) {
        console.log('Selected date:', selectedDate);
        console.log('Selected time:', selectedTime);
    }
});
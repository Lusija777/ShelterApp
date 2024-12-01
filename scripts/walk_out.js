document.addEventListener('DOMContentLoaded', function () {
    flatpickr("#datepicker", {
        inline: true,
        dateFormat: "Y-m-d",
        firstDayOfWeek: 1,
        locale: "sk",
        minDate: new Date().fp_incr(1),
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const datepicker = document.querySelector('#datepicker');
    const timeButtons = document.querySelectorAll('#time button');
    const submitButton = document.querySelector('#submit');

    let selectedTime = null;
    timeButtons.forEach(button => {
        button.addEventListener('click', function () {
            document.querySelectorAll('#time button').forEach(btn => {
                btn.classList.remove('selected');
            });

            this.classList.add('selected');
            selectedTime = this.innerText;
        });
    });

    submitButton.addEventListener('click', function (event) {
        event.preventDefault();
        console.log('Form submitted');
        const dateValue = datepicker.value; // Get date from datepicker

        let isValid = true;
        if (!dateValue) {
            datepicker.classList.add("is-invalid");
            datepicker.classList.add("border-danger");
            isValid = false;
        } else {
            datepicker.classList.remove("is-invalid");
        }

        if (!selectedTime) {
            document.querySelector("#time .invalid-feedback").style.display = "block";
            isValid = false;
        } else {
            document.querySelector("#time .invalid-feedback").style.display = "none";
        }

        if (isValid) {
            localStorage.setItem('selectedDate', dateValue);
            localStorage.setItem('selectedTime', selectedTime);
            window.location.href = 'walk_out_choose_dog.html';
        }
    });
});



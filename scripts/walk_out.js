document.addEventListener('DOMContentLoaded', function () {
    flatpickr("#datepicker", {
        inline: true,
        dateFormat: "d.m.Y",
        firstDayOfWeek: 1,
        locale: "sk",
        minDate: new Date().fp_incr(1),
        defaultDate: localStorage.getItem('selectedDate') || null,
        onDayCreate: function(dObj, dStr, fp, dayElem) {
            const date = dayElem.dateObj;
            // Ak je deň dnešný, pridáme triedu
            if (date.toDateString() === new Date().toDateString()) {
                dayElem.classList.add("today-highlight");
            }
        }
    });
});

document.addEventListener('DOMContentLoaded', function () {
    let catalogSelectedDogId = localStorage.getItem('catalogSelectedDogId');
    if (catalogSelectedDogId) {
        let dogName = dogs.find(dog => dog.id === parseInt(catalogSelectedDogId)).name;
        document.getElementsByClassName('walk-text')[0].innerHTML = 'Tu si rezervujete prechádzku s Vami vybraným psíkom s menom: <strong>' + dogName + '</strong>. Prechádzka trvá maximálne 2 hodiny.';
        document.getElementsByClassName('checkbox-second-dog-from-catalog')[0].classList.remove('d-none');
    }
    const datepicker = document.querySelector('#datepicker');
    const timeButtons = document.querySelectorAll('#time button');
    const submitButton = document.querySelector('#submit');

    let selectedTime = null;
    let timeId = localStorage.getItem('timeId');
    if (timeId) {
        const selectedButton = document.getElementById(timeId);
        if (selectedButton) {
            selectedButton.classList.add('selected');
            selectedTime = selectedButton.innerText;
        }
    }

    timeButtons.forEach(button => {
        button.addEventListener('click', function () {
            document.querySelectorAll('#time button').forEach(btn => {
                btn.classList.remove('selected');
            });

            this.classList.add('selected');
            selectedTime = this.innerText;
            timeId = this.id;
        });
    });

    submitButton.addEventListener('click', function (event) {
        event.preventDefault();
        const dateValue = datepicker.value; // Get date from datepicker

        let isValid = true;
        if (!dateValue) {
            datepicker.classList.add("is-invalid");
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
            localStorage.setItem('timeId', timeId);
            localStorage.setItem('isInReservationProcess', true);

            let catalogSelectedDogId = localStorage.getItem('catalogSelectedDogId');
            if (catalogSelectedDogId) {
                localStorage.setItem('selectedDogId', catalogSelectedDogId);
                let checkSecondDog = document.getElementById('secondDogCheckbox');
                if (checkSecondDog.checked) {
                    window.location.href = 'walk_out_choose_second_dog.html';
                } else {
                    localStorage.setItem('selectedDogIds', JSON.stringify([parseInt(catalogSelectedDogId)]));
                    window.location.href = 'walk_out_user_info.html';
                }
            }
            else{
                window.location.href = 'walk_out_choose_dog.html';
            }
        } else {
            window.scrollTo({
                top: 0,
                behavior: 'smooth' // Use 'auto' for instant scrolling
            });
        }
    });
});



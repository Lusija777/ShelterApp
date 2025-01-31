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
        let firstDog = dogs.find(dog => dog.id === parseInt(catalogSelectedDogId))
        let dogName = firstDog.name;
        document.getElementsByClassName('walk-text')[0].innerHTML = 'Tu si rezervujete prechádzku s Vami vybraným psíkom s menom: <strong>' + dogName + '</strong>. Prechádzka trvá maximálne 2 hodiny.';

        document.getElementById('alert').innerHTML = `
            <div class="row mb-1 mt-2">
                <div class="col-12">
                    <div class="alert alert-warning text-center p-2" role="alert">
                        <strong>Upozornenie:</strong> Ak si budete chcieť vybrať dvoch psíkov, musia byť z rovnakého výbehu.
                    </div>
                </div>
            </div>`;

        let section = document.getElementById('secondDogCheckboxSection');
        section.classList.remove('d-none');
        section.classList.add('d-block');

        const count = dogs.filter(d => d.room === firstDog.room && d.id !== firstDog.id).length;
        const label = document.querySelector('label[for="secondDogCheckbox"]');
        label.innerHTML = '<strong>Chcete pridať druhého psíka?</strong><br>V ďalšom kroku budete mať na výber <strong>' + count + '</strong> psíkov.';

        const style = document.createElement("style");
        style.innerHTML = "#step-1::after { content: 'Výber psíka'; } #step-2::after { content: 'Dátum a čas'; }";
        document.head.appendChild(style);
        let step2 = document.getElementById('step-2');
        step2.classList.add('blue');
        document.querySelector(".progress-bar").style.width = "33%";

    }
    const datepicker = document.querySelector('#datepicker');
    const timeButtons = document.querySelectorAll('#time button');
    const submitButton = document.querySelector('#submitButton');

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
                const checkbox = document.getElementById("secondDogCheckbox");
                if (checkbox.checked) {
                    window.location.href = 'walk_out_choose_second_dog.html';
                }
                else{
                    localStorage.removeItem('selectedSecondDogId');
                    window.location.href = 'walk_out_user_info.html';
                }
            }
            else{
                window.location.href = 'walk_out_choose_first_dog.html';
            }
        } else {
            window.scrollTo({
                top: 0,
                behavior: 'smooth' // Use 'auto' for instant scrolling
            });
        }
    });
});

function evaluateSecondDogCheckbox() {
    const checkbox = document.getElementById("secondDogCheckbox");
    const submitButton = document.getElementById("submitButton");

    if (checkbox.checked) {
        submitButton.textContent = "Vybrať druhého psíka";
    } else {
        submitButton.textContent = "Pokračovať";
    }
}
document.addEventListener('DOMContentLoaded', () => {
    const dogInfo = document.getElementById('dogInfo');
    const selectedDogIds = JSON.parse(localStorage.getItem('selectedDogIds'));
    const date = localStorage.getItem('selectedDate');
    const time = localStorage.getItem('selectedTime');

// Najdi psov v DB
    const selectedDogs = dogs.filter(d => selectedDogIds.includes(d.id));
    let dog = selectedDogs[0];
    dogInfo.innerHTML = `
        <div class="mb-3 py-1 pe-2 ps-1">
            <div class="row g-0">
                <div class="col-6 d-flex">
                    <img src="${dog.photo}" class="dog-photo" alt="${dog.name}">
                </div>
                <div class="col-6 d-flex justify-content-center align-items-center">
                    <div class="dog-info">
                        <strong>Dátum: </strong>${date}<br>
                        <strong>Čas: </strong>${time}<br>
                        <strong>Psík: </strong>${dog.name}<br>
                    </div>
                </div>
            </div>
        </div>`;

    if (selectedDogs.length === 2) {
        let secondDog = selectedDogs[1];
        dogInfo.innerHTML = `<div class="mb-3 py-1 pe-2 ps-1">
            <div class="row g-0">
                <div class="col-6 d-flex justify-content-center">
                    <img src="${dog.photo}" class="dog-photo" alt="${dog.name}">
                </div>
                <div class="col-6 d-flex justify-content-center">
                    <img src="${secondDog.photo}" class="dog-photo" alt="${secondDog.name}">
                </div>
                <div class="col-6 d-flex justify-content-center">
                    <strong>${dog.name}</strong>
                </div>
                <div class="col-6 d-flex justify-content-center">
                    <strong>${secondDog.name}</strong>
                </div>
            </div>
            <div class="mt-3 col-6 d-flex justify-content-center align-items-center">
                <div class="dog-info">
                    <strong>Dátum: </strong>${date}<br>
                    <strong>Čas: </strong>${time}<br>
                </div>
            </div>
        </div>`;
    }


    const userData = JSON.parse(localStorage.getItem('userData'));
    if (userData) {
        // Zobrazenie údajov na stránke
        document.getElementById('displayWalkId').textContent = userData.idNumber || 'Venčiarsky preukaz Vám bude vydaný na mieste.';
        document.getElementById('displayName').textContent = userData.name + ' ' + userData.surname || 'Nebol zadaný';
        document.getElementById('displayPhone').textContent = userData.phone || 'Nebol zadaný';
        document.getElementById('displayEmail').textContent = userData.email || 'Nebol zadaný';
    } else {
        window.alert('Údaje neboli nájdené.');
    }
});

window.addEventListener('pageshow', () => {
    const isInReservationProcess = localStorage.getItem('isInReservationProcess') === 'true';

    if (!isInReservationProcess) {
        redirectToPage('index');
    }
});

document.getElementById('backButton').addEventListener('click', function() {
    history.back();
});

document.getElementById('submitButton').addEventListener('click', function() {
    const gdprCheckbox = document.getElementById("gdpr-checkbox");
    const errorMessage = gdprCheckbox.parentElement.querySelector('.invalid-feedback');
    errorMessage.classList.add('d-none');
    errorMessage.classList.remove('d-block');
    gdprCheckbox.classList.remove("is-invalid");

    if (!gdprCheckbox.checked) {
        gdprCheckbox.classList.add("is-invalid");
        errorMessage.classList.remove('d-none');
        errorMessage.classList.add('d-block');
    }
    else {
        localStorage.clear();
        window.location.href = 'walk_out_reserved.html';
    }
});

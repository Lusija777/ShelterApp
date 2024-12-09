document.addEventListener('DOMContentLoaded', () => {
    const dogInfo = document.getElementById('dogInfo');
    const dogId = localStorage.getItem('selectedDogId');
    const dog = dogs.find(d => d.id === Number(dogId));

    const date = localStorage.getItem('selectedDate');
    const time = localStorage.getItem('selectedTime');

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
        </div>
        `;


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
    gdprCheckbox.classList.remove("is-invalid");

    if (!gdprCheckbox.checked) {
        gdprCheckbox.classList.add("is-invalid");
    }
    else {
        localStorage.clear();
        window.location.href = 'walk_out_reserved.html';
    }
});

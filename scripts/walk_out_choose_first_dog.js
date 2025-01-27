document.addEventListener('DOMContentLoaded', function() {
    renderDogs();
    let selectedDogId = localStorage.getItem('selectedDogId');
    if (selectedDogId) {
        const button = document.querySelector(`.dog-info-select[data-dog-id="${selectedDogId}"]`);
        if (button) {
            button.click();
        }
    }
});
function renderDogs(page = 1) {
    const dogSelectionGrid = document.getElementById('dogSelectionGrid');

    dogSelectionGrid.innerHTML = '';
    const start = (page - 1) * limitDogCount;
    const end = page * limitDogCount;
    let dogsToDisplay = filteredDogs.slice(start, end);


    dogsToDisplay.forEach(dog => {
        const dogCard = document.createElement('div');
        dogCard.classList.add('col-6', 'col-md-3');
        dogCard.innerHTML = `
            <div class="dog-card card mb-3 py-1 pe-2 ps-1 border rounded-5 mt-1 border-secondary" data-id="${dog.id}">
                <div class="card-body p-0">
                    <img src="${dog.photo}" class="dog-photo card-img-top" alt="${dog.name}">
                    <div class="dog-info text-center">
                        <strong>${dog.name}</strong><br>
                        <small>veľkosť: ${dog.size}<br>pohlavie: ${dog.sex}</small><br>
                        <small>vek: ${dog.age}</small>
                    </div>
                </div>
                <div class="card-footer bg-transparent border-0 text-center d-flex justify-content-around align-items-center p-2">
                    <button class="btn btn-secondary btn-sm dog-info-btn" data-dog-id="${dog.id}" >Info</button>
                    <button class="btn btn-primary btn-sm dog-info-select" data-dog-id="${dog.id}" >Vybrať</button>
                </div>
            </div>
        `;
        dogSelectionGrid.appendChild(dogCard);
    });

    connectDetailButton();
    connectSelectButton();
    showLoadMoreButton();
    hideLoadMoreButton();
    showSelectedDog();
}

function selectDog(dogId) {
    const label = document.querySelector('label[for="secondDogCheckbox"]');
    if (selectedDogId === dogId) {
        selectedDogId = null;
        document.querySelectorAll('.dog-card').forEach(card => {
            card.classList.remove('bg-primary', 'bg-opacity-10', 'border-primary', 'border-3');
            card.classList.add('border-secondary');

            label.innerHTML = '<strong>Chcete pridať druhého psíka?</strong>';
        });
    } else {
        selectedDogId = dogId;
        document.querySelectorAll('.dog-card').forEach(card => {
            card.classList.remove('bg-primary', 'bg-opacity-10', 'border-primary', 'border-3');
            card.classList.add('border-secondary');

            label.innerHTML = '<strong>Chcete pridať druhého psíka?</strong>';
        });
        const selectedCard = document.querySelector(`[data-id="${dogId}"]`);
        if (selectedCard) {
            selectedCard.classList.remove('border-secondary');
            selectedCard.classList.add('bg-primary', 'bg-opacity-10', 'border-primary', 'border-3');

            firstDog = dogs.find(d => d.id === Number(dogId));
            const count = dogs.filter(d => d.room === firstDog.room && d.id !== firstDog.id).length;
            label.innerHTML = '<strong>Chcete pridať druhého psíka?</strong><br>Budete mať na výber <strong>' + count + '</strong> psíkov';
        }
    }
}

function evaluateSecondDogCheckbox() {
    const checkbox = document.getElementById("secondDogCheckbox");
    const submitButton = document.getElementById("submitButton");

    if (checkbox.checked) {
        submitButton.textContent = "Vybrať druhého psíka";
    } else {
        submitButton.textContent = "Potvrďiť výber";
    }
}

document.getElementById('submitButton').addEventListener('click', function() {
    if (selectedDogId) {
        document.querySelector(".invalid-feedback").style.display = "none";
        localStorage.setItem('selectedDogId', selectedDogId);

        const checkbox = document.getElementById("secondDogCheckbox");
        if (checkbox.checked) {
            window.location.href = 'walk_out_choose_second_dog.html';
        }
        else{
            localStorage.removeItem('selectedSecondDogId');
            window.location.href = 'walk_out_user_info.html';
        }
    }
    else {
        document.querySelector(".invalid-feedback").style.display = "block";
        window.scrollTo({
            top: 0,
            behavior: 'smooth' // Use 'auto' for instant scrolling
        });
    }
});

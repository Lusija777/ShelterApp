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
    const start = (page - 1) * dogsPerPage;
    const end = page * dogsPerPage;
    const dogsToDisplay = filteredDogs.slice(start, end);

    const dogSelectionGrid = document.getElementById('dogSelectionGrid');
    dogSelectionGrid.innerHTML = '';

    dogsToDisplay.forEach(dog => {
        const dogCard = document.createElement('div');
        dogCard.classList.add('col-6', 'col-md-3', 'dog-card');
        dogCard.setAttribute('data-id', dog.id); // Nastav atribút na identifikáciu karty
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
                <div class="card-footer bg-transparent border-0 text-center">
                    <button class="btn btn-secondary btn-sm dog-info-btn" data-dog-id="${dog.id}" >Info</button>
                    <button class="btn btn-secondary btn-sm dog-info-select" data-dog-id="${dog.id}" >Vybrať</button>
                </div>
            </div>
        `;
        dogSelectionGrid.appendChild(dogCard);
    });

    renderPagination(filteredDogs.length, page);
    connectDetailButton();
    connectSelectButton();
}

function selectDog(dogId) {
    const label = document.querySelector('label[for="secondDogCheckbox"]');
    if (selectedDogId === dogId) {
        selectedDogId = null;
        document.querySelectorAll('.dog-card').forEach(card => {
            card.classList.remove('bg-primary', 'bg-opacity-10', 'border-primary', 'border-3');
            card.classList.add('border-secondary');

            label.textContent = 'Pridať druhého psíka.';
        });
    } else {
        selectedDogId = dogId;
        document.querySelectorAll('.dog-card').forEach(card => {
            card.classList.remove('bg-primary', 'bg-opacity-10', 'border-primary', 'border-3');
            card.classList.add('border-secondary');

            label.textContent = 'Pridať druhého psíka.';
        });
        const selectedCard = document.querySelector(`[data-id="${dogId}"]`);
        if (selectedCard) {
            selectedCard.classList.remove('border-secondary');
            selectedCard.classList.add('bg-primary', 'bg-opacity-10', 'border-primary', 'border-3');

            firstDog = dogs.find(d => d.id === Number(dogId));
            const count = dogs.filter(d => d.room === firstDog.room && d.id !== firstDog.id).length;
            label.textContent = 'Pridať druhého psíka. Budete mať na výber ' + count + ' psíkov';
        }
    }
}

function evaluateSecondDogCheckbox() {
    const checkbox = document.getElementById("secondDogCheckbox");
    const submitButton = document.getElementById("submitButton");

    if (checkbox.checked) {
        submitButton.textContent = "Vyber druhého psíka";
    } else {
        submitButton.textContent = "Potvrď výber";
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
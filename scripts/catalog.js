let selectedAnimalId = null;
let animalsPerPage = 4; // Number of animals to show per page
let currentPage = 1;

let pets = dogs;
let animalType = 'dog';
const applyFilterButton = document.getElementById("applyFilter");

const btnradiodogs = document.getElementById('btnradio1');
const btnradiocats = document.getElementById('btnradio2');

// Add event listeners to the radio buttons
btnradiodogs.addEventListener('change', () => {
    if (btnradiodogs.checked) {
        pets = dogs;
        animalType = 'dog';
        updateFilterOptions(animalType);
        renderAnimals(1);
    }
});

btnradiocats.addEventListener('change', () => {
    if (btnradiocats.checked) {
        pets = cats;
        animalType = 'cat';
        updateFilterOptions(animalType);
        renderAnimals(1);
    }
});

function updateFilterOptions(animalType) {
    let checksexmale = document.getElementsByClassName('checksexmale')[0];
    let checksexfemale = document.getElementsByClassName('checksexfemale')[0];

    checksexmale.innerHTML = '';
    checksexfemale.innerHTML = '';
    let roomFilterContainer = document.getElementById("room");
    roomFilterContainer.innerHTML = '';

    // Update options based on animal type
    if (animalType === 'dog') {
        checksexmale.innerHTML += '<input class="form-check-input" type="checkbox" id="pes" value="pes">\n' +
            '                                <label for="pes" class="form-check-label">Pes</label>';
        checksexfemale.innerHTML += '<input class="form-check-input" type="checkbox" id="fenka" value="fenka">\n' +
            '                                <label for="fenka" class="form-check-label">Fenka</label>';

        const roomOptions = ["1", "2", "3", "4", "5"];

        roomOptions.forEach(room => {
            const checkboxWrapper = document.createElement("div");
            checkboxWrapper.classList.add("form-check");  // Bootstrap class for checkboxes

            const checkbox = document.createElement("input");
            checkbox.setAttribute("type", "checkbox");
            checkbox.setAttribute("id", `room-${room}`);
            checkbox.setAttribute("value", room);
            checkbox.classList.add("form-check-input");

            const label = document.createElement("label");
            label.setAttribute("for", `room-${room}`);
            label.classList.add("form-check-label");
            label.textContent = `Výbeh č. ${room}`;

            checkboxWrapper.appendChild(checkbox);
            checkboxWrapper.appendChild(label);

            roomFilterContainer.appendChild(checkboxWrapper);
        });

    } else if (animalType === 'cat') {
        checksexmale.innerHTML += '<input class="form-check-input" type="checkbox" id="kocúr" value="kocúr">\n' +
            '                                <label for="kocúr" class="form-check-label">Kocúr</label>';
        checksexfemale.innerHTML += '<input class="form-check-input" type="checkbox" id="mačka" value="mačka">\n' +
            '                                <label for="mačka" class="form-check-label">Mačka</label>';
    }
    animalsPerPage = 4;
}
applyFilterButton.addEventListener("click", () => {
    let sexes = document.querySelectorAll(('#sex input'));
    let checkedSexes = Array.from(sexes).filter(checkbox => checkbox.checked).map(checkbox => checkbox.value);

    let sizes = document.querySelectorAll(('#size input'));
    let checkedSizes = Array.from(sizes).filter(checkbox => checkbox.checked).map(checkbox => checkbox.value);

    let rooms = document.querySelectorAll(('#room input'));
    let selectedRooms = Array.from(rooms).filter(checkbox => checkbox.checked).map(checkbox => checkbox.value);

    let toFilterPets = animalType === 'dog' ? dogs : cats;
    pets = toFilterPets.filter(pet => {
        let matchesSex = checkedSexes.length === 0 || checkedSexes.includes(pet.sex);
        let matchesSize = checkedSizes.length === 0 || checkedSizes.includes(pet.size);
        let matchesRoom = selectedRooms.length === 0 || selectedRooms.includes(pet.room);

        return matchesSex && matchesSize && matchesRoom;
    });
    animalsPerPage = 4;

    if (pets.length === 0){
        const animalSelectionGrid = document.getElementById('animalSelectionGrid');
        animalSelectionGrid.textContent = 'Momentálne v útulku nie sú k dispozícii zvieratká podľa zvoleného filtra.';
        animalSelectionGrid.classList.add('justify-content-center', 'align-items-center', 'text-center','my-5', 'mx-2');
        let loadButton = document.getElementById('loadMoreButton');
        loadButton.classList.add('d-none');
    }
    else{
        // Render Filtered Dogs
        renderAnimals(1);
    }
    const filterModal = bootstrap.Modal.getInstance(document.getElementById("filterModal"));
    filterModal.hide();
});

function renderAnimals(page = 1) {
    const animals = pets;
    const start = (page - 1) * animalsPerPage;
    const end = page * animalsPerPage;
    const animalsToDisplay = animals.slice(start, end);

    const animalSelectionGrid = document.getElementById('animalSelectionGrid');
    animalSelectionGrid.innerHTML = '';

    animalsToDisplay.forEach(animal => {
        const animalCard = document.createElement('div');
        animalCard.classList.add('col-6', 'col-md-3', 'animal-card');
        const roomInfo = animal.room ? `<div class="text-primary">výbeh č. ${animal.room}</div>` : '';

        animalCard.innerHTML = `
            <div class="card animal-card mb-3 py-1 pe-2 ps-1 border rounded-5 mt-1 border-secondary" data-id="${animal.id}" onclick="showAnimalDetails(${animal.id}, '${animalType}')">
                <img src="${animal.photo}" class="animal-photo card-img-top" alt="${animal.name}">
                <div class="animal-info text-center" style="overflow: hidden; padding: 10px;">
                    <strong class="fs-5">${animal.name}</strong><br>
                    ${roomInfo}
                    <small>veľkosť: ${animal.size}<br> pohlavie: ${animal.sex}</small><br>
                    <small>vek: ${animal.age}</small><br>
                    <button class="btn btn-primary btn-sm mt-2" onclick="showAnimalDetails(${animal.id}, '${animalType}')">Detail</button>
                </div>
            </div>
        `;
        animalSelectionGrid.appendChild(animalCard);
    });

    // Aktualizujeme stránkovanie
    //renderPagination(animals.length, page);
}



function showAnimalDetails(animalId, animalType) {
    const animal = animalType === 'dog' ? dogs.find(dog => dog.id === animalId) : cats.find(cat => cat.id === animalId);
    localStorage.setItem('selectedAnimal', JSON.stringify(animal));
    window.location.href = 'detail.html';
}

// Načítanie stránok pre psy a mačky na prvej stránke
updateFilterOptions(animalType);
renderAnimals(1);

document.getElementById('loadMoreButton').addEventListener('click', () => {
    animalsPerPage = animalsPerPage+4;
    renderAnimals(currentPage); // Re-render the grid with the updated number of items
    if (animalsPerPage >= pets.length) {
        document.getElementById('loadMoreButton').style.display = 'none';
    }
});



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

    // Update options based on animal type
    if (animalType === 'dog') {
        checksexmale.innerHTML += '<input class="form-check-input" type="checkbox" id="pes" value="pes">\n' +
            '                                <label for="pes" class="form-check-label">Pes</label>';
        checksexfemale.innerHTML += '<input class="form-check-input" type="checkbox" id="fenka" value="fenka">\n' +
            '                                <label for="fenka" class="form-check-label">Fenka</label>';

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

    // Filter Logic
    let toFilterPets = animalType === 'dog' ? dogs : cats;
    pets = toFilterPets.filter(pet => {
        if (checkedSizes.length === 0 && checkedSexes.length === 0) return true;
        if (checkedSizes.length === 0) return checkedSexes.includes(pet.sex);
        if (checkedSexes.length === 0) return checkedSizes.includes(pet.size);
        animalsPerPage = 4;
        return checkedSexes.includes(pet.sex) && checkedSizes.includes(pet.size);

    });

    // Render Filtered Dogs
    renderAnimals(1);
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
        animalCard.innerHTML = `
            <div class="card animal-card mb-3 py-1 pe-2 ps-1" data-id="${animal.id}" onclick="showAnimalDetails(${animal.id}, '${animalType}')">
                <img src="${animal.photo}" class="animal-photo card-img-top" alt="${animal.name}">
                <div class="animal-info text-center border rounded-5 mt-1 border-secondary" style="overflow: hidden; padding: 10px;">
                    <strong>${animal.name}</strong><br>
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



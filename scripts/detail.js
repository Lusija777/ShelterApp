let selectedAnimalId = null;
const animalsPerPage = 4; // Number of animals to show per page
let currentPage = 1;

let filteredDogs = dogs;
let filteredCats = cats;
const applyFilterButton = document.getElementById("applyFilter");
const animalTypeSelector = document.getElementById("animalTypeSelector"); // Select dogs or cats

document.addEventListener('DOMContentLoaded', function () {
    let selectedAnimalId = localStorage.getItem('selectedAnimalId');
    console.log(selectedAnimalId);
    if (selectedAnimalId) {
        selectAnimal(selectedAnimalId);
    }
});

applyFilterButton.addEventListener("click", () => {
    const sex = document.getElementById("sex").value;
    const size = document.getElementById("size").value;
    const animalType = animalTypeSelector.value;

    if (animalType === 'dog') {
        // Filter Dogs
        filteredDogs = dogs.filter(dog => {
            return (!sex || dog.sex === sex) && (!size || dog.size === size);
        });
    } else if (animalType === 'cat') {
        // Filter Cats
        filteredCats = cats.filter(cat => {
            return (!sex || cat.sex === sex) && (!size || cat.size === size);
        });
    }

    // Render Filtered Animals
    renderAnimals(1, animalType);
    const filterModal = bootstrap.Modal.getInstance(document.getElementById("filterModal"));
    filterModal.hide();
});

function renderAnimals(page = 1, animalType = 'dog') {
    const animals = animalType === 'dog' ? filteredDogs : filteredCats;
    const start = (page - 1) * animalsPerPage;
    const end = page * animalsPerPage;
    const animalsToDisplay = animals.slice(start, end);

    const animalSelectionGrid = document.getElementById('animalSelectionGrid');
    animalSelectionGrid.innerHTML = '';

    animalsToDisplay.forEach(animal => {
        const animalCard = document.createElement('div');
        animalCard.classList.add('col-6', 'animal-card');
        animalCard.innerHTML = `
            <div class="card animal-card mb-3 py-1 pe-2 ps-1" data-id="${animal.id}" onclick="selectAnimal(${animal.id}, '${animalType}')">
                <img src="${animal.photo}" class="animal-photo card-img-top" alt="${animal.name}">
                <div class="animal-info text-center border rounded-pill mt-1 border-secondary">
                    <strong>${animal.name}</strong><br>
                    <small>veľkosť: ${animal.size}, pohlavie: ${animal.sex}</small><br>
                    <small>vek: ${animal.age}</small><br>
                    <button class="btn btn-primary btn-sm detail-button" onclick="showAnimalDetails(${animal.id}, '${animalType}')">Detail</button>
                </div>
            </div>
        `;
        animalSelectionGrid.appendChild(animalCard);
    });

    renderPagination(animals.length, page, animalType);
}

function renderPagination(totalAnimals, currentPage, animalType) {
    const pagination = document.getElementById('pagination');
    pagination.innerHTML = '';

    const totalPages = Math.ceil(totalAnimals / animalsPerPage);

    // Validate currentPage to ensure it is within bounds
    if (currentPage < 1) currentPage = 1;
    if (currentPage > totalPages) currentPage = totalPages;

    // Create Previous Button
    const prevItem = document.createElement('li');
    prevItem.classList.add('page-item');
    if (currentPage === 1) {
        prevItem.classList.add('disabled'); // Disable button on first page
    }
    prevItem.innerHTML = `
        <a class="page-link" href="#" onclick="goToPage(${currentPage - 1}, '${animalType}')" aria-label="Previous">
            <span aria-hidden="true">&laquo;</span>
        </a>
    `;
    pagination.appendChild(prevItem);

    // Create Page Numbers
    for (let i = 1; i <= totalPages; i++) {
        const pageItem = document.createElement('li');
        pageItem.classList.add('page-item');
        if (currentPage === i) {
            pageItem.classList.add('active'); // Highlight current page
        }
        pageItem.innerHTML = `<a class="page-link" href="#" onclick="goToPage(${i}, '${animalType}')">${i}</a>`;
        pagination.appendChild(pageItem);
    }

    // Create Next Button
    const nextItem = document.createElement('li');
    nextItem.classList.add('page-item');
    if (currentPage === totalPages) {
        nextItem.classList.add('disabled'); // Disable button on last page
    }
    nextItem.innerHTML = `
        <a class="page-link" href="#" onclick="goToPage(${currentPage + 1}, '${animalType}')" aria-label="Next">
            <span aria-hidden="true">&raquo;</span>
        </a>
    `;
    pagination.appendChild(nextItem);
}

function selectAnimal(animalId, animalType) {
    if (selectedAnimalId === animalId) {
        selectedAnimalId = null;
        document.querySelectorAll('.animal-card').forEach(card => {
            card.classList.remove('border', 'border-3', 'rounded', 'bg-primary', 'bg-opacity-10', 'border-primary');
        });
    } else {
        selectedAnimalId = animalId;
        document.querySelectorAll('.animal-card').forEach(card => {
            card.classList.remove('border', 'border-3', 'rounded', 'bg-primary', 'bg-opacity-10', 'border-primary');
        });
        const selectedCard = document.querySelector(`[data-id="${animalId}"]`);
        if (selectedCard) {
            selectedCard.classList.add('border', 'border-3', 'rounded', 'bg-primary', 'bg-opacity-10', 'border-primary');
        }
    }
}

function goToPage(page, animalType) {
    currentPage = page;
    renderAnimals(page, animalType);
}

function showAnimalDetails(animalId, animalType) {
    // Získať zviera podľa typu (pes alebo mačka)
    const animal = animalType === 'dog' ? dogs.find(dog => dog.id === animalId) : cats.find(cat => cat.id === animalId);

    // Uložiť údaje o zvierati do localStorage
    localStorage.setItem('selectedAnimal', JSON.stringify(animal));

    // Presmerovať na stránku detailu
    window.location.href = 'detail.html';
}

// Initialize rendering
animalTypeSelector.addEventListener('change', function () {
    const selectedType = this.value;
    renderAnimals(1, selectedType);
});

renderAnimals(1, 'dog');

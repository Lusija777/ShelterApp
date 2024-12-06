let selectedAnimalId = null;
const animalsPerPage = 4; // Number of animals to show per page
let currentDogPage = 1;
let currentCatPage = 1;

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
        filteredDogs = dogs.filter(dog => {
            return (!sex || dog.sex === sex) && (!size || dog.size === size);
        });
        currentDogPage = 1; // Reset stránkovania
        renderAnimals(currentDogPage, 'dog');
        renderPagination(filteredDogs.length, currentDogPage);
    } else if (animalType === 'cat') {
        filteredCats = cats.filter(cat => {
            return (!sex || cat.sex === sex) && (!size || cat.size === size);
        });
        currentCatPage = 1; // Reset stránkovania
        renderAnimals(currentCatPage, 'cat');
        renderPagination(filteredCats.length, currentCatPage);
    }

    // Skryjeme modálne okno
    const filterModal = bootstrap.Modal.getInstance(document.getElementById("filterModal"));
    filterModal.hide();
});


function selectAnimalType(animalType) {
    currentAnimalType = animalType;

    if (animalType === 'dog') {
        document.getElementById('dogButton').classList.add('active');
        document.getElementById('catButton').classList.remove('active');
    } else if (animalType === 'cat') {
        document.getElementById('catButton').classList.add('active');
        document.getElementById('dogButton').classList.remove('active');
    }

    renderAnimals(1, currentAnimalType);
}

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
                    <button class="btn btn-primary btn-sm mt-2" onclick="showAnimalDetails(${animal.id}, '${animalType}')">Detail</button>
                </div>
            </div>
        `;
        animalSelectionGrid.appendChild(animalCard);
    });

    // Aktualizujeme stránkovanie
    renderPagination(animals.length, page);
}


function renderPagination(totalAnimals, currentPage) {
    const pagination = document.getElementById('pagination');
    pagination.innerHTML = '';

    const totalPages = Math.ceil(totalAnimals / animalsPerPage);

    // Uistíme sa, že aktuálna stránka je v platných medziach
    if (currentPage < 1) currentPage = 1;
    if (currentPage > totalPages) currentPage = totalPages;

    // Vytvoríme tlačidlo na predchádzajúcu stránku
    const prevItem = document.createElement('li');
    prevItem.classList.add('page-item');
    if (currentPage === 1) {
        prevItem.classList.add('disabled'); // Zakážeme tlačidlo na prvej stránke
    }
    prevItem.innerHTML = `
        <a class="page-link" href="#" onclick="goToPage(${currentPage - 1})" aria-label="Previous">
            <span aria-hidden="true">&laquo;</span>
        </a>
    `;
    pagination.appendChild(prevItem);

    // Vytvoríme číslovanie strán
    for (let i = 1; i <= totalPages; i++) {
        const pageItem = document.createElement('li');
        pageItem.classList.add('page-item');
        if (currentPage === i) {
            pageItem.classList.add('active'); // Označíme aktívnu stránku
        }
        pageItem.innerHTML = `<a class="page-link" href="#" onclick="goToPage(${i})">${i}</a>`;
        pagination.appendChild(pageItem);
    }

    // Vytvoríme tlačidlo na ďalšiu stránku
    const nextItem = document.createElement('li');
    nextItem.classList.add('page-item');
    if (currentPage === totalPages) {
        nextItem.classList.add('disabled'); // Zakážeme tlačidlo na poslednej stránke
    }
    nextItem.innerHTML = `
        <a class="page-link" href="#" onclick="goToPage(${currentPage + 1})" aria-label="Next">
            <span aria-hidden="true">&raquo;</span>
        </a>
    `;
    pagination.appendChild(nextItem);
}

function goToPage(page) {
    const animalType = animalTypeSelector.value;
    if (animalType === 'dog') {
        currentDogPage = page;
        renderAnimals(currentDogPage, 'dog');
        renderPagination(filteredDogs.length, currentDogPage);
    } else if (animalType === 'cat') {
        currentCatPage = page;
        renderAnimals(currentCatPage, 'cat');
        renderPagination(filteredCats.length, currentCatPage);
    }
}



function showAnimalDetails(animalId, animalType) {
    const animal = animalType === 'dog' ? dogs.find(dog => dog.id === animalId) : cats.find(cat => cat.id === animalId);
    localStorage.setItem('selectedAnimal', JSON.stringify(animal));
    window.location.href = 'detail.html';
}

// Initialize rendering
animalTypeSelector.addEventListener('change', function () {
    const selectedType = this.value;
    renderAnimals(1, selectedType);
});

// Načítanie stránok pre psy a mačky na prvej stránke
renderAnimals(1, 'dog');


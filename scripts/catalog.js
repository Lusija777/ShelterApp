let selectedAnimalId = null;
const animalsPerPage = 4; // Number of animals to show per page
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
    const sexSelect = document.getElementById('sex');

    sexSelect.innerHTML = '';
    sexSelect.innerHTML = '<option value="">Všetko</option>';

    // Update options based on animal type
    if (animalType === 'dog') {
        sexSelect.innerHTML += '<option value="pes">Pes</option>';
        sexSelect.innerHTML += '<option value="fenka">Fenka</option>';

    } else if (animalType === 'cat') {
        sexSelect.innerHTML += '<option value="kocúr">Kocúr</option>';
        sexSelect.innerHTML += '<option value="mačka">Mačka</option>';
    }
}
applyFilterButton.addEventListener("click", () => {
    const sex = document.getElementById("sex").value;
    const size = document.getElementById("size").value;

    pets = pets.filter(pet => {
        return (!sex || pet.sex === sex) && (!size || pet.size === size);
    });
    renderAnimals(1);

    // Skryjeme modálne okno
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
        animalCard.classList.add('col-6', 'animal-card');
        animalCard.innerHTML = `
            <div class="card animal-card mb-3 py-1 pe-2 ps-1" data-id="${animal.id}" onclick="showAnimalDetails(${animal.id}, '${animalType}')">
                <img src="${animal.photo}" class="animal-photo card-img-top" alt="${animal.name}">
                <div class="animal-info text-center border rounded-5 mt-1 border-secondary" style="overflow: hidden; padding: 10px;">
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
    currentPage = page;
    renderAnimals(page);
}


function showAnimalDetails(animalId, animalType) {
    const animal = animalType === 'dog' ? dogs.find(dog => dog.id === animalId) : cats.find(cat => cat.id === animalId);
    localStorage.setItem('selectedAnimal', JSON.stringify(animal));
    window.location.href = 'detail.html';
}

// Načítanie stránok pre psy a mačky na prvej stránke
updateFilterOptions(animalType);
renderAnimals(1);


let selectedDogId = null;
const dogsPerPage = 4; // Number of dogs to show per page
let currentPage = 1;

var filteredDogs = dogs;
const applyFilterButton = document.getElementById("applyFilter");

document.addEventListener('DOMContentLoaded', function() {
    renderDogs();
    let selectedDogId = localStorage.getItem('selectedDogId');
    if (selectedDogId) {
        selectDog(selectedDogId);
    }
});

applyFilterButton.addEventListener("click", () => {
    let sexes = document.querySelectorAll(('#sex input'));
    let checkedSexes = Array.from(sexes).filter(checkbox => checkbox.checked).map(checkbox => checkbox.value);

    let sizes = document.querySelectorAll(('#size input'));
    let checkedSizes = Array.from(sizes).filter(checkbox => checkbox.checked).map(checkbox => checkbox.value);

    // Filter Logic
    filteredDogs = dogs.filter(dog => {
        if (checkedSizes.length === 0 && checkedSexes.length === 0) return true;
        if (checkedSizes.length === 0) return checkedSexes.includes(dog.sex);
        if (checkedSexes.length === 0) return checkedSizes.includes(dog.size);
        return checkedSexes.includes(dog.sex) && checkedSizes.includes(dog.size);
    });

    // Render Filtered Dogs
    renderDogs(1);
    const filterModal = bootstrap.Modal.getInstance(document.getElementById("filterModal"));
    filterModal.hide();
});

function connectDetailButton() {
    // event listener to show modal with dog details when button is clicked
    document.querySelectorAll('.dog-info-btn').forEach(button => {
        button.addEventListener('click', function () {
            const dogId = parseInt(this.getAttribute('data-dog-id'));
            const dog = dogs.find(dog => dog.id === dogId);

            document.getElementById('animalImage').src = dog.photo;
            document.getElementById('animalName').textContent = dog.name;
            document.getElementById('animalSize').textContent = dog.size;
            document.getElementById('animalSex').textContent = dog.sex;
            document.getElementById('animalAge').textContent = dog.age;
            document.getElementById('animalShelterDuration').textContent = dog.shelterDuration || 'Neznáme';
            document.getElementById('animalDescription').textContent = dog.description || 'Bez popisu';
            document.getElementById('animalShelterInfo').textContent = dog.info || 'Neznáme';

            const detailModal = new bootstrap.Modal(document.getElementById('detailModal'));
            detailModal.show();
        });
    });
}

function connectSelectButton() {
    document.querySelectorAll('.dog-info-select').forEach(button => {
        button.addEventListener('click', function() {
            const dogId = this.getAttribute('data-dog-id'); // Získaj ID psa z tlačidla
            selectDog(dogId); // Zavolaj funkciu selectDog
            document.querySelectorAll('.dog-info-select').forEach(otherButton => {
                otherButton.textContent = 'Vybrať';
            });
            // Zmen text buttonu
            if (selectedDogId === dogId) {
                button.textContent = 'Odobrať';
                button.classList.add('btn-danger');
            } else {
                button.textContent = 'Vybrať';
                button.classList.remove('btn-danger');
            }
        });
    });
}


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
                <div class="card-body p-0" onclick="selectDog(${dog.id})">
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


function renderPagination(totalDogs, currentPage) {
    const pagination = document.getElementById('pagination');
    pagination.innerHTML = '';

    const totalPages = Math.ceil(totalDogs / dogsPerPage);

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
        <a class="page-link" href="#" onclick="goToPage(${currentPage - 1})" aria-label="Previous">
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
        pageItem.innerHTML = `<a class="page-link" href="#" onclick="goToPage(${i})">${i}</a>`;
        pagination.appendChild(pageItem);
    }

    // Create Next Button
    const nextItem = document.createElement('li');
    nextItem.classList.add('page-item');
    if (currentPage === totalPages) {
        nextItem.classList.add('disabled'); // Disable button on last page
    }
    nextItem.innerHTML = `
        <a class="page-link" href="#" onclick="goToPage(${currentPage + 1})" aria-label="Next">
            <span aria-hidden="true">&raquo;</span>
        </a>
    `;
    pagination.appendChild(nextItem);
}

function selectDog(dogId) {
    if (selectedDogId === dogId) {
        selectedDogId = null;
        document.querySelectorAll('.dog-card').forEach(card => {
            card.classList.remove('bg-primary', 'bg-opacity-10', 'border-primary', 'border-3');
            card.classList.add('border-secondary');
        });
    } else {
        selectedDogId = dogId;
        document.querySelectorAll('.dog-card').forEach(card => {
            card.classList.remove('bg-primary', 'bg-opacity-10', 'border-primary', 'border-3');
            card.classList.add('border-secondary');
        });
        const selectedCard = document.querySelector(`[data-id="${dogId}"]`);
        if (selectedCard) {
            selectedCard.classList.remove('border-secondary');
            selectedCard.classList.add('bg-primary', 'bg-opacity-10', 'border-primary', 'border-3');
        }
    }
}

document.getElementById('dogFilter').addEventListener('input', function() {
    renderDogs(currentPage, this.value);
});
document.getElementById('submitButton').addEventListener('click', function() {
    if (selectedDogId) {
        document.querySelector(".invalid-feedback").style.display = "none";
        localStorage.setItem('selectedDogId', selectedDogId);
        window.location.href = 'walk_out_user_info.html';
    }
    else {
        document.querySelector(".invalid-feedback").style.display = "block";
        window.scrollTo({
            top: 0,
            behavior: 'smooth' // Use 'auto' for instant scrolling
        });
    }
});

document.getElementById('backButton').addEventListener('click', function() {
    history.back();
});

function goToPage(page) {
    currentPage = page;
    renderDogs(page);
}


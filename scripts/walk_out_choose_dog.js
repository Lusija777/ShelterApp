let selectedDogId = null;
const dogsPerPage = 4; // Number of dogs to show per page
let currentPage = 1;

var filteredDogs = dogs;
const applyFilterButton = document.getElementById("applyFilter");

document.addEventListener('DOMContentLoaded', function() {
    let selectedDogId = localStorage.getItem('selectedDogId');
    console.log(selectedDogId);
    if (selectedDogId) {
        selectDog(selectedDogId);
    }
});

applyFilterButton.addEventListener("click", () => {
    const sex = document.getElementById("sex").value;
    const size = document.getElementById("size").value;

    // Filter Logic
    filteredDogs = dogs.filter(dog => {
        return (!sex || dog.sex === sex) && (!size || dog.size === size);
    });

    // Render Filtered Dogs
    renderDogs(1);
    const filterModal = bootstrap.Modal.getInstance(document.getElementById("filterModal"));
    filterModal.hide();
});

function renderDogs(page = 1) {
    const start = (page - 1) * dogsPerPage;
    const end = page * dogsPerPage;
    const dogsToDisplay = filteredDogs.slice(start, end);

    const dogSelectionGrid = document.getElementById('dogSelectionGrid');
    dogSelectionGrid.innerHTML = '';

    dogsToDisplay.forEach(dog => {
        const dogCard = document.createElement('div');
        dogCard.classList.add('col-6', 'dog-card');
        dogCard.innerHTML = `
            <div class="card dog-card mb-3 py-1 pe-2 ps-1" data-id="${dog.id}" onclick="selectDog(${dog.id})">
                <img src="${dog.photo}" class="dog-photo card-img-top" alt="${dog.name}">
                <div class="dog-info text-center border rounded-pill mt-1 border-secondary">
                    <strong>${dog.name}</strong><br>
                    <small>veľkosť: ${dog.size}, pohlavie: ${dog.sex}</small><br>
                    <small>vek: ${dog.age}</small>
                </div>
            </div>
        `;
        dogSelectionGrid.appendChild(dogCard);
    });

    renderPagination(filteredDogs.length, page);
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
        document.querySelectorAll('-card').forEach(card => {
            card.classList.remove('border', 'border-3', 'rounded', 'bg-primary', 'bg-opacity-10', 'border-primary');
        });
    } else {
        selectedDogId = dogId;
        document.querySelectorAll('.dog-card').forEach(card => {
            card.classList.remove('border', 'border-3', 'rounded', 'bg-primary', 'bg-opacity-10', 'border-primary');
        });
        const selectedCard = document.querySelector(`[data-id="${dogId}"]`);
        if (selectedCard) {
            selectedCard.classList.add('border', 'border-3', 'rounded', 'bg-primary', 'bg-opacity-10', 'border-primary');
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

renderDogs();


let selectedDogId = null;
const dogsPerPage = 8; // Number of dogs to show per page
let currentPage = 1;

var filteredDogs = dogs;
var dogsToChoose = dogs;
const applyFilterButton = document.getElementById("applyFilter");
let selectedDogs = []; // Pole na uloženie ID vybraných psov

document.addEventListener('DOMContentLoaded', function() {
    let selectedDogId = localStorage.getItem('selectedDogId');
    if (selectedDogId) {
        filteredDogs = dogs.filter(dog => dog.id !== parseInt(selectedDogId));
        dogsToChoose = filteredDogs;
        selectedDogs.push(parseInt(selectedDogId));
    }
    renderDogs();
    updateSelectedDogsUI();
});

applyFilterButton.addEventListener("click", () => {
    let sexes = document.querySelectorAll(('#sex input'));
    let checkedSexes = Array.from(sexes).filter(checkbox => checkbox.checked).map(checkbox => checkbox.value);

    let sizes = document.querySelectorAll(('#size input'));
    let checkedSizes = Array.from(sizes).filter(checkbox => checkbox.checked).map(checkbox => checkbox.value);

    // Filter Logic
    filteredDogs = dogsToChoose.filter(dog => {
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
function renderDogs(page = 1) {
    const start = (page - 1) * dogsPerPage;
    const end = page * dogsPerPage;
    const dogsToDisplay = filteredDogs.slice(start, end);

    const dogSelectionGrid = document.getElementById('dogSelectionGrid');
    dogSelectionGrid.innerHTML = '';

    dogsToDisplay.forEach(dog => {
        const dogCard = document.createElement('div');
        dogCard.classList.add('col-6', 'col-md-3');
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
                    <button class="btn btn-secondary btn-sm dog-info-btn" id="dog${dog.id}" data-dog-id="${dog.id}" >Viac info</button>
                </div>
            </div>
        `;
        dogSelectionGrid.appendChild(dogCard);
    });

    renderPagination(filteredDogs.length, page);
    connectDetailButton();
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

function updateSelectedDogsUI() {
    const chosenDogDiv = document.querySelector('.chosen-dog');

    if (selectedDogs.length === 0) {
        chosenDogDiv.innerHTML = '';
    } else {
        chosenDogDiv.innerHTML = '<div>Zvolení psíkovia:</div>';
        selectedDogs.forEach(id => {
            const dog = dogs.find(d => d.id === id); // Find dog by ID
            if (dog) {
                chosenDogDiv.innerHTML += `
                <li class="mb-1">
                    <strong>${dog.name}</strong> <small>- veľkosť: ${dog.size}, vek: ${dog.age}</small>
                    <button class="btn p-0" onclick="removeDogFromSelected(${id})">
                        <img src="images/remove.png" alt="Odstrániť psíka">
                    </button>
                </li>
            `;
            }
        });
    }
}
function removeDogFromSelected(id) {
    const index = selectedDogs.indexOf(id);
    if (index !== -1) {
        selectedDogs.splice(index, 1); // Remove the dog from the array
        updateSelectedDogsUI(); // Update the UI
        const selectedCard = document.querySelector(`[data-id="${id}"]`);
        if (selectedCard) {
            selectedCard.classList.remove('bg-primary', 'bg-opacity-10', 'border-primary', 'border-3');
            selectedCard.classList.add('border-secondary');
        }
    }
}

function selectDog(dogId) {
    const selectedCard = document.querySelector(`[data-id="${dogId}"]`);

    document.querySelector(".invalid-number").style.display = "none";
    document.querySelector(".invalid-compatibility").style.display = "none";

    // Check if the dog is already selected
    if (selectedDogs.includes(dogId)) {
        // Remove the dog from the selection
        selectedDogs = selectedDogs.filter(id => id !== dogId);
        updateSelectedDogsUI();
        if (selectedCard) {
            selectedCard.classList.remove('bg-primary', 'bg-opacity-10', 'border-primary', 'border-3');
            selectedCard.classList.add('border-secondary');
        }
    } else {
        if (selectedDogs.length < 2) {
            // If another dog is already selected, check compatibility
            if (selectedDogs.length === 1) {
                const existingDogId = selectedDogs[0];
                if (!areDogsCompatible(existingDogId, dogId)) {
                   // alert('Psíkovia nie sú kompatibilní, prosím vyberte si inú dvojicu');
                    document.querySelector(".invalid-compatibility").style.display = "block";
                    window.scrollTo({
                        top: 0,
                        behavior: 'smooth'
                    })
                    return; // Exit without adding the incompatible dog
                }
            }

            // Add the dog to the selection
            selectedDogs.push(dogId);
            updateSelectedDogsUI();
            if (selectedCard) {
                selectedCard.classList.remove('border-secondary');
                selectedCard.classList.add('bg-primary', 'bg-opacity-10', 'border-primary', 'border-3');
            }
        } else {
           // alert('Môžete si vybrať najviac dvoch psíkov!');
            document.querySelector(".invalid-number").style.display = "block";
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            })
        }
    }
}

// Skontrolujeme kompatibilitu
function areDogsCompatible(dogId1, dogId2) {
    // Find dogs in the database
    const dog1 = dogs.find(dog => dog.id === dogId1);
    const dog2 = dogs.find(dog => dog.id === dogId2);

    return dog1 && dog2 && dog1.room === dog2.room;
}


document.getElementById('dogFilter').addEventListener('input', function() {
    renderDogs(currentPage, this.value);
});
document.getElementById('submitButton').addEventListener('click', function () {
    if (selectedDogs.length > 0) {
        if (selectedDogs.length === 2) {
                document.querySelector(".invalid-required").style.display = "none";
                //document.querySelector(".invalid-compatibility").style.display = "none";
                localStorage.setItem('selectedDogIds', JSON.stringify(selectedDogs)); // Uloženie oboch ID vybraných psov
                window.location.href = 'walk_out_user_info.html';

        } else if (selectedDogs.length === 1) {
            document.querySelector(".invalid-required").style.display = "none";
            //document.querySelector(".invalid-compatibility").style.display = "none";
            localStorage.setItem('selectedDogIds', JSON.stringify(selectedDogs)); // Uloženie jedného vybraného ID psa ako pole
            window.location.href = 'walk_out_user_info.html';
        }
    } else {
        document.querySelector(".invalid-required").style.display = "block";
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
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


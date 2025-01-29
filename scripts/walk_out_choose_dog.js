let selectedDogId = null;
let dogsPerPage = 4; // Number of dogs to show per page
let limitDogCount = 4;
let currentPage = 1;

var filteredDogs = dogs;
var dogsToFilter = dogs;
const applyFilterButton = document.getElementById("applyFilter");

document.addEventListener('DOMContentLoaded', function() {
    updateFilterOptions();
});

applyFilterButton.addEventListener("click", () => {
    let sexes = document.querySelectorAll(('#sex input'));
    let checkedSexes = Array.from(sexes).filter(checkbox => checkbox.checked).map(checkbox => checkbox.value);

    let sizes = document.querySelectorAll(('#size input'));
    let checkedSizes = Array.from(sizes).filter(checkbox => checkbox.checked).map(checkbox => checkbox.value);

    let rooms = document.querySelectorAll(('#room input'));
    let selectedRooms = Array.from(rooms).filter(checkbox => checkbox.checked).map(checkbox => checkbox.value);

    filteredDogs = dogsToFilter.filter(dog => {
        let matchesSex = checkedSexes.length === 0 || checkedSexes.includes(dog.sex);
        let matchesSize = checkedSizes.length === 0 || checkedSizes.includes(dog.size);
        let matchesRoom = selectedRooms.length === 0 || selectedRooms.includes(dog.room);

        return matchesSex && matchesSize && matchesRoom;
    });
    limitDogCount = dogsPerPage;

    // Render Filtered Dogs
    renderDogs(1);
    const filterModal = bootstrap.Modal.getInstance(document.getElementById("filterModal"));
    filterModal.hide();
});

function updateFilterOptions() {
    const roomFilterContainer = document.getElementById("room");

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
}

function showSelectedDog() {
    if (selectedDogId) {
        const selectedCard = document.querySelector(`[data-id="${selectedDogId}"]`);
        if (selectedCard) {
            selectedCard.classList.remove('border-secondary');
            selectedCard.classList.add('bg-primary', 'bg-opacity-10', 'border-primary', 'border-3');
        }
        let button = document.querySelector(`.dog-info-select[data-dog-id="${selectedDogId}"]`);
        if (button) {
            button.textContent = 'Odobrať';
            button.classList.add('btn-danger');
        }
    }
}

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

            const modalButton = document.querySelector('.dog-modal-info-select');
            modalButton.setAttribute('data-dog-id', dog.id);
            if (Number(dog.id) === Number(selectedDogId)){
                modalButton.textContent = 'Odobrať';
                modalButton.classList.add('btn-danger');
            } else {
                modalButton.textContent = 'Vybrať';
                modalButton.classList.remove('btn-danger');
            }
            modalButton.addEventListener('click', function () {
                const targetButton = document.querySelector(`.dog-info-select[data-dog-id="${dog.id}"]`);
                if (targetButton) {
                    targetButton.click();
                }
            }, { once: true });
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
                otherButton.classList.remove('btn-danger');
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

function hideLoadMoreButton() {
    if (limitDogCount >= filteredDogs.length) {
        let loadButton = document.getElementById('loadMoreButton');
        loadButton.classList.add('d-none');
        loadButton.parentElement.classList.remove('my-1');
    }
}
function showLoadMoreButton() {
    let loadButton = document.getElementById('loadMoreButton');
    loadButton.classList.remove('d-none');
    loadButton.parentElement.classList.add('my-1');
}


document.getElementById('dogFilter').addEventListener('input', function() {
    renderDogs(currentPage);
});
document.getElementById('loadMoreButton').addEventListener('click', () => {
    limitDogCount += dogsPerPage;
    renderDogs(currentPage, true); // Re-render the grid with the updated number of items
    hideLoadMoreButton();
});

document.getElementById('backButton').addEventListener('click', function() {
    history.back();
});



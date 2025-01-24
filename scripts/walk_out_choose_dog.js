let selectedDogId = null;
let dogsPerPage = 4; // Number of dogs to show per page
let currentPage = 1;

var filteredDogs = dogs;
const applyFilterButton = document.getElementById("applyFilter");

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
        dogsPerPage = 4;
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

            const modalButton = document.querySelector('.dog-modal-info-select');
            modalButton.setAttribute('data-dog-id', dog.id);
            console.log(Number(dog.id) === Number(selectedDogId));
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
            console.log('selected '+selectedDogId);
            console.log('dogId '+selectedDogId);
        });
    });
}


document.getElementById('dogFilter').addEventListener('input', function() {
    renderDogs(currentPage, this.value);
});
    document.getElementById('loadMoreButton').addEventListener('click', () => {
        dogsPerPage = dogsPerPage+4;
        renderDogs(currentPage); // Re-render the grid with the updated number of items
        if (dogsPerPage >= filteredDogs.length) {
            document.getElementById('loadMoreButton').style.display = 'none';
        }
});

document.getElementById('backButton').addEventListener('click', function() {
    history.back();
});



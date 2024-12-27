let selectedDogId = null;
let animalType =  null;
document.addEventListener('DOMContentLoaded', function () {
    const animal = JSON.parse(localStorage.getItem('selectedAnimal'));

    if (animal) {
        selectedDogId = animal.id;
        animalType = animal.type;
        document.getElementById('animalName').textContent = animal.name;
        document.getElementById('animalSize').textContent = animal.size;
        document.getElementById('animalSex').textContent = animal.sex;
        document.getElementById('animalAge').textContent = animal.age;
        document.getElementById('animalDescription').textContent = animal.description || 'Bez popisu';
        document.getElementById('animalImage').src = animal.photo;
        document.getElementById('animalImage').alt = animal.name;
        document.getElementById('animalShelterDuration').textContent = animal.shelterDuration || 'Neznáme';
        document.getElementById('animalShelterInfo').textContent = animal.info || 'Neznáme';
    } else {
        window.location.href = 'catalog.js.html';
    }

    let submitButton = document.getElementById('submitButton');
    if (animalType === 'cat') {
        submitButton.classList.add('d-none');
    }
});



document.getElementById('submitButton').addEventListener('click', function() {
    localStorage.setItem('catalogSelectedDogId', selectedDogId);
    redirectToPage('walk_from_detail');
});


document.getElementById('backButton').addEventListener('click', function() {
    
    history.back();
});
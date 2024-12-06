document.addEventListener('DOMContentLoaded', function () {
    const animal = JSON.parse(localStorage.getItem('selectedAnimal'));

    if (animal) {
        document.getElementById('animalName').textContent = animal.name;
        document.getElementById('animalSize').textContent = animal.size;
        document.getElementById('animalSex').textContent = animal.sex;
        document.getElementById('animalAge').textContent = animal.age;
        document.getElementById('animalDescription').textContent = animal.description || 'Bez popisu';
        document.getElementById('animalImage').src = animal.photo;
        document.getElementById('animalImage').alt = animal.name;
        document.getElementById('animalShelterDuration').textContent = animal.shelterDuration || 'Neznáme';
    } else {
        window.location.href = 'catalog.js.html';
    }
});

document.getElementById('submitButton').addEventListener('click', function() {
    redirectToPage('');
});

document.getElementById('backButton').addEventListener('click', function() {
    history.back();
});
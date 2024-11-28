window.onload = function () {
    const userData = JSON.parse(localStorage.getItem('userData'));

    if (userData) {
        // Zobrazenie údajov na stránke
        document.getElementById('displayWalkId').textContent = userData.idNumber || 'Nebol zadaný';
        document.getElementById('displayName').textContent = userData.name || 'Nebol zadaný';
        document.getElementById('displaySurname').textContent = userData.surname || 'Nebol zadaný';
        document.getElementById('displayPhone').textContent = userData.phone || 'Nebol zadaný';
        document.getElementById('displayEmail').textContent = userData.email || 'Nebol zadaný';

        // Zobraziť heslo, ak bolo zadané
        const passwordSection = document.getElementById('passwordSection');
        if (userData.password) {
            document.getElementById('displayPassword').textContent = '******'; // Zobrazenie maskovaného hesla
        } else {
            passwordSection.style.display = 'none'; // Skryť sekciu, ak heslo nebolo zadané
        }
    } else {
        alert('Údaje neboli nájdené.');
    }

    // Ak sa klikne na tlačidlo "Späť na formulár", vráti nás to na predchádzajúcu stránku
    document.getElementById('backButton').addEventListener('click', function() {
        window.history.back();
    });
};
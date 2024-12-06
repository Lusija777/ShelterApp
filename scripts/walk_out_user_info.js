window.onload = function () {
    const userData = localStorage.getItem('userData');

    if (userData) {
        const user = JSON.parse(userData);

        document.getElementById('walkId').value = user.walkId || '';
        document.getElementById('name').value = user.name || '';
        document.getElementById('surname').value = user.surname || '';
        document.getElementById('phone').value = user.phone || '';
        document.getElementById('email').value = user.email || '';
    }
}

document.getElementById('passwordToggle').addEventListener('change', function() {
    const passwordFields = document.getElementById('passwordFields');
    if (this.checked) {
        passwordFields.classList.remove('d-none');
    } else {
        passwordFields.classList.add('d-none');
    }
});

// Spracovanie formulára
document.getElementById('registerForm').addEventListener('submit', function (event) {
    event.preventDefault();
    const form = this;

    // Skrytie Bootstrap validácie, pokiaľ bude kontrola neplatná
    if (!form.checkValidity()) {
        event.stopPropagation();
        form.classList.add('was-validated');
        return;
    }

    const idNumber = document.getElementById('walkId').value.trim();
    const name = document.getElementById('name').value.trim();
    const surname = document.getElementById('surname').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    let hasError = false;

    // Kontrola zhodnosti venčiarskeho preukazu
    if (idNumber) {
        const user = users.find(u => u.idNumber === idNumber);
        if (!user) {
            showError('walkId', 'Venčiarsky preukaz sa nenašiel medzi registrovanými užívateľmi.');
            hasError = true;
        } else if (user.name !== name || user.surname !== surname || user.phone !== phone || user.email !== email) {
            showError('walkId', 'Údaje sa nezhodujú s existujúcim preukazom.');
            hasError = true;
        }
    }

    // Kontrola hesiel, ak sú zadané
    if (document.getElementById('passwordToggle').checked) {
        if (!password || !confirmPassword) {
            showError('password', 'Vyplňte obe heslové polia.');
            hasError = true;
        } else if (password !== confirmPassword) {
            showError('confirmPassword', 'Heslá sa nezhodujú.');
            hasError = true;
        }
    }

    if (hasError) {
        form.classList.remove('was-validated');
        return;
    }
    const userData = {
        idNumber,
        name,
        surname,
        phone,
        email,
        password: password || null,
    };
    localStorage.setItem('userData', JSON.stringify(userData));
    window.location.href = 'walk_out_summary.html';
});

// Funkcia na zobrazenie chýb
function showError(inputId, message) {
    const inputElement = document.getElementById(inputId);
    const errorMessage = document.createElement('div');
    errorMessage.className = 'invalid-feedback d-block';
    errorMessage.textContent = message;
    inputElement.classList.add('is-invalid');
    inputElement.parentNode.appendChild(errorMessage);
}

document.getElementById('backButton').addEventListener('click', function() {
    history.back();
});

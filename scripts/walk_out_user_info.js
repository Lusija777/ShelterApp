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

    document.querySelectorAll('.invalid-feedback').forEach(element => {
        element.classList.remove('d-block');
        element.classList.add('d-none');
    });
    document.querySelectorAll('.is-invalid').forEach(element => {
        element.classList.remove('is-invalid');
    });

    const idNumber = document.getElementById('walkId').value.trim();
    const name = document.getElementById('name').value.trim();
    const surname = document.getElementById('surname').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const checkbox = document.getElementById('passwordToggle');

    let hasError = false;

    if (!name) {
        showError('name', 'Meno je povinný údaj.');
        hasError = true;
    }
    if (!surname) {
        showError('surname', 'Priezvisko je povinný údaj.');
        hasError = true;
    }
    if (!phone) {
        showError('phone', 'Telefónne číslo je povinný údaj.');
        hasError = true;
    } else if (!/^09\d{8}$/.test(phone)) {
        showError('phone', 'Telefónne číslo musí začínať na 09 a pokračovať 8 číslicami.');
        hasError = true;
    }
    if (!email) {
        showError('email', 'E-mail je povinný údaj.');
        hasError = true;
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
        showError('email', 'E-mail musí byť platný. Skontrolujte, či obsahuje @ a platnú doménu.');
        hasError = true;
    }

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

    if (checkbox.checked){
        if (!password) {
            showError('password', 'Heslo je povinný údaj.');
            hasError = true;
        }
        if (!confirmPassword) {
            showError('confirmPassword', 'Zopakujte heslo pre potvrdenie. Toto pole je povinné.');
            hasError = true;
        }
    }

    // Kontrola hesiel, ak sú zadané
    if (document.getElementById('passwordToggle').checked) {
        if (!password || !confirmPassword) {
            showError('password', 'Heslo je povinné. Vyplňte obe polia.');
            hasError = true;
        } else if (password !== confirmPassword) {
            showError('confirmPassword', 'Heslá sa nezhodujú. Uistite sa, že obe polia majú rovnaké heslo.');
            hasError = true;
        }
    }

    if (hasError) {
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
    const errorMessage = inputElement.parentElement.querySelector('.invalid-feedback');
    errorMessage.classList.remove('d-none');
    errorMessage.classList.add('d-block');
    errorMessage.textContent = message;
    inputElement.classList.add('is-invalid');
}

document.getElementById('backButton').addEventListener('click', function() {
    history.back();
});

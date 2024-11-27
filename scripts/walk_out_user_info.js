const users = [
    { idNumber: "123456", name: "Peter", surname: "Novák", phone: "0901234567", email: "peter.novak@email.com", password: "password123" },
    { idNumber: "654321", name: "Eva", surname: "Kováčová", phone: "0912345678", email: "eva.kovacova@email.com", password: "password321" },
    { idNumber: "112233", name: "Marek", surname: "Horváth", phone: "0923456789", email: "marek.horvath@email.com", password: "password456" },
    { idNumber: "223344", name: "Jana", surname: "Müllerová", phone: "0934567890", email: "jana.mullerova@email.com", password: "password789" },
    { idNumber: "334455", name: "Tomáš", surname: "Varga", phone: "0945678901", email: "tomas.varga@email.com", password: "password101" }
];

document.getElementById('passwordToggle').addEventListener('change', function() {
    const passwordFields = document.getElementById('passwordFields');
    if (this.checked) {
        passwordFields.classList.remove('d-none');
    } else {
        passwordFields.classList.add('d-none');
    }
});

document.addEventListener("DOMContentLoaded", () => {
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.forEach(tooltipTriggerEl => {
        new bootstrap.Tooltip(tooltipTriggerEl);
    });
});

// JavaScript na aktiváciu tooltippu
const tooltipContainer = document.querySelector('div[style*="cursor: help"]');
const tooltip = tooltipContainer.querySelector('div');

tooltipContainer.addEventListener('mouseenter', () => {
    tooltip.style.visibility = 'visible';
});

tooltipContainer.addEventListener('mouseleave', () => {
    tooltip.style.visibility = 'hidden';
});

// Spracovanie formulára
document.getElementById('registerForm').addEventListener('submit', function (event) {
    event.preventDefault();

    // Získanie hodnôt z formulára
    const idNumber = document.getElementById('walkId').value.trim();
    const name = document.getElementById('name').value.trim();
    const surname = document.getElementById('surname').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    // Skrytie všetkých predchádzajúcich chybových správ
    const errorMessages = document.querySelectorAll('.error-message');
    errorMessages.forEach(function (message) {
        message.remove();
    });

    // Premenné na kontrolu chýb
    let hasError = false;

    // Kontrola vyplnenia povinných polí
    if (!name || !surname || !phone || !email) {
        showError('walkId', 'Vyplňte všetky povinné polia.');
        hasError = true;
    }

    // Kontrola zhodnosti venčiarskeho preukazu
    if (idNumber) {
        const user = users.find(u => u.idNumber === idNumber);
        if (!user) {
            showError('walkId', 'Venčiarsky preukaz sa nenašiel medzi registrovanými užívateľmi.');
            hasError = true;
        }

        // Kontrola, či sa ostatné údaje zhodujú
        if (user.name !== name || user.surname !== surname || user.phone !== phone || user.email !== email) {
            showError('walkId', 'Údaje sa nezhodujú s existujúcim preukazom.');
            hasError = true;
        }
    }

    // Kontrola hesiel, ak je zadané
    if (document.getElementById('passwordToggle').checked) {
        if (!password || !confirmPassword) {
            showError('password', 'Vyplňte obe heslové polia.');
            hasError = true;
        } else if (password !== confirmPassword) {
            showError('password', 'Heslá sa nezhodujú.');
            hasError = true;
        }
    }

    // Ak sú chyby, neuložíme údaje
    if (hasError) {
        return;
    }

    // Uloženie do Local Storage
    const userData = {
        idNumber,
        name,
        surname,
        phone,
        email,
        password: password || null,
    };
    localStorage.setItem('userData', JSON.stringify(userData));
    console.log('Údaje boli uložené.');
});

// Funkcia na zobrazenie chybovej správy
function showError(inputId, message) {
    const inputElement = document.getElementById(inputId);
    const errorElement = document.createElement('div');
    errorElement.classList.add('error-message', 'text-danger', 'mt-2');
    errorElement.textContent = message;
    inputElement.classList.add('is-invalid'); // Pridáme Bootstrap triedu na označenie chyby
    inputElement.parentNode.appendChild(errorElement);
}
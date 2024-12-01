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
    console.log('Údaje boli uložené.');
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

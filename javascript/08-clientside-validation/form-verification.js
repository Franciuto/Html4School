document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('loginForm');
    const nominativo = document.getElementById('nominativo');
    const eta = document.getElementById('eta');
    const consenso = document.getElementById('consenso');
    const password = document.getElementById('password');

    // Funzione di validazione
    function valida(campo, condizione, messaggio) {
        const feedback = campo.parentElement.querySelector('.invalid-feedback');
        campo.classList.remove('is-invalid', 'is-valid');

        if (!condizione) {
            campo.classList.add('is-invalid');
            feedback.textContent = messaggio;
            return false;
        }

        campo.classList.add('is-valid');
        return true;
    }

    // Validazione nominativo
    function validaNominativo(nome) {
        const lettere = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZàèéìòùÀÈÉÌÒÙ ';
        for (let char of nome) {
            if (!lettere.includes(char)) return false;
        }
        return nome.trim().length > 0;
    }

    // Validazione password
    function validaPassword(pwd) {
        if (pwd.length < 8 || pwd.length > 20) return false;

        let haMaiuscola = false, haMinuscola = false, haNumero = false, haSpeciale = false;
        const speciali = '@$!%*?&_-';

        for (let char of pwd) {
            if (char >= 'A' && char <= 'Z') haMaiuscola = true;
            if (char >= 'a' && char <= 'z') haMinuscola = true;
            if (char >= '0' && char <= '9') haNumero = true;
            if (speciali.includes(char)) haSpeciale = true;
        }

        return haMaiuscola && haMinuscola && haNumero && haSpeciale;
    }

    // Validazione in tempo reale
    nominativo.addEventListener('blur', () =>
        valida(nominativo, validaNominativo(nominativo.value), 'Solo lettere e spazi')
    );

    eta.addEventListener('blur', () =>
        valida(eta, eta.value >= 18 && eta.value <= 100, 'Età tra 18 e 100')
    );

    consenso.addEventListener('change', () =>
        valida(consenso, consenso.checked, 'Devi accettare il consenso')
    );

    password.addEventListener('blur', () =>
        valida(password, validaPassword(password.value), 'Password: 8-20 caratteri, maiuscola, minuscola, numero e carattere speciale (@$!%*?&_-)')
    );

    // Submit
    form.addEventListener('submit', function(e) {
        e.preventDefault();

        const validazioni = [
            valida(nominativo, validaNominativo(nominativo.value), 'Solo lettere e spazi'),
            valida(eta, eta.value >= 18 && eta.value <= 100, 'Età tra 18 e 100'),
            valida(consenso, consenso.checked, 'Devi accettare il consenso'),
            valida(password, validaPassword(password.value), 'Password: 8-20 caratteri, maiuscola, minuscola, numero e carattere speciale (@$!%*?&_-)')
        ];

        if (validazioni.every(v => v)) {
            alert('Form valido!');
            console.log({
                nominativo: nominativo.value.trim(),
                eta: eta.value,
                consenso: consenso.checked,
                password: password.value
            });
            form.reset();
            [nominativo, eta, consenso, password].forEach(c => c.classList.remove('is-valid', 'is-invalid'));
        }
    });
});

let passwordN = document.getElementById("p_number");
let output = document.getElementById("passwords")

function generatePassword(length = 12) {
    let chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-_*+%&$=";
    let password = "";
    for (let i = 0; i < length; i++) {
        let randomInd = Math.floor(Math.random() * chars.length);
        password += chars[randomInd]; 
    }
    return password;
}

function generatePasswords() {
    let n = parseInt(passwordN.value);
    if (isNaN(n) || n <= 0) {
        output.textContent = "Inserisci un numero valido maggiore di 0";
        return;
    }

    output.innerHTML = "";
    for (let i = 0; i < n; i++) {
        let pw = generatePassword();
        let item = document.createElement("div");
        item.className = "list-group-item";
        item.textContent = pw;
        output.appendChild(item);
    }
}
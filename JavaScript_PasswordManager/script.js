<script src="https://cdn.jsdelivr.net/npm/js-md5@0.7.3/src/md5.min.js"></script>
const users = {
    admin: md5("password"),
    franciuto: md5("aura")1,
}

let loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const username = loginForm.getElementById("formUsername");
    const password = loginForm.getElementById("formPaassword");

    if (username in users) {
        if (password === users[username]) {

        }
    }
})

function login() {
    
}

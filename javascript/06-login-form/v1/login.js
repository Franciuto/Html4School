const users = [
    { username: "admin", password: md5("admin123"), role: "admin" },
    { username: "franciuto", password: md5("aura"), role: "user" },
    { username: "gabibbo", password: "9fb3f6b28debb74180a810c435943037", role : "SuPeR aUrA UsEr"}
];

const form = document.getElementById("loginForm");
const output = document.getElementById("output");

form.addEventListener("submit", (e) => {
    e.preventDefault();
    
    const username = document.getElementById("username").value.trim();
    const password = md5(document.getElementById("password").value.trim());
    
    const user = users.find(u => u.username === username && u.password === password);
    
    if (!user) {
        output.textContent = "Credenziali errate.";
        return;
    } else {
        output.innerHTML = `Benvenuto ${user.username}, ora sei: ${user.role}`;
    }

    if (user.role === "SuPeR aUrA UsEr") {
        output.innerHTML = `here is the SuPeR aUrA UsEr flag: flag{md5_cr4ck1n9_1s_th3_w4y}`
    }
});
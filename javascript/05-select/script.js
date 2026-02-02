// dati semplificati
let dati = {
    "Emilia-Romagna": {
        "Parma": ["Parma", "Fidenza", "Salsomaggiore"],
        "Reggio Emilia": ["Reggio Emilia", "Correggio", "Scandiano"]
    },
    "Lombardia": {
        "Milano": ["Milano", "Rho", "Sesto San Giovanni"],
        "Bergamo": ["Bergamo", "Treviglio", "Dalmine"]
    }
};

let selectRegione = document.getElementById("regione");
for (let regione in dati) {
    let opt = document.createElement("option");
    opt.value = regione;
    opt.textContent = regione;
    selectRegione.appendChild(opt);
}

// aggiorno province
selectRegione.onchange = function() {
    var provSelect = document.getElementById("provincia");
    var comuneSelect = document.getElementById("comune");

    provSelect.innerHTML = '<option value="">Seleziona una provincia</option>';
    comuneSelect.innerHTML = '<option value="">Seleziona un comune</option>';

    let regioneSelezionata = this.value;
    if (regioneSelezionata !== "") {
        let province = dati[regioneSelezionata];
        for (let prov in province) {
            let opt = document.createElement("option");
            opt.value = prov;
            opt.textContent = prov;
            provSelect.appendChild(opt);
        }
    }
};

// aggiorno comuni
document.getElementById("provincia").onchange = function() {
    var comuneSelect = document.getElementById("comune");
    comuneSelect.innerHTML = '<option value="">Seleziona un comune</option>';

    var regione = document.getElementById("regione").value;
    var provincia = this.value;

    if (provincia !== "") {
        var comuni = dati[regione][provincia];
        for (var i = 0; i < comuni.length; i++) {
            var opt = document.createElement("option");
            opt.value = comuni[i];
            opt.textContent = comuni[i];
            comuneSelect.appendChild(opt);
        }
    }
};
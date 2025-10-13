const current_value_output = document.getElementById('counter_output');

let counter = 0
current_value_output.textContent = counter;

function increment() {
    const inc = parseInt(document.getElementById("increment").value);
    counter += inc;
    current_value_output.textContent = counter;
}

function decrement() {
    const inc = parseInt(document.getElementById("increment").value);
    counter -= inc;
    current_value_output.textContent = counter;
}
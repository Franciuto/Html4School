let counter = 0;
const output = document.getElementById('counter_output')

output.textContent = counter

function decrement() {
    counter--;
    output.textContent = counter;
}

function increment() {
    counter++;
    output.textContent = counter;
}
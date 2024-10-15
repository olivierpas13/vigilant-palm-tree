
// Can use css or a premade component in a css framework to do this kind of thing
// also this should be arrow functions, not function declarations to prevent hoisting problems
function setPlaceholder() {
    const input = document.getElementById('quantity');
    input.placeholder = "6.69"; // Cambia el placeholder al enfocar
}

function resetPlaceholder() {
    const input = document.getElementById('quantity');
    if (input.value === "") {
        input.placeholder = " "; // Vuelve a un espacio si el input está vacío
    }
}

// Lógica del algoritmo
const getQuantity = (quantityRaw) => {
    // this is the best way to work the problem, good job
    return Math.round(quantityRaw * 100);
};

const calculateCoins = (quantity) => {
    const coins = [25, 10, 5, 1];
    let numberOfCoins = [0, 0, 0, 0];
// try to use less for n' while loops and use more high order functions (functional programming)
    for (let i = 0; i < 4; i++) {
        while (quantity >= coins[i]) {
            numberOfCoins[i]++;
            quantity = quantity - coins[i];
        }
    }

    return numberOfCoins;
};

// name needs to be more meaningful
const mainFunction = (event) => {
    event.preventDefault();

    const value = parseFloat(document.getElementById('quantity').value);
    const valueNoRaw = getQuantity(value);

    let numberOfCoins = calculateCoins(valueNoRaw);

    // this could be done without repeating code
    const quarters = numberOfCoins[0];
    const dimes = numberOfCoins[1];
    const nickels = numberOfCoins[2];
    const pennies = numberOfCoins[3];
    const total=quarters+dimes+nickels+pennies;

    const content = document.getElementById('calcs');
    content.innerHTML = `
        <div class="p-6 bg-slate-800 rounded-lg shadow-lg text-center mt-6">
            <h2 class="text-2xl font-bold text-white mb-4">Resultados</h2>
            <div class="text-lg text-blue-400 mb-2">Quarters: <span class="text-blue-300 font-semibold">${quarters}</span></div>
            <div class="text-lg text-green-400 mb-2">Dimes: <span class="text-green-300 font-semibold">${dimes}</span></div>
            <div class="text-lg text-yellow-400 mb-2">Nickels: <span class="text-yellow-300 font-semibold">${nickels}</span></div>
            <div class="text-lg text-pink-400 mb-2">Pennies: <span class="text-pink-300 font-semibold">${pennies}</span></div>
            <div class="text-3xl text-blue-400 mb-2">Total Coins: <span class="text-blue-300 font-semibold">${total}</span></div>
        </div>
    `;
};

document.getElementById('info').addEventListener('submit', mainFunction);


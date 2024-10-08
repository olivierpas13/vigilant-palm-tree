const dispGreet = (event) => {
    event.preventDefault(); 

    const name = document.getElementById('nombre').value;
    const selectElement = document.getElementById('iotFav');

    const selectedOptionText = selectElement.options[selectElement.selectedIndex].text;

    const message = `Hello ${name}, your favorite IoT device is ${selectedOptionText}`;
    const content = document.getElementById('mainContent');

    content.innerHTML = `
        <h2>Su información es:</h2>
        <p>${message}</p>
    `;
}

document.getElementById('info').addEventListener('submit', dispGreet);

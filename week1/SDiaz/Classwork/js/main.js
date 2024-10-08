const form = document.getElementById('iotForm');
const messageSection = document.getElementById('message');

form.addEventListener('submit', function(event){
    event.preventDefault();

    const name = document.getElementById('firstName').value;
    const favoriteIoT = document.getElementById('IoT').value;

    const message = `Hello ${name}, your favorite IoT device is ${favoriteIoT}.`;

    messageSection.textContent = message;

})
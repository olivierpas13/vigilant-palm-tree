const form = document.getElementById('iotForm');
const messageSection = document.getElementById('message');

// callback can be an arrow function 
form.addEventListener('submit', function(event){
    event.preventDefault();

    const name = document.getElementById('firstName').value;
    const favoriteIoT = document.getElementById('IoT').value;

    // great use of fstrings
    const message = `Hello ${name}, your favorite IoT device is ${favoriteIoT}.`;

    messageSection.textContent = message;

})
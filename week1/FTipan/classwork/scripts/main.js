//Variable to make the responsive box appear
let response_box = document.querySelector('.form-response');

//variable to get the form form the HTML document
const iotForm = document.querySelector('form'); 

//Listen to the "submit" event of the form
iotForm.addEventListener("submit", (e) => {
	//prevent the page from reloading
	e.preventDefault();

	//get the data from all the input fields

	// try using const instead of let when you are not modifying the value of the variable
	
	let nombre = document.getElementById("name").value;
    let iot_fav = document.getElementById("iot").value;
    
	//build the message
	// fstrings tend to be a better option
	let message = "Hola " + nombre + ", tu dispositivo IoT favorito es " + iot_fav + "!";
	// dont leave clgs on the code
	//console.log(message);

	// code lines can be reduced on several places
	//change the text content of the response box
	let inner_response = document.getElementById("form-inner-message");
	inner_response.innerText = message;

	//add a custom "class" to the response box to make it appear in the webpage
	response_box.classList.add('form-response_active');
});
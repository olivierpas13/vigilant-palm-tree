/*
   #################################
   # Code to adjust the text input #
   # to a currency data type       #
   #################################
*/

// Jquery Dependency
$("input[data-type='currency']").on({
    keyup: function() {
      formatCurrency($(this));
    },
    blur: function() { 
      formatCurrency($(this), "blur");
    }
});

function formatCurrency(input, blur) {
  // validates decimal side
  // and puts cursor back in right position.
  
  // get input value
  var input_val = input.val();
  
  // don't validate empty input
  if (input_val === "") { return; }
  
  // original length
  var original_len = input_val.length;

  // initial caret position 
  var caret_pos = input.prop("selectionStart");
    
  // check for decimal
  if (input_val.indexOf(".") >= 0) {

    // get position of first decimal
    // this prevents multiple decimals from
    // being entered
    var decimal_pos = input_val.indexOf(".");

    // split number by decimal point
    var right_side = input_val.substring(decimal_pos);
    
    // On blur make sure 2 numbers after decimal
    if (blur === "blur") {
      right_side += "00";
    }
    
    // Limit decimal to only 2 digits
    right_side = right_side.substring(0, 2);

  } else {    
    // final formatting
    if (blur === "blur") {
      input_val += ".00";
    }
  }
  
  // send updated string to input
  input.val(input_val);

  // put caret back in the right position
  var updated_len = input_val.length;
  caret_pos = updated_len - original_len + caret_pos;
  input[0].setSelectionRange(caret_pos, caret_pos);
}

/*
  Code related to the problem set solution
*/

let coins = [1, 5, 10, 25];
let n = coins.length;

function findMinCoins(sum){
  let res = [];

  //start from the highest coin denomination
  for (let i=n-1;i>=0;i--){
    //if the current denomination is less than the
    // total sum, subtract the value and add the
    // current denomination to the array
    while(sum>=coins[i]){
      sum -= coins[i];
      res.push(coins[i]);
    }
  }

  //Get the number of coins of each type
  getCoins(res);
}

function countInArray(data){
  let itemsObject = data.reduce((accumulator, item) => {
    if (accumulator[item]){
      ++accumulator[item];
    } else{
      accumulator[item] = 1;
    }
    return accumulator;
  }, {})

  return itemsObject;
}

function getCoins(total_coins){
  //Get the number of coins as an object
  let denom = countInArray(total_coins);
  
  //Update each coin field of the document depending on the object
  let tot_quarters = document.getElementById("quarters");
  let quarters_amount = 0;
  if(typeof denom["25"] != 'undefined'){
    tot_quarters.innerText = denom["25"];
    quarters_amount = denom["25"];
  }else{
    tot_quarters.innerText = "0";
  }

  let tot_dimes = document.getElementById("dimes");
  let dimes_amount = 0;
  if(typeof denom["10"] != 'undefined'){
    tot_dimes.innerText = denom["10"];
    dimes_amount = denom["10"];
  }else{
    tot_dimes.innerText = "0";
  }

  let tot_nickels = document.getElementById("nickels");
  let nickels_amount = 0;
  if(typeof denom["5"] != 'undefined'){
    tot_nickels.innerText = denom["5"];
    nickels_amount = denom["5"];
  }else{
    tot_nickels.innerText = "0";
  }

  let tot_pennies = document.getElementById("pennies");
  let pennies_amount = 0;
  if(typeof denom["1"] != 'undefined'){
    tot_pennies.innerText = denom["1"];
    pennies_amount = denom["1"];
  }else{
    tot_pennies.innerText = "0";
  }

  //update the total coint field from the document
  let tot_coins = document.getElementById("total_coins");
  tot_coins.innerText = quarters_amount + dimes_amount + nickels_amount + pennies_amount;
}

//variable to get the form from the HTML document
const currencyForm = document.querySelector('form'); 

//Listen to the "submit" event of the form
currencyForm.addEventListener("submit", (e) => {
	//prevent the page from reloading
	e.preventDefault();

	//get the currency as a number
	let sended_currency = parseFloat(document.getElementById("currency_input").value);
  
  //send the currency x100 times to avoid
  // decimal aproximation
  findMinCoins(sended_currency*100);
});

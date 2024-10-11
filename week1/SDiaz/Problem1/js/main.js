document.getElementById('coinExchange').addEventListener('submit', function(e){
    e.preventDefault();

    const amount = parseFloat(document.getElementById('amount').value) * 100;

    if(isNaN(amount) || amount < 0) {
        alert("Enter a valid amount");
        return;
    }

    let remainingAmount = Math.round(amount);

    const quarters = Math.floor(remainingAmount / 25);
    remainingAmount %= 25;

    const dimes = Math.floor(remainingAmount / 10);
    remainingAmount %= 10;

    const nickels = Math.floor(remainingAmount / 5);
    remainingAmount %= 5;

    const pennies = remainingAmount;

    const totalCoins = quarters + dimes + nickels + pennies;

    document.getElementById('result').innerHTML = `
    <p> Quarters (25¢): <strong>${quarters}</strong></p>
    <p> Dimes (10¢): <strong>${dimes}</strong></p>
    <p> Nickels (5¢): <strong>${nickels}</strong></p>
    <p> Pennies (1¢): <strong>${pennies}</strong></p>
    <p> <strong> Total: ${totalCoins} coins </strong></p>
    `;
});
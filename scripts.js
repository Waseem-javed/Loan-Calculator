// First we Listen click button
document.querySelector("#loan-form").addEventListener("submit",(e) => {
            
       
    setTimeout(() => {
			// loader show
			document.querySelector("#loader").classList.add("d-none");
			}, 3000);
    // loader show
    document.querySelector("#loader").classList.remove("d-none");
    
    setTimeout(calculateResult, 3000);
    

    e.preventDefault();
});

function calculateResult() {
    // get actuall data from user
    const loanAmount = document.getElementById('amount');
    const interest = document.getElementById("interest");
    const years = document.getElementById("years");
    // for result showing below variable declares
    const monthly_payment = document.getElementById("monthly-payment");
	const total_payment = document.getElementById("total-payment");
    const total_interest = document.getElementById("total-interest");
    

    // convert to float 
    const l_amount = parseFloat(loanAmount.value);
    const calc_interest = parseFloat(interest.value) / 100 / 12;
    const calc_payment = parseFloat(years.value) * 12;

    // compute monthly 
    const x = Math.pow(1 + calc_interest, calc_payment);
    const monthly = (l_amount * x * calc_interest) / (x - 1);

    if (isFinite(monthly)) {
        monthly_payment.value = monthly.toFixed(2);
        total_payment.value = (
            monthly * calc_payment
        ).toFixed(2);
        total_interest.value = (
            monthly * calc_payment -
            l_amount
        ).toFixed(2);

        // hide result show
        document
            .querySelector("#result")
            .classList.remove("d-none");

        // loader show
        document
            .querySelector("#loader")
            .classList.add("d-none");
    }
    else {
        showError('Please check your Fields');
    }

    
    function showError(error) {
        // when nothing in fields then result should be not display
        document.querySelector("#result").classList.add("d-none");

        // create div
        const div = document.createElement("div");
        // get element
        const card = document.querySelector('.card');
        const heading = document.querySelector('.heading');
        // add classes to div
        div.className ="alert alert-danger";
        // add text to div as textnode
        div.appendChild(document.createTextNode(error));
        // then add div to before card
        card.insertBefore(div, heading);
        
        // clear after 3 second
        setTimeout(clearError,1000);
    }

    // clear error function
    function clearError() {
        document.querySelector('.alert').remove();
    }
}
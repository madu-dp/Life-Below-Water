document.getElementById('paymentForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    // Check if all required fields are filled out
    var form = document.getElementById('paymentForm');
    if (form.checkValidity()) {
        alert('Your order is successfully placed!');
    } else {
        alert('Please fill out all required fields.');
    }
});
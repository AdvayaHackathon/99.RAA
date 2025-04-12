document.addEventListener('DOMContentLoaded', () => {
    const pollForm = document.getElementById('satisfaction-poll');
    const confirmationMessage = document.getElementById('confirmation-message');

    pollForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevent the default form submission

        // Basic validation check (at least one satisfaction option must be selected)
        const satisfactionSelected = pollForm.querySelector('input[name="satisfaction"]:checked');
        const recommendSelected = pollForm.querySelector('input[name="recommend"]:checked');

        if (!satisfactionSelected || !recommendSelected) {
            // Although 'required' attribute handles this, adding JS check as fallback/example
            alert('Please answer all required questions.');
            return;
        }

        // --- In a real application, you would send data to a server here ---
        // Example:
        // const formData = new FormData(pollForm);
        // fetch('/api/submit-poll', {
        //     method: 'POST',
        //     body: formData
        // })
        // .then(response => response.json())
        // .then(data => {
        //     console.log('Success:', data);
        //     // Display confirmation
        // })
        // .catch((error) => {
        //     console.error('Error:', error);
        //     // Handle error
        // });
        // --- End of server submission example ---

        // For this example, just show a confirmation message
        displayConfirmation();

        // Optional: Disable the form after submission
        disableForm();
    });

    function displayConfirmation() {
        confirmationMessage.textContent = 'Thank you for your valuable feedback!';
        confirmationMessage.style.display = 'block'; // Make it visible
        // Scroll to the confirmation message if needed
        confirmationMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    function disableForm() {
        // Disable all form elements
        const elements = pollForm.elements;
        for (let i = 0; i < elements.length; i++) {
            elements[i].disabled = true;
        }
        // Optionally hide the submit button or change its text
         const submitButton = pollForm.querySelector('button[type="submit"]');
         if (submitButton) {
             submitButton.textContent = 'Submitted';
         }
    }
});
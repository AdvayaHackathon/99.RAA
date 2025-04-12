// Simple script, perhaps for future interactivity or to confirm JS loading.
document.addEventListener('DOMContentLoaded', () => {
    console.log("General Medicine page loaded.");

    // Example: Add smooth scrolling if needed later
    // document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    //     anchor.addEventListener('click', function (e) {
    //         e.preventDefault();
    //         document.querySelector(this.getAttribute('href')).scrollIntoView({
    //             behavior: 'smooth'
    //         });
    //     });
    // });

    const icon = document.querySelector('.medical-icon');
    if (icon) {
        icon.addEventListener('mouseover', () => {
            // Could add more complex interaction here if desired
        });
         icon.addEventListener('mouseout', () => {
            // Reset interaction
        });
    }
});
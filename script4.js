document.addEventListener('DOMContentLoaded', () => {
    const appointmentList = document.getElementById('appointment-list');
    const detailsContent = document.getElementById('details-content');
    const currentTimeDisplay = document.getElementById('current-time');
    const yearDisplay = document.getElementById('year');

    // --- Mock Patient Data ---
    // In a real application, this would come from a database/API
    const patientData = {
        p001: {
            name: "John Doe",
            age: 45,
            gender: "Male",
            lastVisit: "2023-10-15",
            reason: "Annual Checkup",
            notes: "Generally healthy. Discussed diet and exercise.",
            contact: "555-1234"
        },
        p002: {
            name: "Jane Smith",
            age: 32,
            gender: "Female",
            lastVisit: "2024-01-20",
            reason: "Flu symptoms",
            notes: "Prescribed Tamiflu. Follow up if symptoms worsen.",
            contact: "555-5678"
        },
        p003: {
            name: "Robert Johnson",
            age: 68,
            gender: "Male",
            lastVisit: "2023-12-01",
            reason: "Blood pressure check",
            notes: "BP slightly elevated. Advised lifestyle changes. Recheck in 3 months.",
            contact: "555-8765"
        },
        p004: {
            name: "Emily Davis",
            age: 29,
            gender: "Female",
            lastVisit: "2024-02-10",
            reason: "Consultation for allergies",
            notes: "Seasonal allergies confirmed. Recommended antihistamines.",
            contact: "555-4321"
        }
    };

    // --- Function to Display Patient Details ---
    function displayPatientDetails(patientId) {
        const patient = patientData[patientId];
        if (patient) {
            detailsContent.innerHTML = `
                <h3>${patient.name}</h3>
                <ul>
                    <li><strong>Age:</strong> ${patient.age}</li>
                    <li><strong>Gender:</strong> ${patient.gender}</li>
                    <li><strong>Contact:</strong> ${patient.contact}</li>
                    <li><strong>Reason for Visit:</strong> ${patient.reason}</li>
                    <li><strong>Last Visit:</strong> ${patient.lastVisit}</li>
                    <li><strong>Notes:</strong> ${patient.notes}</li>
                </ul>
            `;
        } else {
            detailsContent.innerHTML = '<p>Patient data not found.</p>';
        }
    }

    // --- Event Listener for Appointment List ---
    appointmentList.addEventListener('click', (event) => {
        // Check if a 'View Details' button was clicked
        if (event.target.classList.contains('details-btn')) {
            const patientId = event.target.getAttribute('data-patient-id');
            if (patientId) {
                displayPatientDetails(patientId);

                 // Optional: Highlight selected appointment
                document.querySelectorAll('#appointment-list li').forEach(li => li.style.backgroundColor = ''); // Reset background
                event.target.closest('li').style.backgroundColor = '#eaf2fa'; // Highlight
            }
        }
    });

    // --- Update Current Time ---
    function updateTime() {
        const now = new Date();
        currentTimeDisplay.textContent = `Current Time: ${now.toLocaleTimeString()}`;

    }
    updateTime(); // Initial call
    setInterval(updateTime, 1000); // Update every second

    // --- Set Current Year in Footer ---
    yearDisplay.textContent = new Date().getFullYear();

});
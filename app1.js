document.addEventListener("DOMContentLoaded", () => {
    const app = document.getElementById("app");

    // Simulating fetching data from an API
    const userData = {
        name: "Ankur Kumar",
        title: "MBBS, Intern",
        about: "Passionate about improving healthcare access in rural areas, providing community education and on-ground support.",
        achievements: [
            "Served 500+ patients in remote villages",
            "Organized free health camps in 12 districts",
            "Trained 30+ local health workers"
        ]
    };

    // Optional dynamic loading
    app.innerHTML = `
        <div class="profile-header">
            <a href="profile-details.html">
                <img src="p2.jpg" alt="Your Profile" class="profile-avatar" />
            </a>
            <div class="profile-info">
                <h1>${userData.name}</h1>
                <p>${userData.title}</p>
            </div>
        </div>

        <div class="profile-section">
            <h2>About</h2>
            <p>${userData.about}</p>
        </div>

        <div class="profile-section">
            <h2>Achievements</h2>
            <ul>
                ${userData.achievements.map(item => `<li>${item}</li>`).join('')}
            </ul>
        </div>
    `;
});

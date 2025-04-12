document.addEventListener("DOMContentLoaded", function () {
    const mainContent = document.getElementById("main-content");
  
    const getByText = (text) =>
      [...document.querySelectorAll(".nav-item")].find(
        el => el.innerText.includes(text)
      );
  
    getByText("Network").addEventListener("click", showNetwork);
    getByText("Health").addEventListener("click", showHealth);
    getByText("Notifications").addEventListener("click", showNotifications);
  
    function showNetwork() {
      const doctors = [
        {
          name: "Dr. Ayesha Khan",
          specialty: "Cardiologist",
          hospital: "Apollo Hospitals",
          posts: ["Stay heart-healthy!", "World Heart Day tips"],
        },
        {
          name: "Dr. Rajeev Sharma",
          specialty: "Orthopedic",
          hospital: "Fortis Hospital",
          posts: ["Stretch daily!", "Bone health matters"],
        }
      ];
  
      let html = `<h2>Doctor Suggestions</h2><div class="doctor-list">`;
      doctors.forEach((doc, index) => {
        html += `
          <div class="doctor-card" onclick="viewDoctor(${index})">
            <strong>${doc.name}</strong> - ${doc.specialty} <br />
            <small>${doc.hospital}</small>
            <button onclick="event.stopPropagation(); followDoctor('${doc.name}')">Follow</button>
          </div>
        `;
      });
      html += `</div>`;
  
      mainContent.innerHTML = html;
  
      window.viewDoctor = function (index) {
        const doc = doctors[index];
        mainContent.innerHTML = `
          <h2>${doc.name}</h2>
          <p>Specialty: ${doc.specialty}</p>
          <p>Hospital: ${doc.hospital}</p>
          <h3>Posts</h3>
          <ul>${doc.posts.map(p => `<li>${p} <button onclick="likePost('${p}')">Like</button></li>`).join('')}</ul>
        `;
      }
    }
  
    window.followDoctor = function(name) {
      alert(`You followed ${name}`);
    }
  
    window.likePost = function(post) {
      alert(`You liked the post: "${post}"`);
    }
  
    function showHealth() {
      const patients = [
        {
          name: "Ravi Kumar",
          condition: "Diabetes",
          suggestions: ["Monitor blood sugar", "Take insulin"],
        },
        {
          name: "Sita Verma",
          condition: "Hypertension",
          suggestions: ["Reduce salt", "Exercise regularly"],
        }
      ];
  
      let html = `<h2>Patient Records</h2>`;
      patients.forEach(patient => {
        html += `
          <div class="patient-card">
            <strong>${patient.name}</strong> - ${patient.condition}
            <ul>${patient.suggestions.map(s => `<li>${s}</li>`).join('')}</ul>
          </div>
        `;
      });
  
      mainContent.innerHTML = html;
    }
  
    function showNotifications() {
      const notifications = [
        "Dr. Ayesha liked your post.",
        "You have a new message from Dr. Sharma.",
        "New post by MedLife News."
      ];
  
      let html = `<h2>Notifications</h2><ul>`;
      notifications.forEach(note => {
        html += `<li>${note}</li>`;
      });
      html += `</ul>`;
  
      mainContent.innerHTML = html;
    }
  });
  
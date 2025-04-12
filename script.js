// Get elements
const loginForm = document.getElementById('loginForm');
const signupForm = document.getElementById('signupForm');
const loginToggle = document.getElementById('loginToggle');
const signupToggle = document.getElementById('signupToggle');

// Switch between Login and Signup
loginToggle.addEventListener('click', () => {
  loginForm.classList.remove('hidden');
  signupForm.classList.add('hidden');
  loginToggle.classList.add('active');
  signupToggle.classList.remove('active');
});

signupToggle.addEventListener('click', () => {
  signupForm.classList.remove('hidden');
  loginForm.classList.add('hidden');
  signupToggle.classList.add('active');
  loginToggle.classList.remove('active');
});

// Simulate Login
loginForm.addEventListener('submit', function (e) {
  e.preventDefault();
  const email = loginForm.querySelector('input[type="email"]').value;
  const password = loginForm.querySelector('input[type="password"]').value;

  // Simulated login validation (replace with backend call)
  if (email && password) {
    alert('Login successful!');
    window.location.href = 'dashboard.html';
  } else {
    alert('Please fill in all fields');
  }
});

// Simulate Signup
signupForm.addEventListener('submit', function (e) {
  e.preventDefault();
  const name = signupForm.querySelector('input[type="text"]').value;
  const email = signupForm.querySelector('input[type="email"]').value;
  const password = signupForm.querySelector('input[type="password"]').value;

  if (name && email && password) {
    alert('Signup successful! You can now log in.');
    // Switch to login form after signup
    loginForm.classList.remove('hidden');
    signupForm.classList.add('hidden');
    loginToggle.classList.add('active');
    signupToggle.classList.remove('active');
  } else {
    alert('Please fill in all fields');
  }
});

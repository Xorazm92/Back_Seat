document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById("login-form");
    const signUpForm = document.getElementById("signUpForm");
    
    if (signUpForm) {
        signUpForm.addEventListener("submit", async (e) => {
            e.preventDefault();
            const username = document.getElementById("username").value;
            const password = document.getElementById("password").value;
            const confirmPassword = document.getElementById("confirmPassword").value;
            const email = document.getElementById("email").value;

            if (password !== confirmPassword) {
                alert("Passwords do not match.");
                return;
            }

            try {
                const response = await fetch('http://127.0.0.1:5001/api/sign_up', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ username, password, email }),
                });

                if (response.ok) {
                    const data = await response.json();
                    alert(data.message);
                    window.location.href = '/Game/game.html';
                } else {
                    const errorData = await response.json();
                    alert(errorData.error);
                }
            } catch (error) {
                alert('An error occurred while signing up.');
                console.error(error);
            }
        });
    }

    if (loginForm) {
        loginForm.addEventListener("submit", async (e) => {
            e.preventDefault();
            const username = document.getElementById("username").value;
            const password = document.getElementById("password").value;

            try {
                const response = await fetch('http://127.0.0.1:5001/api/sign_in', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ username, password }),
                });

                if (response.ok) {
                    const data = await response.json();
                    alert(data.message);
                    window.location.href = '/Game/game.html';
                } else {
                    const errorData = await response.json();
                    alert(errorData.error);
                }
            } catch (error) {
                alert('An error occurred while signing in.');
                console.error(error);
            }
        });
    }
});




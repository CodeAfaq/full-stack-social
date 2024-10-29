document.getElementById('login-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    try {
        const response = await fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        const result = await response.json();
        alert(result.message);
        if (response.ok) {
            localStorage.setItem('token', result.token); // Store the token
            window.location.href = 'timeline.html'; // Redirect to timeline
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Login failed!');
    }
});

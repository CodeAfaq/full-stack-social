document.getElementById('signup-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    try {
        const response = await fetch('/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        const result = await response.json();
        alert(result.message);
        if (response.ok) {
            window.location.href = 'login.html'; // Redirect to login page
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Signup failed!');
    }
});

document.getElementById('post-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    const token = localStorage.getItem('token');

    try {
        const response = await fetch('/post', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`, // Include token for authentication
            },
            body: JSON.stringify(data),
        });

        const result = await response.json();
        alert(result.message);
        if (response.ok) {
            window.location.href = 'timeline.html'; // Redirect to timeline
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Failed to create post!');
    }
});

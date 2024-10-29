document.addEventListener("DOMContentLoaded", async () => {
    const postsContainer = document.getElementById('posts-container');
    const token = localStorage.getItem('token');

    try {
        const response = await fetch('/timeline/posts', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`, // Include token for authentication
            },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch posts');
        }

        const posts = await response.json();

        posts.forEach(post => {
            const postDiv = document.createElement('div');
            postDiv.className = 'post';
            postDiv.innerHTML = `
                <h2>${post.title}</h2>
                <p>${post.content}</p>
                <p><strong>Posted by:</strong> ${post.userID.username} (${post.userID.fullName})</p>
            `;
            postsContainer.appendChild(postDiv);
        });
    } catch (error) {
        console.error(error);
        postsContainer.innerHTML = '<p>Error loading posts.</p>';
    }
});

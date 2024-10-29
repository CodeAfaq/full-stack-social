async function signup() {
    const fullName = document.getElementById('fullName').value;
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const response = await fetch('/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fullName, username, email, password })
    });

    const data = await response.json();
    alert(data.message);
    if (data.message === "User Created Successfully!!") {
        window.location.href = "login.html";
    }
}

async function login() {
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    const response = await fetch('/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    });

    const data = await response.json();
    alert(data.message);
    if (data.message === "login successfull") {
        window.location.href = "post.html";
    }
}

async function createPost() {
    const title = document.getElementById('postTitle').value;
    const content = document.getElementById('postContent').value;

    const response = await fetch('/post', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + getCookie('token')
        },
        body: JSON.stringify({ title, content })
    });

    const data = await response.json();
    alert(data.message);
    if (data.message === "Post Created Successfully!") {
        window.location.href = "timeline.html";
    }
}

async function loadPosts() {
    const response = await fetch('/timeline/posts', {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + getCookie('token')
        }
    });
    const posts = await response.json();
    const postsContainer = document.getElementById('posts');
    postsContainer.innerHTML = '';
    posts.forEach(post => {
        const postDiv = document.createElement('div');
        postDiv.innerHTML = `<h3>${post.title}</h3><p>${post.content}</p>`;
        postsContainer.appendChild(postDiv);
    });
}


if (document.title === "Timeline") {
    loadPosts();
}

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

const apiUrl = 'http://localhost:3000/users';

// Ambil semua user dan tampilkan
async function loadUsers() {
    const res = await fetch(apiUrl);
    const users = await res.json();

    const list = document.getElementById('user-list');
    list.innerHTML = '';

    users.forEach(user => {
        const li = document.createElement('li');
        li.innerHTML = `
            <strong>${user.name}</strong> (${user.email})
            <button onclick="editUser(${user.id}, '${user.name}', '${user.email}')">Edit</button>
            <button onclick="deleteUser(${user.id})">Delete</button>
        `;
        list.appendChild(li);
    });
}

// Tambah user baru
async function addUser() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;

    await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email })
    });

    document.getElementById('name').value = '';
    document.getElementById('email').value = '';
    loadUsers();
}

// Hapus user
async function deleteUser(id) {
    await fetch(`${apiUrl}/${id}`, { method: 'DELETE' });
    loadUsers();
}

// Edit user (update)
async function editUser(id, oldName, oldEmail) {
    const name = prompt('Nama baru:', oldName);
    const email = prompt('Email baru:', oldEmail);

    if (name && email) {
        await fetch(`${apiUrl}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email })
        });
        loadUsers();
    }
}

// Jalankan saat pertama kali
window.onload = loadUsers;

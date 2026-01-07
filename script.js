const form = document.getElementById('contact-form');
const nameInput = document.getElementById('name');
const phoneInput = document.getElementById('phone');
const tableBody = document.querySelector('#contacts-table tbody');
const clearBtn = document.getElementById('clear-btn');

const STORAGE_KEY = 'contacts_v1';

function loadContacts() {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return [];
        return JSON.parse(raw);
    } catch (e) {
        console.error('Erro ao carregar contatos', e);
        return [];
    }
}

function saveContacts(list) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
}

function render() {
    const contacts = loadContacts();
    tableBody.innerHTML = '';
    contacts.forEach((c, idx) => {
        const tr = document.createElement('tr');
        const tdName = document.createElement('td');
        tdName.textContent = c.name;
        const tdPhone = document.createElement('td');
        tdPhone.textContent = c.phone;
        const tdActions = document.createElement('td');

        const del = document.createElement('button');
        del.className = 'action-btn delete';
        del.textContent = 'Excluir';
        del.addEventListener('click', () => {
            removeContact(idx);
        });

        tdActions.appendChild(del);

        tr.appendChild(tdName);
        tr.appendChild(tdPhone);
        tr.appendChild(tdActions);

        tableBody.appendChild(tr);
    });
}

function addContact(name, phone) {
    const contacts = loadContacts();
    contacts.push({ name, phone });
    saveContacts(contacts);
    render();
}

function removeContact(index) {
    const contacts = loadContacts();
    contacts.splice(index, 1);
    saveContacts(contacts);
    render();
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = nameInput.value.trim();
    const phone = phoneInput.value.trim();
    if (!name || !phone) return;
    addContact(name, phone);
    form.reset();
    nameInput.focus();
});

clearBtn.addEventListener('click', () => {
    if (!confirm('Deseja realmente limpar todos os contatos?')) return;
    saveContacts([]);
    render();
});

// initial
render();
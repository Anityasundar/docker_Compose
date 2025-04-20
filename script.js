document.getElementById('guestForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const name = document.getElementById('name').value;
  const message = document.getElementById('message').value;

  await fetch('/api/guest', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, message })
  });

  document.getElementById('guestForm').reset();
  loadMessages();
});

async function loadMessages() {
  const res = await fetch('/api/guest');
  const messages = await res.json();
  const ul = document.getElementById('messages');
  ul.innerHTML = '';
  messages.forEach(msg => {
    const li = document.createElement('li');
    li.textContent = `${msg.name}: ${msg.message}`;
    ul.appendChild(li);
  });
}

loadMessages();

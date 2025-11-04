// Popup script - uses chrome.scripting to inject a file or run a custom snippet

document.getElementById('inject-sample').addEventListener('click', async () => {
  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (!tab) return alert('No active tab found');

    await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: ['inject.js']
    });
  } catch (err) {
    console.error('Injection error', err);
    alert('Injection failed: ' + err.message);
  }
});

document.getElementById('inject-custom').addEventListener('click', async () => {
  const code = document.getElementById('custom').value || '';
  if (!code.trim()) return alert('Enter a script to run');

  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (!tab) return alert('No active tab found');

    // Pass the user code as an argument to a small wrapper function that evaluates it
    await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: (userCode) => { /* runs in page context */
        try {
          // eslint-disable-next-line no-eval
          eval(userCode);
        } catch (e) {
          // expose errors to page console so developers can inspect
          console.error('Error in injected code:', e);
          throw e;
        }
      },
      args: [code]
    });
  } catch (err) {
    console.error('Custom injection error', err);
    alert('Custom injection failed: ' + err.message);
  }
});

// Sample injected script (safe, visible effect for testing)
(function(){
  try {
    document.body.style.outline = '6px dashed red';
    console.log('Script Injector: injected at', new Date().toISOString());
    // show a non-blocking page notification if supported
    if (typeof window !== 'undefined') {
      const el = document.createElement('div');
      el.textContent = 'Script Injector: sample script ran';
      el.style.position = 'fixed';
      el.style.right = '12px';
      el.style.bottom = '12px';
      el.style.padding = '8px 10px';
      el.style.background = 'rgba(0,0,0,0.7)';
      el.style.color = 'white';
      el.style.borderRadius = '6px';
      el.style.zIndex = 2147483647;
      document.documentElement.appendChild(el);
      setTimeout(() => el.remove(), 3000);
    }
  } catch (e) {
    console.error('inject.js error', e);
  }
})();

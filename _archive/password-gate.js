/* ChromeWorkx — lightweight staging gate. Not real security, just keeps the
   site off public view before launch. Password lives in this file. */
(function () {
  var STORAGE_KEY = 'chromeworkx_gate_ok';
  var PASSWORD = '7357';

  if (sessionStorage.getItem(STORAGE_KEY) === '1') return;

  var style = document.createElement('style');
  style.textContent =
    '#pg-overlay{position:fixed;inset:0;z-index:999999;background:#0a0a0a;' +
    'display:flex;align-items:center;justify-content:center;padding:20px;' +
    "font-family:'Inter',Arial,sans-serif;}" +
    '#pg-overlay .pg-box{background:#141414;border:1px solid #262626;border-radius:18px;' +
    'padding:40px 36px;max-width:360px;width:100%;text-align:center;' +
    'box-shadow:0 24px 60px rgba(0,0,0,.5);}' +
    "#pg-overlay h2{font-family:'Playfair Display',Georgia,serif;font-weight:800;font-size:1.3rem;" +
    'color:#fff;margin:0 0 8px;letter-spacing:-.5px;}' +
    '#pg-overlay .pg-mark span{color:#e3c15c}' +
    '#pg-overlay p{font-size:.85rem;color:#a3a3a3;margin:0 0 22px;line-height:1.6;}' +
    '#pg-overlay input{width:100%;box-sizing:border-box;padding:12px 14px;border-radius:10px;' +
    'border:1px solid #3a3a3a;background:#101010;color:#fff;font-size:.95rem;margin-bottom:14px;' +
    'outline:none;transition:border-color .2s;font-family:inherit;}' +
    '#pg-overlay input:focus{border-color:#e3c15c;}' +
    "#pg-overlay button{width:100%;padding:12px;border-radius:10px;border:none;background:#c9a227;" +
    "color:#0a0a0a;font-family:'Playfair Display',Georgia,serif;font-weight:700;font-size:.9rem;" +
    'cursor:pointer;transition:background .2s;}' +
    '#pg-overlay button:hover{background:#e3c15c;}' +
    '#pg-overlay .pg-error{color:#c0574f;font-size:.8rem;margin-top:10px;min-height:16px;}';
  document.head.appendChild(style);

  var overlay = document.createElement('div');
  overlay.id = 'pg-overlay';
  overlay.innerHTML =
    '<div class="pg-box">' +
      '<h2 class="pg-mark">Chrome<span>Workx</span></h2>' +
      '<p>Enter the access code to continue.</p>' +
      '<form id="pg-form" autocomplete="off">' +
        '<input type="password" id="pg-pass" placeholder="Password" autofocus autocapitalize="off" autocorrect="off">' +
        '<button type="submit">Continue</button>' +
        '<div class="pg-error" id="pg-error"></div>' +
      '</form>' +
    '</div>';

  document.body.appendChild(overlay);
  document.body.style.overflow = 'hidden';

  document.getElementById('pg-form').addEventListener('submit', function (e) {
    e.preventDefault();
    var input = document.getElementById('pg-pass');
    var err = document.getElementById('pg-error');
    if (input.value === PASSWORD) {
      sessionStorage.setItem(STORAGE_KEY, '1');
      overlay.remove();
      style.remove();
      document.body.style.overflow = '';
    } else {
      err.textContent = 'Incorrect password. Try again.';
      input.value = '';
      input.focus();
    }
  });
})();

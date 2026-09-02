/* 735 Auto — lightweight staging gate. Not real security, just keeps the
   site off public view before launch. Password lives in this file. */
(function () {
  var STORAGE_KEY = '735auto_gate_ok';
  var PASSWORD = 'Laafstyl7357';

  if (sessionStorage.getItem(STORAGE_KEY) === '1') return;

  var style = document.createElement('style');
  style.textContent =
    '#pg-overlay{position:fixed;inset:0;z-index:999999;background:#0f0f0f;' +
    'display:flex;align-items:center;justify-content:center;padding:20px;' +
    "font-family:'Inter',Arial,sans-serif;}" +
    '#pg-overlay .pg-box{background:#1c1c1c;border:1px solid #2a2a2a;border-radius:18px;' +
    'padding:40px 36px;max-width:360px;width:100%;text-align:center;' +
    'box-shadow:0 24px 60px rgba(0,0,0,.5);}' +
    "#pg-overlay h2{font-family:'Poppins',Arial,sans-serif;font-weight:800;font-size:1.3rem;" +
    'color:#fff;margin:0 0 8px;letter-spacing:-.5px;}' +
    '#pg-overlay .pg-mark span{color:#00a85f}' +
    '#pg-overlay p{font-size:.85rem;color:#888;margin:0 0 22px;line-height:1.6;}' +
    '#pg-overlay input{width:100%;box-sizing:border-box;padding:12px 14px;border-radius:10px;' +
    'border:1px solid #333;background:#161616;color:#fff;font-size:.95rem;margin-bottom:14px;' +
    'outline:none;transition:border-color .2s;font-family:inherit;}' +
    '#pg-overlay input:focus{border-color:#00a85f;}' +
    "#pg-overlay button{width:100%;padding:12px;border-radius:10px;border:none;background:#007847;" +
    "color:#fff;font-family:'Poppins',Arial,sans-serif;font-weight:700;font-size:.9rem;" +
    'cursor:pointer;transition:background .2s;}' +
    '#pg-overlay button:hover{background:#00a85f;}' +
    '#pg-overlay .pg-error{color:#DE3831;font-size:.8rem;margin-top:10px;min-height:16px;}';
  document.head.appendChild(style);

  var overlay = document.createElement('div');
  overlay.id = 'pg-overlay';
  overlay.innerHTML =
    '<div class="pg-box">' +
      '<h2 class="pg-mark">7<span>3</span>5 Auto</h2>' +
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

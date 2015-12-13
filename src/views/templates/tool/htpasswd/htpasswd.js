(function() {
    'use strict';

    let htpasswd = require('./process');

    let pass = document.getElementById('pass');
    let enc = document.getElementById('pass-enc');

    document.getElementById('pass-form').addEventListener('submit', encrypt);
    pass.addEventListener('blur', encrypt);

    function encrypt(e) {
        e.preventDefault();

        enc.value = htpasswd(pass.value);
        enc.focus();
        enc.select();
    }
}());

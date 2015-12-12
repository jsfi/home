'use strict';

let md5 = require('./md5');

let itoa64 = Array.from('./0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz');

function stringToArray(s) {
    return Array.from(s).map(char => char.charCodeAt());
}

function ap_to64(v, n) {
    let s = '';

    while (--n >= 0) {
        s += itoa64[v&0x3f];
        v >>>= 6;
    }

    return s;
}

function process(password) {
    let salt = ap_to64(Math.floor(Math.random()*16777215), 4) + ap_to64(Math.floor(Math.random()*16777215), 4);
    let msg = password + '$apr1$' + salt;
    let temp = md5.rstr(password + salt + password);

    for (let pl = password.length; pl > 0; pl -= 16) {
        msg += temp.substr(0, (pl > 16) ? 16 : pl);
    }

    for (let i = password.length; i != 0; i >>= 1) {
        if (i & 1) {
            msg += String.fromCharCode(0);
        } else {
            msg += password.charAt(0);
        }
    }

    temp = md5.rstr(msg);

    let msg2;
    for (let i = 0; i < 1000; i ++) {
        msg2 = '';

        if (i & 1) {
            msg2 += password;
        } else {
            msg2 += temp.substr(0, 16);
        }

        if (i % 3) {
            msg2 += salt;
        }

        if (i % 7) {
            msg2 += password;
        }
        if (i & 1) {
            msg2 += temp.substr(0, 16);
        } else {
            msg2 += password;
        }

        temp = md5.rstr(msg2);
    }

    temp = stringToArray(temp);

    return `$apr1$${salt}$${ap_to64((temp[ 0]<<16) | (temp[ 6]<<8) | temp[12], 4)}${ap_to64((temp[ 1]<<16) | (temp[ 7]<<8) | temp[13], 4)}${ap_to64((temp[ 2]<<16) | (temp[ 8]<<8) | temp[14], 4)}${ap_to64((temp[ 3]<<16) | (temp[ 9]<<8) | temp[15], 4)}${ap_to64((temp[ 4]<<16) | (temp[10]<<8) | temp[ 5], 4)}${ap_to64(temp[11], 2)}`;
}

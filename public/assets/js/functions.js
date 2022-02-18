'use strict';

const display_notifications = (messages, type, selector) => {
    let html = '';
    type = type == 'error' ? 'danger' : type;

    for(let message of messages) {

        html += `
            <div class="alert alert-${type} ward-animate ward-animate-fill-both ward-animate-fade-in">
                <button type="button" class="close" data-dismiss="alert">&times;</button>
                ${message}
            </div>`;

    }

    selector.innerHTML = html;
};

let build_url_query = data => {
    if (typeof (data) === 'string') return data;

    let query = [];
    for (let key in data) {
        if (data.hasOwnProperty(key)) {
            query.push(encodeURIComponent(key) + '=' + encodeURIComponent(data[key]));
        }
    }

    return query.join('&');
};

let build_form_data = data => {
    let form_data = new FormData();

    for(let key in data) {
        form_data.append(key, data[key]);
    }

    return form_data
}

const redirect = (path, is_full_url = false) => {
    window.location.href = is_full_url ? path : `${url}${path}`;
};

const number_format = (number, decimals, dec_point = '.', thousands_point = ',') => {

    if (number == null || !isFinite(number)) {
        throw new TypeError('number is not valid');
    }

    if(!decimals) {
        let len = number.toString().split('.').length;
        decimals = len > 1 ? len : 0;
    }

    number = parseFloat(number).toFixed(decimals);

    number = number.replace('.', dec_point);

    let splitNum = number.split(dec_point);
    splitNum[0] = splitNum[0].replace(/\B(?=(\d{3})+(?!\d))/g, thousands_point);
    number = splitNum.join(dec_point);

    return number;
};

const nr = (number, decimals = 0) => {
    return number_format(number, decimals, decimal_point, thousands_separator);
};

const get_cookie = name => {
    let v = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');

    return v ? v[2] : null;
};

const set_cookie = (name, value, days, path) => {
    let d = new Date;
    d.setTime(d.getTime() + 24*60*60*1000*days);

    document.cookie = `${name}=${value};path=${path};expires=${d.toGMTString()}`;
};

let delete_cookie = (name, path) => {
    set_cookie(name, '', -1, path);
};

const get_slug = (string, delimiter = '-', lowercase = true) => {
    let regex = new RegExp(`[^a-zA-Z0-9.-\\u{1f300}-\\u{1f5ff}\\u{1f900}-\\u{1f9ff}\\u{1f600}-\\u{1f64f}\\u{1f680}-\\u{1f6ff}\\u{2600}-\\u{26ff}\\u{2700}-\\u{27bf}\\u{1f1e6}-\\u{1f1ff}\\u{1f191}-\\u{1f251}\\u{1f004}\\u{1f0cf}\\u{1f170}-\\u{1f171}\\u{1f17e}-\\u{1f17f}\\u{1f18e}\\u{3030}\\u{2b50}\\u{2b55}\\u{2934}-\\u{2935}\\u{2b05}-\\u{2b07}\\u{2b1b}-\\u{2b1c}\\u{3297}\\u{3299}\\u{303d}\\u{00a9}\\u{00ae}\\u{2122}\\u{23f3}\\u{24c2}\\u{23e9}-\\u{23ef}\\u{25b6}\\u{23f8}-\\u{23fa}]+`, 'ug');
    string = string.replace(regex, delimiter);

    regex = new RegExp(`${delimiter}+`, 'g');
    string = string.replace(regex, delimiter);

    string = string.trim();

    if(lowercase) {
        string.toLowerCase();
    }

    return string;
}

const update_this_value = (this_element, function_name) => {
    this_element.value = function_name(this_element.value);
}

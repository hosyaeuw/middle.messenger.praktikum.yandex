const Handlebars = require('handlebars');

Handlebars.registerHelper('ternary', function (cond, v1, v2) {
    return cond ? v1 : v2;
});

Handlebars.registerHelper('isEqual', function (v1, v2) {
    return v1 === v2;
});

Handlebars.registerHelper('valueOrDefault', function (value, defaultValue) {
    return value ?? defaultValue;
});

Handlebars.registerHelper('getUserFullName', function (user) {
    return `${user.first_name} ${user.second_name}`
})

Handlebars.registerHelper('getMessageTime', function (date) {
    return `${1} minute ago`;
})
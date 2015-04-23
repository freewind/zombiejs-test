requirejs.config({
    baseUrl: '/static/js',
    paths: {
        jquery: 'jquery-1.11.2',
        'slow-name': '/slow-name'
    }
});

requirejs(['jquery', 'slow-name'], function($, slowName) {
    console.log('Get all dependencies. slowName: ');
    console.dir(slowName);
    $('#slow-name').text(slowName.name);
});

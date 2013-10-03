basePath = '..';

files = [
    'js/external/angular.min.js',
    'js/external/underscore-min.js',
    'js/external/angular-*.js',
    JASMINE,
    JASMINE_ADAPTER,
    'tests/lib/angular-mocks.js',
    'js/app/*.js',
    'tests/unit/*.js'
];

autoWatch = true;

browsers = ['Chrome'];

proxies = {
    '/': 'http://localhost:8000/'
};

junitReporter = {
    outputFile: 'test/unit.xml',
    suite: 'unit'
};

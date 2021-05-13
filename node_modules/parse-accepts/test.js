var assert = require("assert");
var parseAccepts = require("./");
var parse = parseAccepts.parse;
var parseValue = parseAccepts.parseValue;

var accept = "text/html, application/xhtml+xml, application/xml;q=0.7, */*;q=0.8",
    acceptLang = "zh-CN, zh;q=0.8, en-US;q=0.5, en;q=0.3";

assert.deepStrictEqual(parse(accept), [
    { value: 'text/html', quality: 1 },
    { value: 'application/xhtml+xml', quality: 1 },
    { value: '*/*', quality: 0.8 },
    { value: 'application/xml', quality: 0.7 }
]);

assert.deepStrictEqual(parseValue(accept), [
    'text/html',
    'application/xhtml+xml',
    '*/*',
    'application/xml'
]);

assert.deepStrictEqual(parse(acceptLang), [
    { value: 'zh-CN', quality: 1 },
    { value: 'zh', quality: 0.8 },
    { value: 'en-US', quality: 0.5 },
    { value: 'en', quality: 0.3 }
]);

assert.deepStrictEqual(parseValue(acceptLang), ['zh-CN', 'zh', 'en-US', 'en']);

console.log("All tests passed!");
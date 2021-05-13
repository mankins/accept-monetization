# Parse-Accepts

**A tool to parse headers like Accept, Accept-Language, etc.**

## Install

```sh
npm install parse-accepts
```

## Example

```javascript
const { parse, parseValue } = require("parse-accepts");

var accept = "text/html, application/xhtml+xml, application/xml;q=0.7, */*;q=0.8",
    acceptLang = "zh-CN, zh;q=0.8, en-US;q=0.5, en;q=0.3";

console.log(parse(accept));
// [ { value: 'text/html', quality: 1 },
//   { value: 'application/xhtml+xml', quality: 1 },
//   { value: '*/*', quality: 0.8 },
//   { value: 'application/xml', quality: 0.7 } ]

console.log(parseValue(accept));
// [ 'text/html', 'application/xhtml+xml', '*/*', 'application/xml' ]

console.log(parse(acceptLang));
// [ { value: 'zh-CN', quality: 1 },
//   { value: 'zh', quality: 0.8 },
//   { value: 'en-US', quality: 0.5 },
//   { value: 'en', quality: 0.3 } ]

console.log(parseValue(acceptLang));
// [ 'zh-CN', 'zh', 'en-US', 'en' ]
```

**The sequence of the returning array will be ordered by their qualities.**
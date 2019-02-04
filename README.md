# Snappy

### Save and load object values / function scopes.

![version](https://img.shields.io/badge/dynamic/json.svg?label=version&url=https%3A%2F%2Fraw.githubusercontent.com%2Fsaranshgupta1995%2FSnappy%2Fmaster%2Fpackage.json&query=version&colorB=green&prefix=v&suffix=-updated) ![License](https://img.shields.io/badge/dynamic/json.svg?label=license&url=https%3A%2F%2Fraw.githubusercontent.com%2Fsaranshgupta1995%2FSnappy%2Fmaster%2Fpackage.json&query=license&colorB=orange)

### Installation
```shell
$ npm i --save @saransh184/snappy
```

### Include through cdn
```html
<script src="http://d2vcmd2ryq7iya.cloudfront.net/snappy-cdn.js">
```

### Example
```javascript
>> let a={
    x:1,
    y:[1,2,3]
}

>> takeSnap('firstSnap', a);

>> a.y=[4,5];

>> console.log(a);
>> {
    x:1,
    y:[4,5]
}

>> restoreSnap('firstSnap', a);

>> console.log(a);
>> {
    x:1,
    y:[1,2,3]
}

```
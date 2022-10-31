// exports web usable string country info from country jsons
// run: node countries2list.js
const data = require('./ctry_data.json')
const fs = require('fs');

var out = [];

for (country in data.names) {
    var name = data.names[country];
    var code = data.codes[country];
    out.push(`${name} (${country}/${code})`);
}

fs.writeFileSync('ctry_list.json', JSON.stringify(out));
console.log('Successfully extracted strings: ctry_data.json -> ctry_list.json.')
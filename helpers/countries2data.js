// exports web usable string country info from country jsons
// run: node countries2data.js
const data = require('./ctry_data.json')
const fs = require('fs');

var out = {};

for (country in data.names) {
    var name = data.names[country];
    var cont_code = data.continets[country];
    var cont = data.continet_names[cont_code];
    var code = data.codes[country];
    if (cont in out) {
        out[cont].items.push({label: `${name} (${country}/${code})`, value: `${country}`})
    }
    else {
        out[cont] = {
            items: [{label: `${name} (${country}/${code})`, value: `${code}`}]
        }
    }
}

fs.writeFileSync('ctry_strings.json', JSON.stringify(out));
console.log('Successfully extracted strings: ctry_data.json -> ctry_strings.json.')
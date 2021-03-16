//Dependencies
const fs = require('fs');
const replace = require('replace-in-file');

//Build our array of what we're finding
let find = {
    '{{CSS_STYLES}}' : `${__dirname}/../../build/css/eggy.css`,
    '{{CSS_THEME}}' : `${__dirname}/../../build/css/theme.css`,
    '{{CSS_PROGRESS_BAR}}' : `${__dirname}/../../build/css/progressbar.css`,
    '{{ICON_SUCCESS}}' : `${__dirname}/../../src/img/success.svg`,
    '{{ICON_WARNING}}' : `${__dirname}/../../src/img/warning.svg`,
    '{{ICON_INFO}}' : `${__dirname}/../../src/img/info.svg`,
    '{{ICON_ERROR}}' : `${__dirname}/../../src/img/error.svg`,
    '{{ICON_CLOSE}}' : `${__dirname}/../../src/img/close.svg`,
};

//Run our replacer
for(let [key, file] of Object.entries(find)){
    fs.readFile(file, 'utf8', async (err, data) => {
        //Run
        const results = await replace.sync({
            files: `${__dirname}/../../build/js/eggy.js`,
            from: key,
            to: data,
        });
    });
}

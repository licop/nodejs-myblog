const fs = require('fs');
const path = require('path');

function getFileContent(fileName) {
    return new Promise((resolve, reject) => {
        const fullFileName = path.resolve(__dirname, 'files', fileName);

        fs.readFile(fullFileName, (err, data) => {
            if(err) {
                reject(err)
            }
            resolve(console.log(JSON.parse(data.toString())))
        });
    }) 
    
}

// async function consoleData() {
//     await getFileContent('a.json')

//     await getFileContent('b.json')

//     await getFileContent('c.json')
// }

// consoleData();



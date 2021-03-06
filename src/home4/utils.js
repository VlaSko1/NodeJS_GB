const fs = require('fs');
const path = require('path');
const inquirer = require('inquirer');
const { Transform } = require('stream');
const { EOL } = require('os');


const isFile = (filepath) => {
    return fs.lstatSync(filepath).isFile();
}

const getFileNamesInDirectory = async (directory) => {

    const itemsInDirectory = await new Promise((resolve) => {
        fs.readdir(directory, (err, data) => {
            resolve(data);
        });
    });

    return itemsInDirectory;
}

const promptUser = async (choices) => {
    const optionKey = 'optionKey';

    const result = await inquirer.prompt([{
        name: optionKey,
        type: 'list',
        message: 'Please choose a catalog or a file to read',
        choices,
    }]);

    return result[optionKey];
}

const showFileContents = async (filepath, pattern) => {
    if (!pattern) {
        return new Promise((resolve) => {
            const stream = fs.createReadStream(filepath, 'utf-8');
            stream.on('end', resolve);
            stream.pipe(process.stdout);
        });
    } else {
        return new Promise((resolve) => {
            const readStream = fs.createReadStream(filepath, 'utf-8');

            const transformStream = new Transform({
                transform(chunk, encoding, callback) {
                    // Разбиваем чанк на массив
                    let arrMatch = chunk.toString().match(/^(.*?)$/gm);

                    // Ищем в полученном массиве совпадения и подставляем корректный перенос для текущей ОС.
                    const rightArr = arrMatch.filter((el) => el.includes(pattern));
                    let resultString = rightArr.join(`${EOL}`) + `${EOL}`;
                    this.push(resultString);

                    callback();
                }
            });
            
            readStream.pipe(transformStream).pipe(process.stdout);

            readStream.on('error', (err) => console.log(err));

            transformStream.on('error', (err) => console.log(err));

            transformStream.on('end', resolve);
        })
    }
}
const getPattern = () => {
    let pattern = null;
    if (process.argv[2] === '--pattern' && process.argv[3] !== '') {
        pattern = process.argv[3];
    }
    if (process.argv[3] === '--pattern' && process.argv[4] !== '') {
        pattern = process.argv[4];
    }
    return pattern;
}
const getPath = () => {
    const CWD = process.cwd();
    let pathDir = process.argv[2];
    if (pathDir === undefined || pathDir === '--pattern') {
        return CWD;
    }
    try {
        
        if (path.isAbsolute(pathDir) && (fs.lstatSync(pathDir).isDirectory() || fs.lstatSync(pathDir).isFile())) {
            
            return pathDir;
            
        }
        
        pathDir = path.join(CWD, pathDir);
        
        if (fs.lstatSync(pathDir).isDirectory()) {
            return pathDir;
        }
    }
    catch {
        console.log(`super_program: нет доступа к ${pathDir}: Нет такой директории`);
        process.exit(0);
    }

}
const getFile = async (directory) => {

    let fileNames = await getFileNamesInDirectory(directory);
    let result = await promptUser(fileNames);
    result = path.join(directory, result);
    if (isFile(result)) {
        return result;
    }

    return getFile(result);
}



module.exports = {
    getFileNamesInDirectory,
    promptUser,
    showFileContents,
    getPath,
    getFile,
    getPattern
}

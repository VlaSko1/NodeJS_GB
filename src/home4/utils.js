const fs = require('fs');
const path = require('path');
const inquirer = require('inquirer');


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
    /*return itemsInDirectory.filter((data) => {
        return isFile(path.join(directory, data));
    })*/
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

const showFileContents = async (filepath) => {
    return new Promise((resolve) => {
        const stream = fs.createReadStream(filepath, 'utf-8');
        stream.on('end', resolve);
        stream.pipe(process.stdout);
    });
}

const getPath = () => {
    const CWD = process.cwd();
    let pathDir = process.argv[2];
    
    if (pathDir === undefined) {
        return CWD;
    }
    try {
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
    console.log(directory);
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
    getFile
}

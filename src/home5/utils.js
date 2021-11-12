const fs = require('fs');
const path = require('path');
const { Transform } = require('stream');
const { EOL } = require('os');


const isFile = (filepath) => {
    return fs.lstatSync(filepath).isFile();
}

const getFileAndFolderNamesInDirectory = (directory) => {
    const arrDir = fs.readdirSync( directory);
    arrDir.unshift('..');
    return arrDir;
}
const getPath = () => {
    const CWD = process.cwd();
    let pathDir = process.argv[2];
    if (pathDir === undefined) {
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
        console.log(`Web: нет доступа к ${pathDir}: Нет такой директории`);
        process.exit(0);
    }

}
const getNameFolder = (path) => {
    if (path.includes('/')) {
        return path.slice(path.lastIndexOf('/') + 1);
    }
    if (path.includes('\\')) {
        return path.slice(path.lastIndexOf('\\') + 1);
    }
};



module.exports = {
    getNameFolder,
    getPath,
    getFileAndFolderNamesInDirectory, 
    isFile
}

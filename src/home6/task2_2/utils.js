const fs = require('fs');
const path = require('path');
const inquirer = require('inquirer');
const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers')
const argv = yargs(hideBin(process.argv)).argv

const { Worker } = require('worker_threads')


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
        let { result } = await workerFunc({filepath, pattern});
        console.log(result);
    }
}
const workerFunc = (workerData) => {
    return new Promise((resolve, reject) => {
        const worker = new Worker('./src/home6/task2_2/worker.js', { workerData });
    
        worker.on('message', resolve);
        worker.on('error', reject);
    })
};
const getPattern = () => {
    let pattern = argv.pattern;
    if (typeof pattern === 'string') {
        return pattern;
    } else {
        return null;
    }  
}
const getPath = () => {
    const CWD = process.cwd();
    let pathDir = argv._[0];
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
        console.log(`Worker: нет доступа к ${pathDir}: Нет такой директории`);
        process.exit(1);
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

#!/usr/bin/env node

const {showFileContents, getPath, getFile} = require('./utils');

const CWD = getPath();

(async () => {
    const userInput = await getFile(CWD);
    
    await showFileContents(userInput);
})();

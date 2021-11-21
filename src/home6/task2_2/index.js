#!/usr/bin/env node

const {showFileContents, getPath, getFile, getPattern} = require('./utils');

const CWD = getPath();
const pattern = getPattern();

(async () => {
    const userInput = await getFile(CWD);
    
    await showFileContents(userInput, pattern);
})();

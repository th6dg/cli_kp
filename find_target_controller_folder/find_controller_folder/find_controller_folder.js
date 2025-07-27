#!/usr/bin/env node

const { program } = require('commander');
const fs = require('fs').promises;
const path = require('path');

program
    .version("1.0.0")
    .option("-d, --dir <dir>", "dir parameter", "/home/duong/cli")
    .option("-t, --target <target>", "target folder", "helloworld")
    .parse(process.argv)

const options = program.opts();
const path_dir = options.dir;

async function findFolder(dir) {
    console.log("Find in ",dir);
    const files = await fs.readdir(dir, { withFileTypes: true});
    for (const file of files) {
        const isLast = file === files[files.length - 1];
        if(file.isDirectory() && file.name == options.target) {
            console.log("Dir is: " + file.parentPath +"/"+file.name)
            return true;
        }
        else if (file.isDirectory()) {
            const isFind = await findFolder(dir+'/'+file.name)
            if(isFind) {
                return true;
            }
            if(!isFind && isLast) {
                return false;
            }
        }
        else if (file.isFile() && !isLast) {
            continue;
        }
        else if (file.isFile() && isLast) {
            return false;
        }
    }
}

// Wrap in async IIFE to await the result
(async () => {
    const result = await findFolder(path_dir);
    console.log(result);
})();

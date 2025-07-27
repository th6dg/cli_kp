#!/usr/bin/env node

const { program } = require('commander');

program
    .version("1.0.0")
    .option("-n, --name <name>", "name parameter", "Duong")
    .parse(process.argv)

const options = program.opts();
console.log(`Hello ${options.name}`);
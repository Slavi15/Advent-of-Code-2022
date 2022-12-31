const fs = require('node:fs');

const commands = fs.readFileSync('input.txt', { encoding: 'utf-8' })
    .replace(/\r/g, '').trim().split('\n');

function createTree(commands) {
    const tree = {
        name: '/',
        isDirectory: true,
        children: []
    };

    let currentNode = tree;
    let currentCommand = null;

    for (const command of commands) {
        if (command[0] === '$') {
            const match = /^\$ (?<command>\w+)(?: (?<args>.+))?$/.exec(command);
            currentCommand = match.groups.command;
            
            if (currentCommand === 'cd') {
                const target = match.groups.args;

                switch (target) {
                    case '/':
                        currentNode = tree;
                        break;
                    case '..':
                        currentNode = currentNode.parent;
                        break;
                    default:
                        currentNode = currentNode.children.find((folder) => folder.isDirectory && folder.name === target);
                        break;
                };
            };
        } else {
            if (currentCommand === 'ls') {
                const fileMatch = /^(?<size>\d+) (?<name>.+)$/.exec(command);
                if (fileMatch) {
                    const node = {
                        name: fileMatch.groups.name,
                        size: parseInt(fileMatch.groups.size),
                        isDirectory: false,
                        parent: currentNode
                    };
                    currentNode.children.push(node);
                };

                const dirMatch = /^dir (?<name>.+)$/.exec(command);
                if (dirMatch) {
                    const node = {
                        name: dirMatch.groups.name,
                        isDirectory: true,
                        children: [],
                        parent: currentNode
                    };
                    currentNode.children.push(node);
                };
            } else {
                throw new Error('unknown state');
            };
        };
    };

    return tree;
};

function printTree(node, depth = 0) {
    console.log(`${' '.repeat(depth * 2)}- ${node.name} (${node.isDirectory ? 'dir' : `file, size=${node.size}`})`);

    if (node.isDirectory) {
        for (const child of node.children) {
            printTree(child, depth + 1);
        };
    };
};

function getSize(node, dirCallback = () => {}) {
    if (!node.isDirectory) return node.size;

    const directorySize = node.children.map(child => getSize(child, dirCallback))
        .reduce((previous, current) => previous + current, 0);

    dirCallback(node.name, directorySize);

    return directorySize;
};

async function partOne() {
    const thresholdSize = 100000;
    const tree = createTree(commands);

    printTree(tree);

    let sumSmallFolder = 0;

    getSize(tree, (name, size) => {
        if (size < thresholdSize) {
            sumSmallFolder += size;
        };
    });

    console.log(sumSmallFolder);
};

function partTwo() {
    const totalDiskSpace = 70000000;
    const requiredSpace = 30000000;

    const tree = createTree(commands);
    const usedSpace = getSize(tree);
    const availableSpace = totalDiskSpace - usedSpace;

    if (availableSpace > requiredSpace) throw new Error('enough space');

    const minimumFolderSize = requiredSpace - availableSpace;
    const candidates = [];

    getSize(tree, (name, size) => {
        if (size >= minimumFolderSize) {
            candidates.push({ name, size });
        };
    });

    candidates.sort((a, b) => a.size - b.size);
    console.log(candidates[0].size);
};

function init() {
    partOne();
    partTwo();
};

init();
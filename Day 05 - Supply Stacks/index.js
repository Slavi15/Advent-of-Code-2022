const fs = require('node:fs/promises');

async function readInput(file) {
    const rawData = await fs.readFile(file, { encoding: 'utf-8' });
    return rawData.split('\r\n');
};

async function rearrangeData() {
    const data = await readInput('input.txt');
    let arr = [];
    const map = new Map();

    for (let i = 0; i < data.length; i++) {
        if (data[i] !== '') {
            arr.push(data[i]);
        } else {
            arr.reverse();
            break;
        };
    };

    arr.forEach((line, index) => {
        if (index === 0) {
            let keys = line.split(' ');
            keys.forEach(key => {
                if (key !== '') map.set(key, []);
            });
        } else {
            let lineFormat = [];
            for (let i = 0; i < line.length; i += 4) {
                line[i] === '[' ? lineFormat.push(line.slice(i, i + 3)) : lineFormat.push('');
            };
            lineFormat.forEach((char, index) => {
                if (char !== '') map.get((index + 1).toString()).push(char);
            });
        };
    });

    return map;
};

async function solve() {
    const inputCommands = (await readInput('input.txt')).reverse();
    const cratesData = await rearrangeData();
    let commands = [];
    let output = [];

    for (let i = 0; i < inputCommands.length; i++) {
        if (inputCommands[i] !== '') {
            commands.push(inputCommands[i]);
        } else {
            commands.reverse();
            break;
        };
    };

    commands.forEach(command => {
        const result = command.split(' ').map(Number).filter(x => !Number.isNaN(x));

        const cratesCount = result[0];
        const initial = result[1].toString();
        const final = result[2].toString();

        const sliced = cratesData.get(initial).slice(-cratesCount).reverse();
        // reverse for part one, and no reverse for part two
        sliced.forEach(char => {
            cratesData.get(final).push(char);
            cratesData.get(initial).pop();
        });
    });

    for (kvp of cratesData) {
        output.push(kvp[1][kvp[1].length - 1][1])
    };

    console.log(cratesData);
    console.log(output.join(''));
};

function init() {
    solve();
};

init();
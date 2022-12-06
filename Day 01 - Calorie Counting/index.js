const fs = require('node:fs/promises');

async function readInput(file) {
    const rawData = await fs.readFile(file, { encoding: 'utf8' });
    return rawData.trim().split('\r\n');
};

async function solve() {
    const data = await readInput('input.txt');
    let output = [];
    let calories = 0;

    data.forEach((item, index) => {
        if (item !== '') calories += Number(item);
        
        if (item === '' || index === (data.length - 1)) {
            output.push(calories);
            calories = 0;
        };
    });

    const sortedArray = output.sort((a, b) => b - a).slice(0, 3);
    const topThreeSum = sortedArray.reduce((previous, current) => {
        return previous + current;
    }, 0);

    const maximumValue = Math.max(...output);
    console.log(maximumValue);
    console.log(topThreeSum);
};

function init() {
    solve();
};

init();
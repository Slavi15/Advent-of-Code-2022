const fs = require('node:fs/promises');
const regex = new RegExp('[-,]', 'g');

async function readInput(file) {
    const rawData = await fs.readFile(file, { encoding: 'utf-8' });
    return rawData.trim().split('\r\n');
};

async function solvePartOne() {
    const data = await readInput('input.txt');
    let count = 0;

    data.forEach(sections => {
        const [firstStart, firstEnd, secondStart, secondEnd] = sections.split(regex).map(Number);
        
        if ((firstStart <= secondStart && firstEnd >= secondEnd)
            || (secondStart <= firstStart && secondEnd >= firstEnd)) {
                count += 1;
        };
    });

    console.log(count);
};

async function solvePartTwo() {
    const data = await readInput('input.txt');
    let count = 0;

    data.forEach(sections => {
        const [firstStart, firstEnd, secondStart, secondEnd] = sections.split(regex).map(Number);
        
        if ((firstStart <= secondStart && firstEnd >= secondEnd)
            || (secondStart <= firstStart && secondEnd >= firstEnd)
            || (secondStart <= firstEnd && firstStart <= secondEnd)
            || firstEnd === secondStart
            || firstStart === secondEnd) {
                count += 1;
        };
    });

    console.log(count);
};

function init() {
    solvePartOne();
    solvePartTwo();
};

init();
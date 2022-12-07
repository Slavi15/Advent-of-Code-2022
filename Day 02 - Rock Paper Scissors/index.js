const fs = require('node:fs/promises');

const points = {
    'X': 1,
    'Y': 2,
    'Z': 3
};

async function readInput(file) {
    const rawData = await fs.readFile(file, { encoding: 'utf-8' });
    return rawData.trim().split('\r\n');
};

async function solvePartOne() {
    const data = await readInput('input.txt');
    const output = [];

    data.forEach(moves => {
        const [opponentMove, myMove] = moves.split(' ');
        let result = 0;

        if (opponentMove === 'A' && myMove === 'Y') {
            result += (points[myMove] + 6);
        } else if (opponentMove === 'A' && myMove === 'X') {
            result += (points[myMove] + 3);
        } else if (opponentMove === 'A' && myMove === 'Z') {
            result += points[myMove];
        };

        if (opponentMove === 'B' && myMove === 'Z') {
            result += (points[myMove] + 6);
        } else if (opponentMove === 'B' && myMove === 'Y') {
            result += (points[myMove] + 3);
        } else if (opponentMove === 'B' && myMove === 'X') {
            result += points[myMove];
        };

        if (opponentMove === 'C' && myMove === 'X') {
            result += (points[myMove] + 6);
        } else if (opponentMove === 'C' && myMove === 'Z') {
            result += (points[myMove] + 3);
        } else if (opponentMove === 'C' && myMove === 'Y') {
            result += points[myMove];
        };

        output.push(result);
    });

    const sum = output.reduce((previous, current) => previous + current);
    console.log(sum);
};

async function solvePartTwo() {
    const data = await readInput('input.txt');
    const output = [];

    data.forEach(moves => {
        const [opponentMove, myMove] = moves.split(' ');
        let result = 0;

        if (opponentMove === 'A' && myMove === 'Z') {
            result += 8;
        } else if (opponentMove === 'A' && myMove === 'Y') {
            result += 4;
        } else if (opponentMove === 'A' && myMove === 'X') {
            result += 3;
        };

        if (opponentMove === 'B' && myMove === 'Z') {
            result += 9;
        } else if (opponentMove === 'B' && myMove === 'Y') {
            result += 5;
        } else if (opponentMove === 'B' && myMove === 'X') {
            result += 1;
        };

        if (opponentMove === 'C' && myMove === 'Z') {
            result += 7;
        } else if (opponentMove === 'C' && myMove === 'Y') {
            result += 6;
        } else if (opponentMove === 'C' && myMove === 'X') {
            result += 2;
        };

        output.push(result);
    });

    const sum = output.reduce((previous, current) => previous + current);
    console.log(sum);
};

function init() {
    // solvePartOne();
    solvePartTwo();
};

init();
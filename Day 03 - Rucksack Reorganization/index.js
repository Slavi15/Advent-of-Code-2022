const fs = require('node:fs/promises');

async function readInput(file) {
    const rawData = await fs.readFile(file, { encoding: 'utf-8' });
    return rawData.trim().split('\r\n');
};

async function solvePartOne() {
    const data = await readInput('sample.txt');
    let output = [];

    data.forEach(string => {
        const firstHalf = string.substring(0, string.length / 2);
        const secondHalf = string.substring(string.length / 2);

        for (let i = 0; i < firstHalf.length; i++) {
            for (let j = 0; j < secondHalf.length; j++) {
                if (firstHalf[i] === secondHalf[j]) {
                    output.push(asciiToPriority(firstHalf[i]));
                    return;
                };
            };
        };
    });

    const sum = output.reduce((previous, current) => previous + current);
    console.log(sum);
};

async function solvePartTwo() {
    const data = await readInput('input.txt');
    let formatData = [];
    let output = [];

    for (let i = 0; i < data.length; i += 3) {
        formatData.push(`${data[i]}-${data[i + 1]}-${data[i + 2]}`);
    };

    formatData.forEach(string => {
        const [first, second, third] = string.split('-');

        for (let i = 0; i < first.length; i++) {
            for (let j = 0; j < second.length; j++) {
                for (let k = 0; k < third.length; k++) {
                    if (first[i] === second[j] && first[i] === third[k]) {
                        output.push(asciiToPriority(first[i]));
                        return;
                    };
                };
            };
        };
    });

    const sum = output.reduce((previous, current) => previous + current);
    console.log(sum);
};

function asciiToPriority(character) {
    if (character.charCodeAt(0) >= 97 && character.charCodeAt(0) <= 122) {
        return character.charCodeAt(0) - 96;
    } else if (character.charCodeAt(0) >= 65 && character.charCodeAt(0) <= 90) {
        return character.charCodeAt(0) - 38;
    };
};

function init() {
    solvePartOne();
    solvePartTwo();
};

init();
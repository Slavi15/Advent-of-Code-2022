const fs = require('node:fs/promises');

async function readInput(file) {
    const rawData = await fs.readFile(file, { encoding: 'utf-8' });
    return rawData.trim().split('\r\n');
};

async function solve() {
    const signals = await readInput('input.txt');
    let markers = [];

    signals.forEach(signal => {
        for (let i = 0; i < signal.length; i++) {
            markers.push(signal.slice(i, i + 4));
            // i + 4 for part one
            // i + 14 for part two
        };
    });

    for (let i = 0; i < markers.length; i++) {
        for (let j = 0; j < markers[i].length; j++) {
            const char = markers[i][j];
            const chunk = markers[i].slice(j + 1);

            if (!chunk.includes(char)) {
                if (j === (markers[i].length - 1)) {
                    console.log(i + markers[i].length);
                    return;
                };
            } else {
                break;
            };
        };
    };
};

function init() {
    solve();
};

init();
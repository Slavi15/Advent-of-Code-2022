const fs = require('node:fs/promises');

async function readInput(file) {
    const rawData = await fs.readFile(file, { encoding: 'utf-8' });
    return rawData.replace(/\r/g, '').trim().split('\n');
};

async function partOne() {
    const trees = await readInput('input.txt');

    let count = 0;
    const length = trees.length;

    let verticalArray = [];

    let str = '';
    for (let k = 0; k < length; k++) {
        for (let l = 0; l < length; l++) {
            str += trees[l][k];
        };
        verticalArray.push(str);
        str = '';
    };

    for (let i = 0; i < trees.length; i++) {
        for (let j = 0; j < trees[i].length; j++) {
            if (i === 0 || i === trees.length - 1) {
                count += trees[i].length;
                break;
            } else {
                if (j === 0 || j === trees[i].length - 1) {
                    count += 1;
                } else {
                    const leftArray = trees[i].slice(0, j).split('').map(Number);
                    const rightArray = trees[i].slice(j + 1).split('').map(Number);
                    const upArray = verticalArray[j].slice(0, i).split('').map(Number);
                    const downArray = verticalArray[j].slice(i + 1).split('').map(Number);

                    const leftMax = Math.max(...leftArray);
                    const rightMax = Math.max(...rightArray);
                    const upMax = Math.max(...upArray);
                    const downMax = Math.max(...downArray);

                    if (Number(trees[i][j]) > leftMax ||
                        Number(trees[i][j]) > rightMax ||
                        Number(trees[i][j]) > upMax ||
                        Number(trees[i][j]) > downMax) {
                        count += 1;
                    };
                };
            };
        };
    };

    console.log(count);
};

async function partTwo() {
    const trees = await readInput('input.txt');

    const length = trees.length;
    let verticalArray = [];

    let str = '';
    for (let k = 0; k < length; k++) {
        for (let l = 0; l < length; l++) {
            str += trees[l][k];
        };
        verticalArray.push(str);
        str = '';
    };

    let final = [];

    for (let i = 0; i < trees.length; i++) {
        for (let j = 0; j < trees[i].length; j++) {
            if (i !== 0 && j !== 0 && i !== trees.length - 1 && j !== trees[i].length) {
                const leftArray = trees[i].slice(0, j).split('').map(Number).reverse();
                const rightArray = trees[i].slice(j + 1).split('').map(Number);
                const upArray = verticalArray[j].slice(0, i).split('').map(Number).reverse();
                const downArray = verticalArray[j].slice(i + 1).split('').map(Number);
    
                let leftCount = 0;
                let rightCount = 0;
                let upCount = 0;
                let downCount = 0;
    
                for (let k = 0; k < leftArray.length; k++) {
                    if (Number(trees[i][j]) <= leftArray[k] || k === leftArray.length - 1) {
                        if (k === leftArray.length - 1) {
                            leftCount += (k + 1);
                            break
                        } else {
                            const count = leftArray.slice(0, k + 1).length;
                            // console.log(k);
                            leftCount += count;
                            break
                        };
                    };
                };
                
                for (let k = 0; k < rightArray.length; k++) {
                    if (Number(trees[i][j]) <= rightArray[k] || k === rightArray.length - 1) {
                        if (k === rightArray.length - 1) {
                            rightCount += (k + 1);
                            break
                        } else {
                            const count = rightArray.slice(0, k + 1).length;
                            // console.log(k);
                            rightCount += count;
                            break
                        };
                    };
                };
    
                for (let k = 0; k < upArray.length; k++) {
                    if (Number(trees[i][j]) <= upArray[k] || k === upArray.length - 1) {
                        if (k === upArray.length - 1) {
                            upCount += (k + 1);
                            break
                        } else {
                            const count = upArray.slice(0, k + 1).length;
                            // console.log(k);
                            upCount += count;
                            break
                        };
                    };
                };
    
                for (let k = 0; k < downArray.length; k++) {
                    if (Number(trees[i][j]) <= downArray[k] || k === downArray.length - 1) {
                        if (k === downArray.length - 1) {
                            downCount += (k + 1);
                            break
                        } else {
                            const count = downArray.slice(0, k + 1).length;
                            // console.log(k);
                            downCount += count;
                            break
                        };
                    };
                };

                const num = leftCount * rightCount * upCount * downCount
                final.push(num);
            };
        };
    };

    console.log(Math.max(...final));
};

function init() {
    partOne();
    partTwo();
};

init();
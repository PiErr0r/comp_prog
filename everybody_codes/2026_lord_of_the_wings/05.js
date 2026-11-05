
const fs = require('fs');
const { exec } = require("child_process");
const { ALPHA_L, ALPHA_U, NUMS, D4, D6, D8, MOD } = require("../../../aoc/lib");
const { joseph, findCycle } = require("../../../aoc/lib");
const { cache } = require("../../../aoc/lib");
const { bin, float, hex, int, num, oct } = require("../../../aoc/lib");
const { range, drange, trange, iter, diter, titer } = require("../../../aoc/lib");
const { copy,	entries, in_, inBB, keys, sort, values } = require("../../../aoc/lib");
const { Counter, DD, empty, FastQueue, PriorityQueue, Queue, set, Stack } = require("../../../aoc/lib");
const { areaInt, circumference, manDist, shoelace } = require("../../../aoc/lib");
const { ord, chr, count, debug, disp, disp3, crt, gcd, lcm, modPow, modPowBig, modInv, mod, prod, prodBig, randint, sum, sumBig, transpose } = require("../../../aoc/lib");
const { digits, ints,	floats,	singles,	words,	lines,	table,	groups,	getGroups,	groupsWith,	parse,	parseLine, scanf } = require ('../../../aoc/lib');
const { min, max, random, abs, ceil, floor, log, log10, log2, round, sign, sin, cos, tan, asin, acos, atan, atan2, sqrt, PI } = Math;
const { disjoint, isSubset, isSuperset, or, and, xor, sub } = set;
const { combinations, combinations_with_replacement, next_permutation, product, unique_permutations } = require("../../../aoc/lib");


function bfs(data) {
    const Y = int(data.length/2);
    const X = int(data[0].length/2);
    let border = [[Y, X]];
    data[Y][X] = '#';
    let change = true;
    while (change) {
        change = false;
        const L = [];
        const seen = new set()
        iter(border, ([y, x]) => {
            iter(D8, ([dy, dx]) => {
                if (inBB(y+dy, x+dx, data) && data[y+dy][x+dx] !== '#' && !seen.has([y+dy, x+dx])) {
                    L.push([y+dy, x+dx]);
                    seen.add([y+dy, x+dx])
                }
            })
        })
        border = [];
        iter(L, ([y, x]) => {
            let cnt = 0;
            iter(D8, ([dy, dx]) => {
                if (!inBB(y+dy, x+dx, data)) return;
                if (in_(data[y+dy][x+dx], '#1')) ++cnt;
            })
            if (cnt >= 5 && data[y][x] !== '#') {
                change = true;
                border.push([y, x])
            }
        })
        iter(border, ([y, x]) => {
            data[y][x] = '#';
        })
    }
    iter(data, (row, y) => {
        iter(row, (col, x) => {
            if (col !== '#')
                data[y][x] = '.';
        })
    });
    return data;
}


function part1(data) {

	let res = 0;
    data = table(data.trim())

    data = bfs(data)
    iter(data, row => {
        iter(row, col => {
            if (col === '#') ++res;
        })
    })

	debug(res);
	if (res) exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART1");
	return;
}

function sand(data) {
    const new_sand = []
    iter(data, (row, y) => {
        iter(row, (col, x) => {
            if (col !== '#') return;
            iter(D8, ([dy, dx]) => {
                if (inBB(y+dy, x+dx, data) && data[y+dy][x+dx] !== '#' || !inBB(y+dy, x+dx, data)) {
                    new_sand.push([y, x]);
                }
            })
        })
    })
    iter(new_sand, ([y, x]) => {
        data[y][x] = '=';
    });
    let changed = true;
    while (changed) {
        changed = false;
        const land = [];
        iter(data, (row, y) => {
            iter(row, (col, x) => {
                if (data[y][x] === '#') land.push([y, x])
            })
        })
        const to_sand = [];
        const seen = new set();
        iter(land, ([y, x]) => {
            let cnt = 0;
            iter(D8, ([dy, dx]) => {
                if (inBB(y+dy, x+dx, data) && data[y+dy][x+dx] === '=') {
                    cnt++;
                }
            })
            if (cnt >= 5) {
                changed = true
                to_sand.push([y, x])
            }
        })
        iter(to_sand, ([y, x]) => {
            data[y][x] = '=';
        });
    }
    return data;
}

function part2(data) {

	let res = 0;
    data = table(data.trim())
    data = bfs(data);
    data = sand(data);
    iter(data, row => {
        iter(row, col => {
            if (col === '=') ++res;
        })
    })
    disp(data)

	debug(res);
	if (res) exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART2");
	return;
}

const PATTERN = table(`.+++.
+++++
++X++
+++++
.+++.`)

function growth(data) {
    let L = [];
    iter(data, (row, y) => {
        iter(row, (col, x) => {
            if (col === '#')
                L.push([y, x]);
        })
    })

    let changed = true;
    let I = 0;
    while (changed && I < 2) {
        changed = false;
        const T = []
        iter(L, ([y, x]) => {
            let cnt = 0;
            let valid = true;
            iter(D8, ([dy, dx]) => {
                if (!inBB(y+dy, x+dx, data)) return;
                if (data[y+dy][x+dx] === '@') {
                    ++cnt;
                }
                if (data[y+dy][x+dx] === '=') {
                    valid = false;
                }
            })
            if (valid && cnt >= 4) {
                T.push([y, x]);
                changed = true;
            }
        })
        iter(T, ([y, x]) => {
            data[y][x] = '@'
        });
        L = [];
        iter(data, (row, y) => {
            iter(row, (col, x) => {
                if (col === '#')
                    L.push([y, x]);
            })
        })
        ++I;
    }
    return data;
}

function trees(data) {
    let changed = true
    while (changed) {
        changed = false;
        const T = [];
        iter(data, (row, y) => {
            iter(row, (col, x) => {
                if (col !== '#') return;
                let valid = true;
                drange(-2, 2 + 1)((dy, dx) => {
                    if (dy === 0 && dx === 0) return;
                    if (!inBB(y+dy, x+dx, data)) {
                        valid = false;
                        return
                    }
                    if (PATTERN[2+dy][2+dx] === '+' && !in_(data[y+dy][x+dx], '#@')) valid = false;
                    return !valid;
                })
                if (valid && data[y][x] === '#') {
                    T.push([y, x])
                    changed = true;
                }
            })
        })
        iter(T, ([y, x]) => {
            data[y][x] = '@'
        })
    }
    return growth(data);
}

function part3(data) {

	let res = 0;
    data = table(data.trim())
    data = bfs(data);
    data = sand(data);
    data = trees(data);
    disp(data)
    iter(data, row => {
        iter(row, col => {
            if (col === '@') ++res;
        })
    })

	debug(res);
	if (res) exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART3");
	return;
}

function main(n) {
	part1(fs.readFileSync(`${n}a_input`).toString("utf-8"));
	part2(fs.readFileSync(`${n}b_input`).toString("utf-8"));
	part3(fs.readFileSync(`${n}c_input`).toString("utf-8"));
	process.exit(0);
}

main('05');


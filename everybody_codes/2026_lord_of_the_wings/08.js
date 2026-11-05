
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


function pass(D, y, x, dy, dx) {
    let curr = 0;
    if (dy === 0) {
        while (D[y][x] === '.') {
            x += dx;
        }
        dx *= 2
    }
    while (inBB(y, x, D)) {
        if (D[y][x] > curr) {
            curr = D[y][x];
        } else {
            D[y][x] = '.';
        }
        --curr;
        y += dy;
        x += dx;
    }
}

function part1(data) {

	let res = 0;
    data = table(data.trim())
    let x = 0, y = data.length;
    let dx = 0, dy = -1;
    while (1) {
        pass(data, y, x, 1, 1);
        if (!inBB(y+dy, x+dx, data)) {
            if (dy) {
                dx = 1;
                dy = 0;
            } else {
                break
            }
        }
        y += dy;
        x += dx;
    }
    iter(data, row => {
        iter(row, col => {
            if (col !== '.') ++res;
        })
    });


	debug(res);
	if (res) exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART1");
	return;
}

function part2(data) {

	let res = 0;
    data = table(data.trim())
    let x = 0, y = data.length;
    let dx = 0, dy = -1;
    const parts = [
        [{tdy:  1, tdx:  1, x: 0, y: data.length - 1, dy: -1, dx: 0}, {dy: 0, dx: 1}],
        [{tdy:  1, tdx: -1, x: 0, y: 0, dy: 0, dx: 1}, {dy: 1, dx: 0}],
        [{tdy:  0, tdx: -1, x: data[0].length - 1, y: 0, dy: 1, dx: 0}],
        [{tdy: -1, tdx: -1, x: data[0].length - 1, y: 0, dy: 1, dx: 0}, {dy: 0, dx: -1}],
        [{tdy: -1, tdx:  1, x: data[0].length - 1, y: data.length - 1, dy: 0, dx: -1}, {dy: -1, dx: 0}],
        [{tdy:  0, tdx:  1, x: 0, y: data.length - 1, dy: -1, dx: 0}]
    ];
    iter(parts, p => {
        let pi = 0;
        let { x, y, dx, dy, tdx, tdy } = p[pi];
        const D = copy(data);

        while (1) {
            pass(D, y, x, tdy, tdx);
            if (!inBB(y+dy, x+dx, data)) {
                ++pi;
                if (pi === p.length) break;
                dy = p[pi].dy
                dx = p[pi].dx
            }
            y += dy;
            x += dx;
        }
        let prev = res;
        iter(D, row => {
            iter(row, col => {
                if (col !== '.') ++res;
            })
        });
    })

	debug(res);
	if (res) exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART2");
	return;
}

function pass3(D, y, x, dy, dx) {
    let curr = 0;
    if (dy === 0) {
        while (D[y][x] === '.') {
            x += dx;
        }
        dx *= 2
    }
    let w = 0;
    let e = 0;
    while (inBB(y, x, D)) {
        if (in_(D[y][x], 'XYZ')) {
            switch(D[y][x]) {
                case 'X': D[y][x] = 'Y'; break;
                case 'Y': D[y][x] = 'Z'; break;
                case 'Z': D[y][x] = 1;   break;
                default: debug("BAD");
            }
        } else if (D[y][x] > curr) {
            ++e;
            curr = D[y][x];
            if (D[y][x] === 9) {
                ++w;
                D[y][x] = 'X'
            } else {
                D[y][x]++;
            }
        } else {
            // pass
        }
        --curr;
        y += dy;
        x += dx;
    }
    return [w, e]
}

function part3(data) {

	let res = 0;
    data = table(data.trim())
    iter(data, (row, y) => {
        iter(row, (col, x) => {
            if (data[y][x] !== '.')
                data[y][x] = int(data[y][x]);
        })
    })
    const parts = [
        [{tdy:  1, tdx:  1, x: 0, y: data.length - 1, dy: -1, dx: 0}, {dy: 0, dx: 1}],
        [{tdy:  1, tdx: -1, x: 0, y: 0, dy: 0, dx: 1}, {dy: 1, dx: 0}],
        [{tdy:  0, tdx: -1, x: data[0].length - 1, y: 0, dy: 1, dx: 0}],
        [{tdy: -1, tdx: -1, x: data[0].length - 1, y: 0, dy: 1, dx: 0}, {dy: 0, dx: -1}],
        [{tdy: -1, tdx:  1, x: data[0].length - 1, y: data.length - 1, dy: 0, dx: -1}, {dy: -1, dx: 0}],
        [{tdy:  0, tdx:  1, x: 0, y: data.length - 1, dy: -1, dx: 0}]
    ];
    let i = 0;
    let warriors = 0;
    let energy = 0;
    while (1) {
        const p = parts[i%6];
        ++i;
        let pi = 0;
        let { x, y, dx, dy, tdx, tdy } = p[pi];
        let prevw = warriors, preve = energy
        while (1) {
            const [new_warriors, energy_used] = pass3(data, y, x, tdy, tdx);
            warriors += new_warriors;
            energy += energy_used;
            if (!inBB(y+dy, x+dx, data)) {
                ++pi;
                if (pi === p.length) break;
                dy = p[pi].dy
                dx = p[pi].dx
            }
            y += dy;
            x += dx;
        }

        let prev = res;
        if (warriors >= 100000) break
    }
    res = energy;

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

main('08');


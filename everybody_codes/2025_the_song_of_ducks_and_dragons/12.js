
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

function bfs(data, ins, sign = '#') {
    const q = new Queue();
    iter(ins, ([y, x]) => {
        q.push([y, x])
    })
    while (!q.empty()) {
        const [y, x] = q.pop();
        if (data[y][x] === sign || data[y][x] === 'X') continue;
        const curr = data[y][x];
        data[y][x] = sign
        iter(D4, ([dy, dx]) => {
            if (!inBB(y+dy, x+dx, data)) return;
            if (data[y+dy][x+dx] <= curr) {
                q.push([y+dy, x+dx]);
            }
        })
    }
}

function part1(data) {

	let res = 0;
    data = table(data.trim())

    bfs(data, [[0, 0]]);
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

function part2(data) {

	let res = 0;
    data = table(data.trim())

    bfs(data, [[0, 0], [data.length - 1, data[0].length - 1]]);
    iter(data, row => {
        iter(row, col => {
            if (col === '#') ++res;
        })
    })

	debug(res);
	if (res) exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART2");
	return;
}

function part3(data) {

	let res = 0;

    data = table(data.trim())
    range(3)(i => {
        let mx = 0, mxr = -1, mxc = -1;
        range(data.length)(r => {
            range(data[0].length)(c => {
                const D1 = copy(data)
                bfs(D1, [[r, c]]);
                let blown = 0;
                iter(D1, row => {
                    iter(row, col => {
                        if (col === '#') ++blown;
                    })
                })
                if (blown > mx) {
                    mx = blown;
                    mxr = r;
                    mxc = c;
                } else if (blown === mx) {
                    debug("PLS NO", mx)
                }
            })
        })
        bfs(data, [[mxr, mxc]], 'X');

    })
    iter(data, row => {
        iter(row, col => {
            if (col === 'X') ++res;
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

main('12');


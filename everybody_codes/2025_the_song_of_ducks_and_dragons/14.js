
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

const D = [[-1, -1], [-1, 1], [1, 1], [1, -1]];

function make_space(data) {
    range(data.length)(y => {
        range(data[0].length)(x => {
            data[y][x] = '.'
        })
    })
}

function step(data) {
    const ndata = empty(data.length, data[0].length)
    make_space(ndata)
    iter(data, (row, y) => {
        iter(row, (col, x) => {
            let cnt = 0;
            iter(D, ([dy, dx]) => {
                if (!inBB(y+dy, x+dx, data)) return;
                if (data[y+dy][x+dx] === '#') ++cnt;
            })
            if (data[y][x] === '#') {
                ndata[y][x] = cnt % 2 === 1 ? '#' : '.'
            } else {
                ndata[y][x] = cnt % 2 === 0 ? '#' : '.'
            }
        })
    })
    return ndata;
}

function part1(data) {

	let res = 0;
    data = table(data.trim())

    range(10)(_ => {
        const ndata = step(data);
        res += ndata.reduce((acc, curr) => acc + count(curr, '#'), 0)
        data = ndata
    })

	debug(res);
	if (res) exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART1");
	return;
}

function part2(data) {

	let res = 0;
    data = table(data.trim())

    range(2025)(_ => {
        const ndata = step(data);
        res += ndata.reduce((acc, curr) => acc + count(curr, '#'), 0)
        data = ndata
    })

	debug(res);
	if (res) exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART2");
	return;
}

function part3(data) {

	let res = 0;
    const pattern = data.trim().split("\n").join("")
    data = table(data.trim())
    let D = empty(34, 34);
    make_space(D);
    const S = floor(D.length - data.length) / 2;

    let prev = 0
    range(20250)(_ => {
        const ndata = step(D);
        const sub = ndata.slice(S, S + data.length).map(row => row.slice(S, S + data[0].length).join("")).join("")
        if (sub === pattern) {
            const tmp = ndata.reduce((acc, curr) => acc + count(curr, '#'), 0)
            res += tmp
            debug(_+1, _ - prev, tmp, res)
            prev = _
            //disp(ndata)
        }

        D = ndata
    })
    // now find cycle and use calculator


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

main('14');


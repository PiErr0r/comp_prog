
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

function part1(data) {

	let res = 0;
    data = ints(data)
    let phase = 1;
    range(10)(round => {
        range(data.length - 1)(i => {
            if (phase === 1) {
                if (data[i+1] < data[i]) {
                    data[i]--;
                    data[i+1]++;
                }
            } else if (phase === 2) {
                if (data[i+1] > data[i]) {
                    data[i+1]--;
                    data[i]++;
                }
            } else {
                console.assert(false)
            }
        })
        let new_phase = true
        for (let i = 0; i < data.length - 1; ++i) {
            if (data[i+1] < data[i])
                new_phase = false
        }
        if (phase === 1 && new_phase) ++phase
    })
    iter(data, (duck, col) => {
        res += duck * (col + 1)
    })

	debug(res);
	if (res) exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART1");
	return;
}

function part2(data) {

	let res = 0;
    data = ints(data)
    const total = sum(data)
    let phase = 1;
    let i = 0;
    while (1) {
        range(data.length - 1)(i => {
            if (phase === 1) {
                if (data[i+1] < data[i]) {
                    data[i]--;
                    data[i+1]++;
                }
            } else if (phase === 2) {
                if (data[i+1] > data[i]) {
                    data[i+1]--;
                    data[i]++;
                }
            } else {
                console.assert(false)
            }
        })
        let new_phase = true
        for (let i = 0; i < data.length - 1; ++i) {
            if (data[i+1] < data[i])
                new_phase = false
        }
        if (phase === 1 && new_phase) {
            ++phase;
        }
        if (data.every(n => total / data.length === n)) break;
        ++i;
    }
    res = i + 1;

	debug(res);
	if (res) exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART2");
	return;
}

function part3(data) {

	let res = 0;
    data = ints(data)
    const total = sum(data)
    let per_col = total / data.length;
    let S1 = 0;
    let S2 = 0;
    let i;
    for (i = 0; i < data.length; ++i) {
        if (data[i] < per_col) S1 += per_col - data[i]
        if (data[i] > per_col) S2 += data[i] - per_col
    }
    res = S1;

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

main('11');



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
    data = scanf(data, "x=%d y=%d")
    let li = 0
    let ri = data.length - 1
    let lh = data[li][1]
    let rh = data[ri][1]
    while (li < ri) {
        while (li < ri && lh <= rh) {
            ++li;
            const dx = data[li][0] - data[li-1][0] - 1;
            res += dx * lh;
            const dy = max(lh - data[li][1], 0)
            res += dy
            lh = max(lh, data[li][1])
        }
        while (li < ri && rh <= lh) {
            --ri;
            const dx = data[ri+1][0] - data[ri][0] - 1
            res += dx * rh
            const dy = max(rh - data[ri][1], 0)
            res += dy;
            rh = max(rh, data[ri][1])
        }
    }
    iter(data, ([_, y]) => {
        res += y
    })

	debug(res);
	if (res) exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART1");
	return;
}

function part2(data) {

	let res = 0;
    data = scanf(data, "x=%d y=%d width=%d")
    let li = 0
    let ri = data.length - 1
    let lh = data[li][1]
    let rh = data[ri][1]
    while (li < ri) {
        while (li < ri && lh <= rh) {
            ++li;
            const dx = data[li][0] - (data[li-1][0] + data[li-1][2])
            res += dx * lh;
            const dy = max(lh - data[li][1], 0)
            res += dy * data[li][2]
            lh = max(lh, data[li][1])
        }
        while (li < ri && rh <= lh) {
            --ri;
            const dx = data[ri+1][0] - (data[ri][0] + data[ri][2])
            res += dx * rh
            const dy = max(rh - data[ri][1], 0)
            res += dy * data[ri][2];
            rh = max(rh, data[ri][1])
        }
    }
    iter(data, ([_, y, w]) => {
        res += y * w
    })

	debug(res);
	if (res) exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART2");
	return res;
}

function part3(data) {

	let res = 0;
    res = part2(data)

	debug(res);
	if (res) exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART3");
	return;
}

function main(n) {
	part1(fs.readFileSync(`${n}a_input`).toString("utf-8").trim());
	part2(fs.readFileSync(`${n}b_input`).toString("utf-8").trim());
	part3(fs.readFileSync(`${n}c_input`).toString("utf-8").trim());
	process.exit(0);
}

main('18');


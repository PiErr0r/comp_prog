
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

function solve(data, odd = false, banena = false) {
    let res = 0;
    iter(data, r => {
        let tmp = 0;
        if (banena && in_("ne", r)) return
        for (let i = 0; i < r.length - 1; ++i) {
            if (in_(r.slice(i, i + 2), ["ba", "na", "ne"])) ++tmp
        }
        if (odd) {
            if (tmp % 2 === 0)
                res += tmp
        } else {
            res += tmp
        }
    })
    return res;
}

function part1(data) {

	let res = 0;
    data = lines(data)
    res = solve(data)

	debug(res);
	if (res) exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART1");
	return;
}

function part2(data) {

	let res = 0;
    data = lines(data)
    res = solve(data, true)

	debug(res);
	if (res) exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART2");
	return;
}

function part3(data) {

	let res = 0;
    data = lines(data)
    res = solve(data, false, true)

	debug(res);
	if (res) exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART3");
	return;
}

function main(n) {
    let inp = 'input';
    if (process.argv.length > 2 && process.argv[2] === 'ex') inp = 'ex';
	part1(fs.readFileSync(`${n}_${inp}`).toString("utf-8").trim());
	part2(fs.readFileSync(`${n}_${inp}`).toString("utf-8").trim());
	part3(fs.readFileSync(`${n}_${inp}`).toString("utf-8").trim());
	process.exit(0);
}

main('01');


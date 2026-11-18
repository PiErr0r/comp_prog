
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
    let curr = 0
    iter(data, dd => {
        if (dd === 'v') --curr
        else            ++curr
        res = max(res, curr)
    })

	debug(res);
	if (res) exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART1");
	return;
}

function part2(data) {

	let res = 0;
    let curr = 0
    let h = 0;
    let prev = data[0] === 'v' ? '^' : 'v';
    iter(data, dd => {
        if (dd === prev) curr += sign(curr)
        else {
            if (dd === 'v') curr = -1
            else            curr =  1
        }
        prev = dd
        h += curr
        res = max(res, h)
    })

	debug(res);
	if (res) exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART2");
	return;
}

const CACHE = {0: 0, 1: 1}
function fib(n) {
    if (n in CACHE) return CACHE[n]
    const a = fib(n-1);
    const b = fib(n-2);
    CACHE[n] = a + b
    return CACHE[n]
}

function part3(data) {

	let res = 0;
    let curr = 0
    let h = 0;
    const D = []
    let prev = null;
    let cnt = 0;
    for (let i = 0; i <= data.length; ++i) {
        const dd = i < data.length ? data[i] : null
        if (prev === null) {
            prev = dd;
            ++cnt
        } else if (dd === prev) {
            ++cnt
        } else {
            D.push([prev, cnt])
            cnt = 1
            prev = dd
        }
    }
    iter(D, ([dd, n]) => {
        const dir = dd === 'v' ? -1 : 1
        const step = fib(n);
        h += dir * step
        res = max(res, h)
    })

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

main('02');


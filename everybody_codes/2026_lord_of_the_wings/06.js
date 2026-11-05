
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

let CACHE = {};

function _dfs(N, key, S) {
    if (key in CACHE) return CACHE[key];
    if (S.has(key)) return 0;
    S.add(key);
    if (!(key in N)) return 0;
    let cnt = 0;
    iter(N[key], item => {
        cnt += 1 + _dfs(N, item, S);
    })
    CACHE[key] = cnt;
    return cnt;
}

function dfs(...args) {
    CACHE = {};
    return _dfs(...args);
}

function part1(data) {

	let res = 0;
    data = lines(data.trim())
    const N = data.reduce((acc, curr) => {
        const [item, ings] = curr.split(":");
        acc[item] = ings.split(',');
        return acc
    }, {});
    const S = new set()
    dfs(N, "NULL", S);
    res = S.size - 1;

	debug(res);
	if (res) exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART1");
	return;
}

function part2(data) {

	let res = 0;
    data = lines(data.trim())
    const N = data.reduce((acc, curr) => {
        const [item, ings] = curr.split(":");
        iter(ings.split(','), ing => {
            if (ing in acc) acc[ing].push(item);
            else acc[ing] = [item];
        })
        return acc
    }, {});
    const S = new set()
    dfs(N, "NULL", S);
    res = S.size - 1;

	debug(res);
	if (res) exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART2");
	return;
}

function part3(data) {

	let res = 0;
    data = lines(data.trim())
    const N = data.reduce((acc, curr) => {
        const [item, ings] = curr.split(":");
        iter(ings.split(','), ing => {
            if (ing in acc) acc[ing].push(item);
            else acc[ing] = [item];
            if (!(item in acc)) acc[item] = [];
        })
        return acc
    }, {});
    let i = 1;
    const S = [];
    while (true) {
        if (!(`NULLv${i}` in N)) break;
        const SS = new set();
        dfs(N, `NULLv${i}`, SS)
        S.push([...SS])
        ++i;
    }
    iter(keys(N), item => {
        if (in_("NULL", item)) return;
        let cnt = 0;
        iter(S, nulls => {
            if (in_(item, nulls)) ++cnt;
        })
        if (cnt >= 2) {
            ++res;
        }
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

main('06');


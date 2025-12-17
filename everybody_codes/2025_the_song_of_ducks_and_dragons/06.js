
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
	data = singles(data);
	let cnt = 0;
	iter(data, c => {
		if (c === 'A') ++cnt;
		if (c === 'a') res += cnt;
	})

	debug(res);
	if (res) exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART1");
	return;
}

function part2(data) {

	let res = 0;
	data = singles(data);
	const C = new DD(0);
	iter(data, c => {
		if (in_(c, 'ABC')) C[c]++;
		else res += C[c.toUpperCase()]
	})

	debug(res);
	if (res) exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART2");
	return;
}

function part3(data) {

	let res = 0;
	const N = 1000;
	const U = 'ABC'
	const ol = data.length;
	data = singles(data + data + data);
	const w = new DD(0);
	range(N)(i => {
		if (in_(data[i], U)) {
			w[data[i]]++;
		}
	})
	iter(data, (c, i) => {
		if (i - N - 1 >= 0 && in_(data[i-N-1], U)) {
			w[data[i-N-1]]--;
		}
		if (i + N < data.length && in_(data[i+N], U)) {
			w[data[i+N]]++;
		}
		if (!in_(c, U)) {
			const mul = ol <= i && i < 2 * ol ? 998 : 1;
			res += mul * w[c.toUpperCase()];
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


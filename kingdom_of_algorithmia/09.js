
const fs = require('fs');
const { exec } = require("child_process");
const { D4, D6, D8, MOD } = require("../../aoc/lib");
const { joseph, findCycle } = require("../../aoc/lib");
const { cache } = require("../../aoc/lib");
const { bin, float, hex, int, num, oct } = require("../../aoc/lib");
const { range, drange, trange, iter, diter, titer } = require("../../aoc/lib");
const { copy,	entries, in_, inBB, keys, sort, values } = require("../../aoc/lib");
const { Counter, DD, empty, FastQueue, PriorityQueue, Queue, set, Stack } = require("../../aoc/lib");
const { ord, chr, count, debug, disp, disp3, crt, gcd, lcm, modPow, modPowBig, modInv, mod, prod, prodBig, randint, sum, sumBig, transpose } = require("../../aoc/lib");
const { digits, ints,	floats,	singles,	words,	lines,	table,	groups,	getGroups,	groupsWith,	parse,	parseLine, scanf } = require ('../../aoc/lib');
const { min, max, random, abs, ceil, floor, log, log10, log2, round, sign, sin, cos, tan, asin, acos, atan, atan2, sqrt, PI } = Math;
const { isSuperset, or, and, xor, sub } = set;
const { combinations, combinations_with_replacement, next_permutation, product, unique_permutations } = require("../../aoc/lib");

let MEMO = {};
const dfs = (stamps, n, curr = 0) => {
	if ([n, curr] in MEMO) return MEMO[[n, curr]];
	if (n === 0) return curr;
	let res = MOD;
	iter(stamps, m => {
		if (m <= n) {
			res = min(res, dfs(stamps, n - m, curr + 1));
		}
	})
	MEMO[[n, curr]] = res;
	return res;
}

function part1(data) {

	let res = 0;
	const stamps = [1, 3, 5, 10];
	data = ints(data);
	MEMO = {};
	iter(data, n => {
		res += floor(n / 10) + dfs(stamps, n % 10);
	})

	debug(res);
	if (res) exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART1");
	return;
}

function part2(data) {

	let res = 0;
	const stamps = [1, 3, 5, 10, 15, 16, 20, 24, 25, 30];
	data = ints(data);
	stamps.reverse();
	MEMO = {};
	iter(data, n => {
		const tmpGreed = floor(n / stamps[0]) - 4;
		const tmpRes = n - tmpGreed * stamps[0];
		res += tmpGreed + dfs(stamps, tmpRes);
	})

	debug(res);
	if (res) exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART2");
	return;
}

const solveDfs = (stamps, n) => {
	const tmpGreed = floor(n / stamps[0]) - 12;
	const tmpRes = n - tmpGreed * stamps[0];
	return tmpGreed + dfs(stamps, tmpRes);
}

function part3(data) {
	let res = 0;
	const stamps = [1, 3, 5, 10, 15, 16, 20, 24, 25, 30, 37, 38, 49, 50, 74, 75, 100, 101];
	stamps.reverse();
	data = ints(data);

	MEMO = {};
	iter(data, n => {
		let m = floor(n / 2) - 55;
		let mn = MOD;
		range(m, m + 110 + 1)(j => {
			if (abs(n - 2 * j) > 100) return;
			const res1 = solveDfs(stamps, j);
			const res2 = solveDfs(stamps, n - j);
			mn = min(mn, res1 + res2);
		})
		res += mn;
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

main('09');


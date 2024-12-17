
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


function part1(data) {

	let res = 0;
	data = scanf(data, "%w:%.");
	const G = {};
	iter(data, ([from, to]) => {
		to = to.split(',');
		G[from] = to;
	});
	let T = ['A'];
	range(4)(_ => {
		let nT = [];
		iter(T, t => {
			nT = nT.concat(G[t]);
		})
		T = nT;
	})
	res = T.length;

	debug(res);
	if (res) exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART1");
	return;
}

function part2(data) {

	let res = 0;
	data = scanf(data, "%w:%.");
	const G = {};
	iter(data, ([from, to]) => {
		to = to.split(',');
		G[from] = to;
	});
	MEMO = {};
	res = dfs(G, 'Z', 10);
	debug(res);
	if (res) exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART2");
	return;
}

let MEMO = {};
const dfs = (G, k, n) => {
	if (MEMO[[k,n]]) return MEMO[[k, n]];
	if (n === 0) {
		MEMO[[k, n]] = 1;
		return 1;
	}
	let res = 0;
	iter(G[k], child => {
		res += dfs(G, child, n - 1);
	});
	MEMO[[k, n]] = res;
	return res;
}

function part3(data) {
	let res = 0;
	data = scanf(data, "%w:%.");
	const G = {};
	iter(data, ([from, to]) => {
		to = to.split(',');
		G[from] = to;
	});
	let mx = 0;
	let mn = MOD * 1000;
	MEMO = {};
	iter(keys(G), k => {
		const tmp = dfs(G, k, 20);
		mn = min(mn, tmp);
		mx = max(mx, tmp);
	})
	res = mx - mn;

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


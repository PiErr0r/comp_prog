
const fs = require('fs');
const { exec } = require("child_process");
const { ALPHA_L, ALPHA_U, NUMS, D4, D6, D8, MOD } = require("../../aoc/lib");
const { joseph, findCycle } = require("../../aoc/lib");
const { cache } = require("../../aoc/lib");
const { bin, float, hex, int, num, oct } = require("../../aoc/lib");
const { range, drange, trange, iter, diter, titer } = require("../../aoc/lib");
const { copy,	entries, in_, inBB, keys, sort, values } = require("../../aoc/lib");
const { Counter, DD, empty, FastQueue, PriorityQueue, Queue, set, Stack } = require("../../aoc/lib");
const { areaInt, circumference, manDist, shoelace } = require("../../aoc/lib");
const { ord, chr, count, debug, disp, disp3, crt, gcd, lcm, modPow, modPowBig, modInv, mod, prod, prodBig, randint, sum, sumBig, transpose } = require("../../aoc/lib");
const { digits, ints,	floats,	singles,	words,	lines,	table,	groups,	getGroups,	groupsWith,	parse,	parseLine, scanf } = require ('../../aoc/lib');
const { min, max, random, abs, ceil, floor, log, log10, log2, round, sign, sin, cos, tan, asin, acos, atan, atan2, sqrt, PI } = Math;
const { disjoint, isSubset, isSuperset, or, and, xor, sub } = set;
const { combinations, combinations_with_replacement, next_permutation, product, unique_permutations } = require("../../aoc/lib");

const bfs = (G, starts, addTimes = false) => {
	const q = new Queue();
	iter(starts, ([sy, sx]) => {
		q.push([sy, sx, 0]);
	})
	const seen = new set();
	let lastP = 0;
	while (!q.empty()) {
		const [y, x, t] = q.pop();
		if (seen.has([y, x])) continue;
		seen.add([y, x]);
		if (G[y][x] === 'P') {
			if (addTimes) lastP += t;
			else lastP = t;
		}
		iter(D4, ([dy, dx]) => {
			if (!inBB(y+dy, x+dx, G)) return;
			if (G[y+dy][x+dx] === '#') return;
			q.push([y+dy, x+dx, t+1]);
		})
	}
	return lastP;
}

function part1(data) {

	let res = 0;
	data = table(data);

	res = bfs(data, [[1, 0]]);

	debug(res);
	if (res) exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART1");
	return;
}

function part2(data) {

	let res = 0;
	data = table(data);
	const S = [];
	range(data.length)(i => {
		if (data[i][0] === '.') S.push([i, 0]);
		if (data[i][ data[i].length - 1 ] === '.') S.push([i, data[i].length - 1])
	})

	res = bfs(data, S);

	debug(res);
	if (res) exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART2");
	return;
}

function part3(data) {

	let res = 0;
	data = table(data);
	const P = [];
	iter(data, (r, i) => {
		iter(r, (c, j) => {
			if (c === '.') P.push([i, j]);
		})
	})

	res = MOD * 1000
	iter(P, ([py, px], i) => {
		debug(i, '/', P.length, res)
		res = min(res, bfs(data, [[py, px]], true));
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

main('18');


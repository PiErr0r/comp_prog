
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
	const L = 32;
	data = ints(data);
	range(data.length - 1)(i => {
		if (abs(data[i+1] - data[i]) === (L >> 1)) ++res;
	})

	debug(res);
	if (res) exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART1");
	return;
}

function part2(data) {

	let res = 0;
	const L = 256;
	data = ints(data).map(n => n-1);
	const G = empty(L).map(_ => new set());
	range(data.length - 1)(i => {
		const S = new set();
		let j = (data[i+1] + 1) % L;
		while (j !== data[i]) {
			S.add(j);
			j = (j + 1) % L;
		}
		j = (data[i] + 1) % L;
		let tmp = 0
		while (j !== data[i + 1]) {
			tmp += and(G[j], S).size;
			j = (j + 1) % L;
		}
		res += tmp;
		G[data[i]].add(data[i+1]);
		G[data[i+1]].add(data[i]);
	})

	debug(res);
	if (res) exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART2");
	return;
}

function part3(data) {

	let res = 0;
	const L = 256;
	data = ints(data).map(n => n-1);
	const G = {};
	range(data.length - 1)(i => {
		const ki = '' + data[i];
		const ki1 = '' + data[i + 1];
		if (!(ki in G))
			G[ki] = {};
		if (!(ki1 in G))
			G[ki1] = {};
		if (!(ki in G[ki1]))
			G[ki1][ki] = 0;
		if (!(ki1 in G[ki]))
			G[ki][ki1] = 0

		G[ki][ki1]++;
		G[ki1][ki]++;
	});

	let prev = -1;
	drange(L)((i, j) => {
		if (i !== prev) {
			debug(i, res);
			prev = i;
		}
		if (i >= j) return;
		const S = new set();
		let ii = (i + 1) % L;
		while (ii !== j) {
			S.add(ii);
			ii = (ii + 1) % L;
		}
		ii = (j + 1) % L;
		let tmp = 0;
		while (ii !== i) {
			iter(keys(G[ii]), k => {
				if (S.has(int(k))) {
					tmp += G[ii][k];
				}
			})
			ii = (ii + 1) % L;
		}
		tmp += G[i][j] || 0;
		res = max(res, tmp);
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

main('08');


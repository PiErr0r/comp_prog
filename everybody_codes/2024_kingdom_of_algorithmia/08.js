
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
	data = int(data);
	// data = 13;
	// S = 1 + 3 + 5 + ... + (2n - 1)
	// S = (1 + 0) + (2 + 1) + (3 + 2) + (4 + 3) + ... + (n + n - 1)
	// S = 1 + 2 + ... + n + 0 + 1 + 2 + ... + n - 1
	// S = n * (n + 1) / 2 + n * (n - 1) / 2 = n/2 * (n + 1 + n - 1) = n * 2 * n / 2 = n^2
	const n = ceil(sqrt(data));
	const S = 2 * n - 1;
	res = S * (n**2 - data);

	debug(res);
	if (res) exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART1");
	return;
}

function part2(data) {

	let res = 0;
	const nullptr = int(data);
	const acolytes = 1111;
	const blocks = 20240000;

	// const nullptr = 3;
	// const acolytes = 5;
	// const blocks = 50;

	let sm = 0;
	let thickness = 1;
	let w = 1;
	while (sm < blocks) {
		sm += thickness * w;
		w += 2;
		thickness = (thickness * nullptr) % acolytes;
	}
	w -= 2;
	res = (sm - blocks) * w;
	// debug(sm, w)

	debug(res);
	if (res) exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART2");
	return;
}

const calcBlocks = (pref, nullptr, acolytes, w) => {
	let h = pref[pref.length - 1];
	let total = 2 * h;
	let rm = 0;
	for (let i = pref.length - 2; i > 0; --i) {
		h += pref[i];
		total += 2 * h;
		rm += 2 * (nullptr * w * h % acolytes);
		// debug('$$',w, rm, nullptr * w * h % acolytes)
	}
	h += pref[0];
	total += h;
	rm += nullptr * w * h % acolytes;
	// debug('!',total, rm)
	return total - rm;
}

function part3(data) {

	let res = 0;
	const nullptr = int(data);
	const acolytes = 10;
	const blocks = 202400000;
	// original block size - solves in under a minute
	// const blocks = 202400000000;

	let sm = 0;
	let thickness = 1;
	let w = 1;
	const pref = [1];
	let layer = 1;
	while (sm < blocks) {
		thickness = acolytes + (thickness * nullptr) % acolytes;
		pref.push(thickness);
		w += 2;
		sm = calcBlocks(pref, nullptr, acolytes, w);
		++layer;
		if (layer % 10000 === 0)
			debug(layer, sm, blocks - sm);
	}
	res = sm - blocks;

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


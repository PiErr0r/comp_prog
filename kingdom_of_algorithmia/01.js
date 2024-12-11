
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
const { combinations, combinations_with_replacement, next_permutation, product } = require("../../aoc/lib");


const getVal = c => {
	switch (c) {
		case 'A': return 0;
		case 'B': return 1;
		case 'C': return 3;
		case 'D': return 5;
		default: {
			debug("BAD");
			return -1;
		}
	}
}

const L = {
	0: 0,
	1: 0,
	2: 2,
	3: 6,
}

function part1(data) {

	let res = 0;
	iter(data, c => {
		res += getVal(c);
	})

	debug(res);
	exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART1");
	return;
}

function part2(data) {

	let res = 0;
	data = singles(data);
	range(0, data.length, 2)(i => {
		const E = data.slice(i, i + 2).filter(a => a !== 'x');
		res += sum(E.map(a => getVal(a))) + L[E.length];
	})

	debug(res);
	exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART2");
	return;
}

function part3(data) {

	let res = 0;
	data = singles(data);
	range(0, data.length, 3)(i => {
		const E = data.slice(i, i + 3).filter(a => a !== 'x');
		res += sum(E.map(a => getVal(a))) + L[E.length];
	})

	debug(res);
	exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART3");
	return;
}

function main(n) {
	part1(fs.readFileSync(`${n}a_input`).toString("utf-8"));
	part2(fs.readFileSync(`${n}b_input`).toString("utf-8"));
	part3(fs.readFileSync(`${n}c_input`).toString("utf-8"));
	process.exit(0);
}

main('01');

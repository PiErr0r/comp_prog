
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
	let [names, moves] = getGroups(data);
	names = names.split(',');
	let curr = 0;
	iter(moves.split(','), move => {
		const [dir, ...step] = move.split('');
		const ss = int(step.join(''));
		switch (dir) {
		case "R":
			curr = min(curr + ss, names.length - 1);
			break;
		case "L":
			curr = max(curr - ss, 0);
		}
	})
	res = names[curr]

	debug(res);
	if (res) exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART1");
	return;
}

function part2(data) {

	let res = 0;
	let [names, moves] = getGroups(data);
	names = names.split(',');
	let curr = 0;
	iter(moves.split(','), move => {
		const [dir, ...step] = move.split('');
		const ss = int(step.join(''));
		switch (dir) {
		case "R":
			// curr = min(curr + ss, names.length - 1);
			curr = mod(curr + ss, names.length);
			break;
		case "L":
			curr = mod(curr - ss, names.length)
			// curr = max(curr - ss, 0);
		}
	})
	res = names[curr]

	debug(res);
	if (res) exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART2");
	return;
}

const swap = (A, i, j) => {
	const tmp = A[i];
	A[i] = A[j];
	A[j] = tmp;
}

function part3(data) {

	let res = 0;
	let [names, moves] = getGroups(data);
	names = names.split(',');
	let curr = 0;
	iter(moves.split(','), move => {
		const [dir, ...step] = move.split('');
		const ss = (dir === "L" ? -1 : 1) * int(step.join(''));
		swap(names, 0, mod(ss, names.length));
	})
	res = names[0];

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

main('01');


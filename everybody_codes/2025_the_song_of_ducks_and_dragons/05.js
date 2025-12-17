
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
const { create } = require('domain');

class Node {
	constructor(n) {
		this.value = n;
		this.L = null;
		this.R = null;
		this.nxt = null;
	}
}

function insertValue(T, n) {
	let curr = T;
	while (1) {
		if (n < curr.value && curr.L === null) {
			curr.L = n;
			return;
		}
		if (n > curr.value && curr.R === null) {
			curr.R = n;
			return;
		}
		if (curr.nxt !== null) {
			curr = curr.nxt;
		} else {
			break;
		}
	}
	curr.nxt = new Node(n);
}

function createTree(arr) {
	const T = new Node(arr[0]);
	iter(arr.slice(1), n => {
		insertValue(T, n);
	})
	return T;
}

function getQuality(T) {
	let res = '';
	let curr = T;
	while (curr) {
		res += curr.value;
		curr = curr.nxt;
	}
	return int(res);
}

function part1(data) {

	const [head, ...tail] = ints(data);
	const T = createTree(tail);

	const res = getQuality(T);

	debug(res);
	if (res) exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART1");
	return;
}

function part2(data) {

	let res = 0;
	data = lines(data).map(r => ints(r));
	const swords = [];
	iter(data, ([head, ...tail]) => {
		const T = createTree(tail);
		const q = getQuality(T);
		swords.push([head, q]);
	})
	sort(swords, (a, b) => a[1] - b[1]);
	res = swords.at(-1)[1] - swords[0][1];

	debug(res);
	if (res) exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART2");
	return;
}

function getValue(node) {
	return int( (node.L || "") + (node.value + "") + (node.R || "") );
}

function part3(data) {

	let res = 0;
	data = lines(data).map(r => ints(r));
	const swords = [];
	iter(data, ([head, ...tail]) => {
		const T = createTree(tail);
		const q = getQuality(T);
		swords.push([head, q, T]);
	})
	sort(swords, (a, b) => {
		if (b[1] - a[1]) {
			return b[1] - a[1];
		}
		let currA = a[2];
		let currB = b[2];
		while (currA && currB) {
			const A = getValue(currA);
			const B = getValue(currB);
			if (B - A) {
				return B - A
			}
			currA = currA.nxt;
			currB = currB.nxt;
		}
		if (currA && !currB) return -1;
		else if (!currA && currB) return 1;
		return b[0] - b[1];
		console.assert(false, "Shouldn't have come here!");
	});

	iter(swords, ([id, _1, _2], i) => {
		res += id * (i + 1);
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

main('05');


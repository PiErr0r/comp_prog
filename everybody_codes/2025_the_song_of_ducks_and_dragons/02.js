
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

class I {
	constructor(x, y) {
		this.x = x;
		this.y = y;
	}

	add(other) {
		return new I(this.x + other.x, this.y + other.y);
	}

	mul(other) {
		const x = this.x * other.x - this.y * other.y;
		const y = this.x * other.y + this.y * other.x;
		return new I(x, y);
	}

	div(other) {
		const x = int(this.x / other.x);
		const y = int(this.y / other.y);
		return new I(x, y);
	}

	str() {
		return `[${this.x},${this.y}]`;
	}
}

function part1(data) {

	let res = 0;
	let curr = new I(0, 0);
	const A = new I(151,50);
	range(3)(_ => {
		curr = curr.mul(curr);
		curr = curr.div(new I(10, 10));
		curr = curr.add(A);
	})
	res = curr.str();

	debug(res);
	if (res) exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART1");
	return;
}

const check = (i, mx, mn) => {
	return !(i.x <= mx && i.y <= mx && i.x >= mn && i.y >= mn);
}

function part2(data) {

	let res = 0;
	const A = new I(-79785,-16616)
	drange(101)((i, j) => {
		const pt = A.add(new I(j * 10, i * 10))
		const B = new I(100000,100000)
		let failed = false;
		let curr = new I(0, 0);
		range(100)(_ => {
			curr = curr.mul(curr);
			curr = curr.div(B);
			curr = curr.add(pt);
			failed = check(curr, 1000000, -1000000);
			return failed;
		})
		res += !(failed);
	})

	debug(res);
	if (res) exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART2");
	return;
}

function part3(data) {

	let res = 0;
	const A = new I(-79785,-16616)
	drange(1001)((i, j) => {
		const pt = A.add(new I(j, i))
		const B = new I(100000,100000)
		let failed = false;
		let curr = new I(0, 0);
		range(100)(_ => {
			curr = curr.mul(curr);
			curr = curr.div(B);
			curr = curr.add(pt);
			failed = check(curr, 1000000, -1000000);
			return failed;
		})
		res += !(failed);
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

main('02');


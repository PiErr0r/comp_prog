
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

function canCreate(name, rules) {
	let curr = name[0];
	let can = true;
	range(name.length - 1)(i => {
		if (!in_(name[i+1], rules[curr])) {
			can = false;
		}
		curr = name[i+1];
		return !can;
	})
	return can;
}

function getData(data) {
	data = getGroups(data);
	const names = data[0].split(',');
	const rules = lines(data[1])
		.map(r => r.split(' > '))
		.map(r => [r[0], r[1].split(',')])
		.reduce((acc, curr) => {
			const [from, to] = curr;
			acc[from] = to;
			return acc;
		}, {});
	return [names, rules];
}

function part1(data) {

	let res = 0;
	const [names, rules] = getData(data);
	iter(names, name => {
		if (canCreate(name, rules)) {
			res = name;
			return true;
		}
 	})

	debug(res);
	if (res) exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART1");
	return;
}

function part2(data) {

	let res = 0;
	const [names, rules] = getData(data);
	iter(names, (name, i) => {
		if (canCreate(name, rules)) {
			res += i + 1;
		}
 	})

	debug(res);
	if (res) exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART2");
	return;
}

function createAll(name, rules, used) {
	if (used.has(name)) return;
	if (name.length === 11) {
		used.add(name);
		return;
	}
	if (name.length >= 7) {
		used.add(name);
	};
	if (!(name.at(-1) in rules)) return;
	iter(rules[name.at(-1)], c => {
		createAll(name + c, rules, used);
	})
}

function part3(data) {

	let res = 0;
	const [names, rules] = getData(data);
	sort(names);
	const tmp = new set();
	iter(names, (name, i) => {
		if (canCreate(name, rules)) {
			createAll(name, rules, tmp);
		}
 	})

 	res = tmp.size
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

main('07');


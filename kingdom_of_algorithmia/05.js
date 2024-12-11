
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


function part1(data) {

	let res = 0;
	data = transpose(scanf(data, "%d %d %d %d"));
	let r = 0;
	range(10)(_ => {
		const P = data[r].shift();
		r = (r + 1) % data.length;
		const rem = (P - 1) % data[r].length;
		const lr = floor((P - 1) / data[r].length) % 2;
		data[r].splice(lr === 0 ? rem : data[r].length - rem, 0, P);
		res = data.map(r => r[0] + "").join('');
	})

	debug(res);
	if (res) exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART1");
	return;
}

function part2(data) {
	
	let res = 0;
	data = transpose(scanf(data, "%d %d %d %d"))
	
	let r = 0, i = 1;
	const cnt = new DD();
	while (true) {
		const P = data[r].shift();
		r = (r + 1) % data.length;
		const rem = (P - 1) % data[r].length;
		const lr = floor((P - 1) / data[r].length) % 2;
		data[r].splice(lr === 0 ? rem : data[r].length - rem, 0, P);
		const shout = data.map(r => r[0] + "").join('');
		cnt[shout]++;
		if (cnt[shout] === 2024) {
			res = shout * i;
			break;
		}
		++i;
	}

	debug(res); // 11545588932220
	if (res) exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART2");
	return;
}

const toStr = (table) => {
	return table.map(r => r.join('-')).join(':');
}

function part3(data) {

	let res = 0;
	data = transpose(scanf(data, "%d %d %d %d"))
	
	let r = 0, i = 1;
	const seen = new set();
	while (true) {
		const P = data[r].shift();
		r = (r + 1) % data.length;
		const rem = (P - 1) % data[r].length;
		const lr = floor((P - 1) / data[r].length) % 2;
		data[r].splice(lr === 0 ? rem : data[r].length - rem, 0, P);
		const shout = data.map(r => r[0] + "").join('');
		res = max(res, int(shout));
		const S = toStr(data);
		if (seen.has([S, i%4])) break;
		seen.add([S, i%4]);
		++i;
	}
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


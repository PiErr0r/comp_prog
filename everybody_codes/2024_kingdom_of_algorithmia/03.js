
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

const transform = data => {
	let cnt = 0;
	range(data.length)(i => {
		range(data[0].length)(j => {
			if (data[i][j] === '#') {
				data[i][j] = 1;
				++cnt;
			} else {
				data[i][j] = 0;
			}
		})
	})
	return [data, cnt];
}

const tryDig = (G, prev, dir8 = false) => {
	let cnt = 0;
	const nG = copy(G);
	range(G.length)(y => {
		range(G[0].length)(x => {
			if (G[y][x] === prev) {
				let canDig = true;
				iter(dir8 ? D8 : D4, ([dy, dx]) => {
					if (!inBB(y+dy, x+dx, G) || G[y+dy][x+dx] < prev) {
						canDig = false;
					}
				})
				if (canDig) {
					++cnt;
					nG[y][x] = prev + 1;
				}
			}
		})
	})
	return [nG, cnt];
}

function part1(data) {

	let res = 0;
	[data, res] = transform(table(data));
	let dig = true;
	let prev = 1;
	while (dig) {
		let cnt
		[data, cnt] = tryDig(data, prev);
		res += cnt
		++prev;
		dig = cnt > 0;
	}

	debug(res);
	exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART1");
	return;
}

function part2(data) {

	let res = 0;
	[data, res] = transform(table(data));
	let dig = true;
	let prev = 1;
	while (dig) {
		let cnt
		[data, cnt] = tryDig(data, prev);
		res += cnt
		++prev;
		dig = cnt > 0;
	}

	debug(res);
	exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART2");
	return;
}

function part3(data) {

	let res = 0;
	[data, res] = transform(table(data));
	let dig = true;
	let prev = 1;
	while (dig) {
		let cnt
		[data, cnt] = tryDig(data, prev, true);
		res += cnt
		++prev;
		dig = cnt > 0;
	}

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

main('03');

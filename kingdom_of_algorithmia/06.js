
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

const bfs = (G, root, first = false) => {
	const q = new Queue();
	q.push([root, ""]);
	const res = [];
	const seen = new set()
	while (!q.empty()) {
		const [curr, s] = q.pop();
		if (curr === '@') {
			res.push(s + '@');
			continue;
		}
		if (seen.has(curr)) continue;
		seen.add(curr);
		if (!G[curr]) continue;
		iter(G[curr], node => {
			q.push([node, s + (first ? curr[0] : curr)]);
		})
	}
	return res;
}

function part1(data) {

	let res = 0;
	data = lines(data);
	const G = {};
	iter(data, l => {
		const [p, cc] = l.split(':');
		const c = cc.split(',');
		G[p] = [];
		iter(c, node => {
			G[p].push(node);
		})
	})

	const paths = bfs(G, 'RR');
	const lens = new Counter(paths.map(p => p.length));
	iter(keys(lens), k => {
		if (lens[k] === 1) {
			iter(paths, p => {
				if (p.length === int(k)) {
					res = p;
				}
			})
		}
	})

	debug(res);
	if (res) exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART1");
	return;
}

function part2(data) {

	let res = 0;
	data = lines(data);
	const G = {};
	iter(data, l => {
		const [p, cc] = l.split(':');
		const c = cc.split(',');
		G[p] = [];
		iter(c, node => {
			G[p].push(node);
		})
	})

	const paths = bfs(G, 'RR', true);
	const lens = new Counter(paths.map(p => p.length));
	iter(keys(lens), k => {
		if (lens[k] === 1) {
			iter(paths, p => {
				if (p.length === int(k)) {
					res = p;
				}
			})
		}
	})

	debug(res);
	if (res) exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART2");
	return;
}

function part3(data) {

	let res = 0;
	data = lines(data);
	const G = {};
	iter(data, l => {
		const [p, cc] = l.split(':');
		if (p === 'BUG' || p === 'ANT') return;
		const c = cc.split(',');
		G[p] = [];
		iter(c, node => {
			if (node === 'BUG' || node === 'ANT') return;
			G[p].push(node);
		})
	})

	const paths = bfs(G, 'RR', true);
	const lens = new Counter(paths.map(p => p.length));
	iter(keys(lens), k => {
		if (lens[k] === 1) {
			iter(paths, p => {
				if (p.length === int(k)) {
					res = p;
				}
			})
		}
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

main('06');


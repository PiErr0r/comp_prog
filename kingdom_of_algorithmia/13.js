
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

const getDiff = (a, b) => {
	[a, b] = sort([int(a), int(b)]);
	const dba = b - a;
	const dab = 10 + a - b;
	return min(dab, dba);
}

const dijkstra = (G, sy, sx, es) => {
	const q = new PriorityQueue((a, b) => a[2] - b[2]);
	q.push([sy, sx, 0]);
	// const seen = new Map();
	const seen = new set();
	let mn = MOD;
	while (!q.empty()) {
		// debug(q)
		const [y, x, t] = q.pop();
		if (t >= mn) continue;
		if (seen.has([y, x]) /*&& seen.get([y, x]) < t*/) continue;
		// seen.set([y, x], t);
		seen.add([y, x]);
		let found = false;
		iter(es, ([ey, ex]) => {
			if (y === ey && x === ex) {
				mn = min(mn, t);
				return true;
			}
		})
		if (found) continue;
		iter(D4, ([dy, dx]) => {
			if (!inBB(y+dy, x+dx, G)) return;
			if (G[y+dy][x+dx] === '#') return;

			const nT = t + 1 + getDiff(G[y][x], G[y+dy][x+dx]);
			// if (seen.has([y+dy, x+dx]) && seen.get([y+dy, x+dx]) < nT) return;
			q.push([y+dy, x+dx, nT])
		})
	}
	return mn;
}

function part1(data) {

	let res = 0;
	const G = table(data);

	let sy, sx;
	let ey, ex;
	iter(G, (r, i) => {
		iter(r, (c, j) => {
			if (c === 'S') {
				sy = i;
				sx = j;
				G[i][j] = '0';
			}
			if (c === 'E') {
				ey = i;
				ex = j;
				G[i][j] = '0';
			}
		})
	});

	res = dijkstra(G, sy, sx, [[ey, ex]]);

	debug(res);
	if (res) exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART1");
	return;
}

function part2(data) {

	let res = 0;
	const G = table(data);

	let sy, sx;
	let ey, ex;
	iter(G, (r, i) => {
		iter(r, (c, j) => {
			if (c === 'S') {
				sy = i;
				sx = j;
				G[i][j] = '0';
			}
			if (c === 'E') {
				ey = i;
				ex = j;
				G[i][j] = '0';
			}
		})
	});

	res = dijkstra(G, sy, sx, [[ey, ex]]);


	debug(res);
	if (res) exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART2");
	return;
}

function part3(data) {

	let res = 0;
	const G = table(data);

	let sy, sx;
	const es = [];
	iter(G, (r, i) => {
		iter(r, (c, j) => {
			if (c === 'E') {
				sy = i;
				sx = j;
				G[i][j] = '0';
			}
			if (c === 'S') {
				es.push([i, j]);
				G[i][j] = '0';
			}
		})
	});

	res = dijkstra(G, sy, sx, es);

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

main('13');


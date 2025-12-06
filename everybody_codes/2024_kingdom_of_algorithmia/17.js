
const fs = require('fs');
const { exec } = require("child_process");
const { D4, D6, D8, MOD } = require("../../aoc/lib");
const { joseph, findCycle } = require("../../aoc/lib");
const { cache } = require("../../aoc/lib");
const { bin, float, hex, int, num, oct } = require("../../aoc/lib");
const { range, drange, trange, iter, diter, titer } = require("../../aoc/lib");
const { copy,	entries, in_, inBB, keys, sort, values } = require("../../aoc/lib");
const { Counter, DD, empty, FastQueue, PriorityQueue, Queue, set, Stack } = require("../../aoc/lib");
const { areaInt, circumference, manDist, shoelace } = require("../../aoc/lib");
const { ord, chr, count, debug, disp, disp3, crt, gcd, lcm, modPow, modPowBig, modInv, mod, prod, prodBig, randint, sum, sumBig, transpose } = require("../../aoc/lib");
const { digits, ints,	floats,	singles,	words,	lines,	table,	groups,	getGroups,	groupsWith,	parse,	parseLine, scanf } = require ('../../aoc/lib');
const { min, max, random, abs, ceil, floor, log, log10, log2, round, sign, sin, cos, tan, asin, acos, atan, atan2, sqrt, PI } = Math;
const { isSuperset, or, and, xor, sub } = set;
const { combinations, combinations_with_replacement, next_permutation, product, unique_permutations } = require("../../aoc/lib");

const findClosest = (V, G, n = Infinity) => {
	let node = null, mni, mn = MOD * 1000;
	iter(keys(G), k => {
		const [y, x] = scanf(k, "%d,%d")[0];
		iter(V, ([ny, nx], i) => {
			const md = manDist([y, x], [ny, nx]);
			if (md >= n) return;
			if (md < mn) {
				mn = md;
				mni = i;
				node = [y, x];
			}
		})
	})
	return [node, mni];
}

const calcWeight = G => {
	const seen = new set();
	const dfs = node => {
		if (seen.has(node)) return 0;
		seen.add(node);
		let res = 0;
		iter(G[node], child => {
			if (seen.has(child)) return;
			res += manDist(node, child) + dfs(child)
		})
		return res;
	}
	const [y, x] = scanf(keys(G)[0], "%d,%d")[0];
	return dfs([y,x]);
}

function part1(data) {

	let res = 0;
	data = table(data);
	const V = [];
	iter(data, (r, i) => {
		iter(r, (c, j) => {
			if (c === '*') {
				V.push([i, j]);
			}
		})
	});

	const G = {};
	G[V.pop()] = [];
	while (V.length) {
		const [node, i] = findClosest(V, G);
		const other = V.splice(i, 1)[0];
		G[node].push(other);
		if (!G[other]) G[other] = [];
		G[other].push(node);
	}
	res = keys(G).length + calcWeight(G);

	debug(res);
	if (res) exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART1");
	return;
}

function part2(data) {

	let res = 0;
	data = table(data);
	const V = [];
	iter(data, (r, i) => {
		iter(r, (c, j) => {
			if (c === '*') {
				V.push([i, j]);
			}
		})
	});

	const G = {};
	G[V.pop()] = [];
	while (V.length) {
		const [node, i] = findClosest(V, G);
		const other = V.splice(i, 1)[0];
		G[node].push(other);
		if (!G[other]) G[other] = [];
		G[other].push(node);
	}
	res = keys(G).length + calcWeight(G);
	debug(res);
	if (res) exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART2");
	return;
}

const split = G => {
	const Gs = [];

	const seen = new set();

	const bfs = node => {
		const g = [];
		const q = new Queue();
		q.push(node);
		while (!q.empty()) {
			const n = q.pop();
			if (seen.has(n)) continue;
			seen.add(n);
			g.push(n);
			iter(G[n], child => {
				q.push(child);
			})
		}
		return g;
	}

	iter(keys(G), k => {
		const [y, x] = scanf(k, "%d,%d")[0];
		if (!seen.has([y, x])) {
			Gs.push(bfs([y, x]));
		}
	});
	return Gs;
}

function part3(data) {

	let res = 0;
	data = table(data);
	const V = [];
	iter(data, (r, i) => {
		iter(r, (c, j) => {
			if (c === '*') {
				V.push([i, j]);
			}
		})
	});
	const G = {};
	G[V.pop()] = [];
	while (V.length) {
		const [node, i] = findClosest(V, G, 6);
		if (node === null) {
			G[V.pop()] = [];
			continue;
		}
		const other = V.splice(i, 1)[0];
		G[node].push(other);
		if (!G[other]) G[other] = [];
		G[other].push(node);
	}
	const Gs = split(G).map(g => {
		const L = g.length;
		const nG = {};
		nG[g.pop()] = [];
		while (g.length) {
			const [node, i] = findClosest(g, nG);
			const other = g.splice(i, 1)[0];
			nG[node].push(other);
			if (!nG[other]) nG[other] = [];
			nG[other].push(node);
		}
		return calcWeight(nG) + L;
	});
	sort(Gs, (a, b) => b - a);
	res = prod(Gs.slice(0, 3));

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

main('17');


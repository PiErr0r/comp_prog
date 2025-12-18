
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

	let res = 1;
	data = scanf(data, "%d:%w");
	let child = null;
	iter(data, ([id, dna], i) => {
		let isChild = true;
		iter(dna, (c, ci) => {
			let C = null;
			let allSame = true;
			iter(data, ([_, parent], j) => {
				if (j === i) return;
				if (C === null) {
					C = parent[ci];
					return;
				}
				if (parent[ci] !== C) {
					allSame = false;
				}
				return !allSame;
			})
			if (allSame && c !== C) {
				return isChild = false;
			}
			return !isChild
		})
		if (isChild) {
			child = i;
			return true;
		}
	})

	iter(data, ([id, parent], i) => {
		if (i === child) return;
		let curr = getSimilarity(data[child][1], data[i][1]);
		res *= curr;
	})

	debug(res);
	if (res) exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART1");
	return;
}

function getSimilarity(C, P) {
	let res = 0;
	range(C.length)(i => {
		if (C[i] === P[i]) ++res;
	})
	return res;
}

function match(dna, pattern) {
	let isMatch = true;
	range(dna.length)(i => {
		isMatch = pattern[i] === '#' || dna[i] === pattern[i];
		return !isMatch;
	})
	return isMatch;
}

function couldParent(d, d1, d2) {
	let i = 0;
	while (i < d.length) {
		if (d1[i] === d2[i]) {
			if (d[i] !== d1[i]) return false;
		} else {
			if (d[i] !== d1[i] && d[i] !== d2[i]) return false;
		} 
		++i;
	}
	return true;
}

function part2(data) {

	let res = 0;
	data = scanf(data, "%d:%w");
	const D = data.reduce((acc, [id, dna]) => {
		acc[id] = dna;
		return acc;
	}, {})
	const potentials = {};
	diter(data, ([id1, dna1], [id2, dna2]) => {
		if (id1 >= id2) return;
		let c = '';
		range(dna1.length)(i => {
			if (dna1[i] === dna2[i]) c += dna1[i];
			else c += '#';
		})
		if (potentials[c]) {
			potentials[c].push([id1, id2]);
			console.assert(false, potentials[c]);
		} else {
			potentials[c] = [[id1, id2]];
		}
	})
	iter(data, ([id, dna]) => {
		iter(keys(potentials), k => {
			if (match(dna, k)) {
				const [id1, id2] = potentials[k][0];
				if (id === id1 || id === id2) return;
				const dna1 = D[id1];
				const dna2 = D[id2];
				if (!couldParent(dna, dna1, dna2)) return;
				const tmp = getSimilarity(dna, dna1) * getSimilarity(dna, dna2);
				res += tmp;
			}
		})
	})

	debug(res);
	if (res) exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART2");
	return;
}

function connect(G, a, b, c) {
	if (!G[a]) G[a] = {};
	if (!G[b]) G[b] = {};
	if (!G[c]) G[c] = {};
	G[a][b] = true;
	G[a][c] = true;
	G[b][a] = true;
	G[b][c] = true;
	G[c][a] = true;
	G[c][b] = true;
}

function dfs(G, curr, used) {
	if (used.has(curr)) return 0;
	used.add(curr);
	let cnt = 1;
	iter(keys(G[curr]), k => {
		cnt += dfs(G, k, used);
	})
	return cnt;
}

function calcScale(G, curr) {
	const used = new set();
	const q = new Queue();
	q.push(curr);
	while (!q.empty()) {
		const k = q.pop();
		if (used.has(k)) continue;
		used.add(k);
		iter(keys(G[k]), kk => {
			q.push(kk);
		})
	}
	let res = 0;
	iter(used, k => {
		res += int(k);
	})
	return res;
}

function part3(data) {

	let res = 0;
	data = scanf(data, "%d:%w");
	const D = data.reduce((acc, [id, dna]) => {
		acc[id] = dna;
		return acc;
	}, {})
	const potentials = {};
	diter(data, ([id1, dna1], [id2, dna2]) => {
		if (id1 >= id2) return;
		let c = '';
		range(dna1.length)(i => {
			if (dna1[i] === dna2[i]) c += dna1[i];
			else c += '#';
		})
		if (potentials[c]) {
			potentials[c].push([id1, id2]);
			console.assert(false, potentials[c]);
		} else {
			potentials[c] = [[id1, id2]];
		}
	})
	const G = {};
	iter(data, ([id, dna]) => {
		iter(keys(potentials), k => {
			if (match(dna, k)) {
				const [id1, id2] = potentials[k][0];
				if (id === id1 || id === id2) return;
				const dna1 = D[id1];
				const dna2 = D[id2];
				if (!couldParent(dna, dna1, dna2)) return;
				connect(G, id, id1, id2);
			}
		})
	})

	const K = keys(G);
	const used = new set();
	let mx = 0;
	let curr = -1;
	iter(K, k => {
		if (used.has(k)) return;
		const res = dfs(G, k, used);
		if (res > mx) {
			mx = res;
			curr = k;
		}
	})

	res = calcScale(G, curr);

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

main('09');



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


function part1(data) {

	let res = [];
	let [sz, whl] = getGroups(data);
	sz = ints(sz);
	whl = table(whl);
	const W = [];
	let i = 0;
	range(0, whl[0].length, 4)(c => {
		W.push([])
		range(whl.length)(r => {
			if (whl[r][c] === ' ') return true;
			W[i].push(whl[r].slice(c, c + 3))
		})
		++i;
	})

	iter(W, (w, i) => {
		const n = (100 * sz[i]) % w.length;
		res.push(w[n].join(''));
	})

	debug(res.join(" "));
	if (res) exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART1");
	return;
}

const solve = s => {
	const cnt = new Counter(s);
	// debug(s, cnt)
	let res = 0;
	iter(keys(cnt), k => {
		if (cnt[k] >= 3) {
			res += cnt[k] - 2;
		}
	})
	return res;
}

function part2(data) {

	let res = 0;
	const M = 202420242024 + 1;
	// const M = 100000000;
	let [sz, whl] = getGroups(data);
	sz = ints(sz);
	whl = table(whl);
	const W = [];
	let i = 0;
	range(0, whl[0].length, 4)(c => {
		W.push([])
		range(whl.length)(r => {
			if (whl[r][c] === ' ') return true;
			W[i].push(whl[r].slice(c, c + 3))
		})
		++i;
	})

	const N = W.reduce(
		(acc, curr) => {
			acc = lcm(acc, curr.length);
			return acc;
		}, 1);
	
	const S = new Map();
	range(1, N + 2)(j => {
		const tmp = [];
		iter(W, (w, i) => {
			const n = (j * sz[i]) % w.length;
			tmp.push(w[n].join(''));
		})
		const ss = tmp.join("").split("").filter((c, i) => i % 3 !== 1).join("")
		S.set(j, res);
		res += solve(ss)
	})

	const R = S.get(N+1);

	res = floor(M / N) * R + S.get(M % N + 1);

	debug(res);
	if (res) exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART2");
	return;
}

const MEMO = {};
const pull = (sz, W, state, n, wasLeft, first = false) => {
	let [mx, mn] = [0, MOD * 1000];
	const SS = state.map((s, i) => W[i][s].join('')).join('').split("").filter((c, i) => i % 3 !== 1).join("");
	const coins = wasLeft || first ? 0 : solve(SS);
	if (n === 0) return [coins, coins];
	if (MEMO[[...state, n, wasLeft]]) return MEMO[[...state, n, wasLeft]];


	if (!wasLeft) {
		const [llmx, llmn] = pull(sz, W, state.map((s, i) => mod(s-1, W[i].length)), n, true);
		const [lrmx, lrmn] = pull(sz, W, state.map((s, i) => mod(s+1, W[i].length)), n, true);
		mx = max(mx, llmx, lrmx);
		mn = min(mn, llmn, lrmn);
	}
	const [rmx, rmn] = pull(sz, W, state.map((s, i) => mod(s + sz[i], W[i].length)), n - 1, false);
	MEMO[[...state, n, wasLeft]] = [coins + max(mx, rmx), coins + min(mn, rmn)];
	return MEMO[[...state, n, wasLeft]];
}

function part3(data) {

	let res = 0;
	let [sz, whl] = getGroups(data);
	sz = ints(sz);
	whl = table(whl);
	const W = [];
	let i = 0;
	range(0, whl[0].length, 4)(c => {
		W.push([])
		range(whl.length)(r => {
			if (whl[r][c] === ' ') return true;
			W[i].push(whl[r].slice(c, c + 3))
		})
		++i;
	})

	const [mx, mn] = pull(sz, W, W.map(w => 0), 256, false, true);
	res = `${mx} ${mn}`

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

main('16');


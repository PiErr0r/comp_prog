
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

function getMoves(y, x, data) {
	const res = new set();
	iter(D4, ([dy, dx]) => {
		const rx = dx === 0 ? 1 : 0;
		const ry = dy === 0 ? 1 : 0;
		const ny1 = y + 2 * dy + ry;
		const ny2 = y + 2 * dy - ry;
		const nx1 = x + 2 * dx + rx;
		const nx2 = x + 2 * dx - rx;
		if (inBB(ny1, nx1, data)) {
			res.add([ny1, nx1]);
		}
		if (inBB(ny2, nx2, data)) {
			res.add([ny2, nx2]);
		}
	})
	return res;
}

function bfs(G, D, R) {
	const q = new Queue();
	q.push([...D, 0]);
	const S = new set();
	while (!q.empty()) {
		const [y, x, n] = q.pop();
		if (n > R) continue;
		if (S.has([y, x])) continue;
		S.add([y, x]);
		const M = getMoves(y, x, G);
		iter(M, ([ny, nx]) => {
			if (S.has([ny, nx])) return;
			q.push([ny, nx, n + 1]);
		})
	}
	return S;
}

function part1(data) {
	let res = 0;
	data = table(data);
	let D = null;
	iter(data, (r, ri) => {
		iter(r, (c, ci) => {
			if (c === 'D') {
				D = [ri, ci];
			}
		})
	});

	const possible = bfs(data, D, 4);
	iter(data, (r, ri) => {
		iter(r, (c, ci) => {
			if (c === 'S' && possible.has([ri, ci]))
				++res;
		})
	})

	debug(res);
	if (res) exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART1");
	return;
}

function getMoves2(y, x, h, w) {
	const res = new set();
	iter(D4, ([dy, dx]) => {
		const rx = dx === 0 ? 1 : 0;
		const ry = dy === 0 ? 1 : 0;
		const ny1 = y + 2 * dy + ry;
		const ny2 = y + 2 * dy - ry;
		const nx1 = x + 2 * dx + rx;
		const nx2 = x + 2 * dx - rx;
		if (0 <= ny1 && ny1 < h && 0 <= nx1 && nx1 < w) {
			res.add([ny1, nx1]);
		}
		if (0 <= ny2 && ny2 < h && 0 <= nx2 && nx2 < w) {
			res.add([ny2, nx2]);
		}
	})
	return res;
}

function getAllMoves(h, w, moves) {
	let res = new set();
	iter(moves, ([y, x]) => {
		res = or(res, getMoves2(y, x, h, w));
	})
	return res;
}

function countEaten(h, w, D, S, H, n) {
	let moves = new set();
	let res = 0;
	moves.add(D);
	range(n)(_ => {
		moves = getAllMoves(h, w, moves);
		let cnt = 0;
		iter(moves, ([y, x]) => {
			if (S.has([y, x]) && !H.has([y, x])) {
				S.delete([y, x]);
				++cnt;
			}
		})
		// debug("!", _, cnt);
		const nS = new set();
		iter(S, ([y, x]) => {
			if (y + 1 === h) return;
			if (moves.has([y + 1, x]) && !H.has([y + 1, x])) {
				++cnt;
				return;
			}
			nS.add([y+1, x]);
		})
		S = nS;
		// debug("?", _, cnt);
		res += cnt;
	})
	return res;
}

function part2(data) {

	let res = 0;
	data = table(data);
	const H = new set();
	const S = new set();
	let D = null;
	iter(data, (r, ri) => {
		iter(r, (c, ci) => {
			switch (c) {
			case '#':
				H.add([ri, ci]);
				break;
			case 'S':
				S.add([ri, ci]);
				break;
			case 'D':
				D = [ri, ci];
				break;
			}
		})
	})
	const h = data.length;
	const w = data[0].length;

	res = countEaten(h, w, D, S, H, 20);

	debug(res);
	if (res) exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART2");
	return;
}

function part3(data) {

	let res = 0;

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

main('10');


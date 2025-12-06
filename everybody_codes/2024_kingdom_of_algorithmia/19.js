
const fs = require('fs');
const { exec } = require("child_process");
const { ALPHA_L, ALPHA_U, NUMS, D4, D6, D8, MOD } = require("../../aoc/lib");
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
const { disjoint, isSubset, isSuperset, or, and, xor, sub } = set;
const { combinations, combinations_with_replacement, next_permutation, product, unique_permutations } = require("../../aoc/lib");

const rotate = (G, dir, [py, px]) => {
	let R = '';
	iter(D8, ([dy, dx]) => {
		R += G[py+dy][px+dx];
	});
	if (dir === 'R') {
		R = R[R.length - 1] + R.slice(0, R.length - 1);
	} else {
		R = R.slice(1) + R[0];
	}
	iter(D8, ([dy, dx], i) => {
		G[py+dy][px+dx] = R[i];
	});
}

const rotateArr = (G, dir, [py, px]) => {
	let R = [];
	iter(D8, ([dy, dx]) => {
		R.push(G[py+dy][px+dx]);
	});
	if (dir === 'R') {
		R = [R[R.length - 1]].concat(R.slice(0, R.length - 1));
	} else {
		R = R.slice(1).concat([R[0]]);
	}

	iter(D8, ([dy, dx], i) => {
		G[py+dy][px+dx] = R[i];
	});
}

function part1(data) {

	let res = "";

	let [key, msg] = getGroups(data);
	msg = table(msg);
	const H = msg.length - 2;
	const W = msg[0].length - 2;
	range(H)(y => {
		range(W)(x => {
			const i = (y * W + x) % key.length;;
			rotate(msg, key[i], [y + 1, x + 1]);
		})
	})

	let readMsg = false;
	iter(msg, (r, i) => {
		iter(r, (c, j) => {
			if (c === '>') readMsg = true;
			else if (c === '<') readMsg = false;
			else {
				if (readMsg) res += c;
			}
		})
	})

	debug(res);
	if (res) exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART1");
	return;
}

function part2(data) {

	let res = "";

	let [key, msg] = getGroups(data);
	msg = table(msg);
	const H = msg.length - 2;
	const W = msg[0].length - 2;
	const N = 100;
	range(N)(_ => {
		let i = 0;
		range(H)(y => {
			range(W)(x => {
				rotate(msg, key[i], [y + 1, x + 1]);
				i = (i + 1) % key.length;
			})
		})
	})

	let readMsg = false;
	iter(msg, (r, i) => {
		iter(r, (c, j) => {
			if (c === '>') readMsg = true;
			else if (c === '<') readMsg = false;
			else {
				if (readMsg) res += c;
			}
		})
	})


	debug(res);
	if (res) exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART2");
	return;
}

const fH = s => s.map(r => r.join('')).join('');

function part3(data) {

	let res = "";

	let [key, msg] = getGroups(data);
	msg = table(msg);
	const orig = copy(msg);
	iter(msg, (r, i) => {
		iter(r, (c, j) => {
			msg[i][j] = c + `=${i},${j}`
		})
	})
	const H = msg.length - 2;
	const W = msg[0].length - 2;
	const N = 1048576000;
	let i = 0;
	range(H)(y => {
		range(W)(x => {
			rotateArr(msg, key[i], [y + 1, x + 1]);
			i = (i + 1) % key.length;
		})
	})

	const M = {};
	iter(msg, (r, i) => {
		iter(r, (c, j) => {
			const [v, coords] = c.split("=");
			// debug(coords)
			M[coords] = [i, j];
		})
	});

	const cycle = [];
	iter(keys(M), k => {
		let curr = M[k];
		let i = 1;
		while (curr !== k) {
			curr = M[curr] + "";
			++i;
		}
		cycle.push(i);
	})

	iter(keys(M), (k, i) => {
		let curr = M[k] + "";
		let j = 1;
		while (j < (N % cycle[i])) {
			curr = M[curr] + "";
			++j;
		}
		const [oy, ox] = scanf(k, "%d,%d")[0];
		const [y, x] = scanf(curr, "%d,%d")[0];
		msg[y][x] = orig[oy][ox];
	})

	disp(msg);

	let readMsg = false;
	iter(msg, (r, i) => {
		iter(r, (c, j) => {
			if (c === '>') readMsg = true;
			else if (c === '<') readMsg = false;
			else {
				if (readMsg) res += c;
			}
		})
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

main('19');



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

const canHit = ([ty, tx], [y, x]) => {
	const dy = ty - y;
	const dx = tx - x - dy;
	if ((dx % 3) === 0) return floor(dx / 3);
	return 0;
}

function part1(data) {

	let res = 0;
	data = table(data);
	let ay, ax, by, bx, cy, cx, T = [];
	range(data[0].length)(x => {
		const xs = [];
		range(data.length)(y => {
			if (data[y][x] === 'A') [ay, ax] = [y, x];
			if (data[y][x] === 'B') [by, bx] = [y, x];
			if (data[y][x] === 'C') [cy, cx] = [y, x];
			if (data[y][x] === 'T') {
				if (xs.length === 0) xs.push(x);
				xs.push(y);
			}
		});
		T.push(xs);
	});

	iter(T, ([x, ...ys]) => {
		let shoot;
		iter(ys, y => {
			shoot = 0;
			if (!shoot && (shoot = canHit([y, x], [ay, ax]))) res += 1 * shoot;
			if (!shoot && (shoot = canHit([y, x], [by, bx]))) res += 2 * shoot;
			if (!shoot && (shoot = canHit([y, x], [cy, cx]))) res += 3 * shoot;
		})
	})

	debug(res);
	if (res) exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART1");
	return;
}

const calcShoot = (T, [ay, ax], [by, bx], [cy, cx], mul) => {
	let res = 0;
	iter(T, ([x, ...ys]) => {
		let shoot;
		iter(ys, y => {
			shoot = 0;
			if (!shoot && (shoot = canHit([y, x], [ay, ax]))) res += 1 * shoot;
			if (!shoot && (shoot = canHit([y, x], [by, bx]))) res += 2 * shoot;
			if (!shoot && (shoot = canHit([y, x], [cy, cx]))) res += 3 * shoot;
		})
	})
	return mul * res;
}

function part2(data) {

	let res = 0;
	data = table(data);
	let ay, ax, by, bx, cy, cx, T = [], H = [];
	range(data[0].length)(x => {
		const txs = [];
		const hxs = [];
		range(data.length)(y => {
			if (data[y][x] === 'A') [ay, ax] = [y, x];
			if (data[y][x] === 'B') [by, bx] = [y, x];
			if (data[y][x] === 'C') [cy, cx] = [y, x];
			if (data[y][x] === 'T') {
				if (txs.length === 0) txs.push(x);
				txs.push(y);
			}
			if (data[y][x] === 'H') {
				if (hxs.length === 0) hxs.push(x);
				hxs.push(y);
			}
		});
		T.push(txs);
		H.push(hxs);
	});

	res += calcShoot(T, [ay, ax], [by, bx], [cy, cx], 1);
	res += calcShoot(H, [ay, ax], [by, bx], [cy, cx], 2);

	debug(res);
	if (res) exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART2");
	return;
}

function part3(data) {

	let res = 0;
	data = scanf(data, "%d %d");
	const A = [0, 0], B = [1, 0], C = [2, 0];
	iter(data, ([tx, ty]) => {
		const R = [A, B, C].map(([y, x], i) => {
			const dy = ty - y;
			const dx = tx - x;
			const dP = tx - ty + i;
			if (dP < 0) return MOD;
			debug(i, dP, tx, ty, dy, dx)
			if (dy === dx) return (i + 1) * floor(dy / 2);
			else if (dx <= dy && dy <= 2*dx) return (i + 1) * (dy) 
			else if (dy <= dx && (dy + dx) % 3 === 0) return floor((dy + dx) / 3)
			// else if ((ty - dP) && (ty - dP) % 2 === 0) return (i + 1) * floor(abs(ty - dP) / 2)
			// else if (dy > dP && (ty - dP) % 2 === 0) return (i + 1) * floor((ty-dP) / 2);
			// else if (ty > dP && (ty - dP) % 2 === 0) return (i + 1) * floor((ty - dP) / 2)
			// else if ((ty - dP) && (ty - dP) % 2 === 0) return (i + 1) * floor((dP - ty) / 2)
			else {
				return MOD;
			}
			return MOD;
		})

		// debug(R.map((n, i) => n !== MOD ? n / (i + 1) : MOD), res)
		const tmp = min(...R);
		console.log(tmp, R)
		console.assert(tmp !== MOD);
		res += tmp;
		// if (R[0] !== MOD && R[0] < 2*R[1] && R[0] < 3*R[2]) {
		// 	res += R[0];
		// } else if (R[1] !== MOD && 2*R[1] < 3*R[2]) {
		// 	res += 2 * R[1];
		// } else if (R[2] !== MOD) {
		// 	res += 3 * R[2];
		// } else {
		// 	debug("BAD");
		// 	process.exit(5);
		// }
		// if (R[0] >= R[1] && R[0] >= R[2]) {
		// 	res += R[0];
		// } else if (R[1] >= R[2]) {
		// 	res += 2 * R[1];
		// } else {
		// 	res += 3 * R[2];
		// }
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

main('12');


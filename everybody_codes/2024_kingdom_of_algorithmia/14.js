
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

	let res = 0;
	const dirs = data.split(',');
	let h = 0;
	iter(dirs, m => {
		const d = m[0];
		const n = int(m.slice(1));
		// debug(n, m)
		if (d === 'U') h += n;
		else if (d === 'D') h -= n;
		res = max(res, h);
	})

	debug(res);
	if (res) exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART1");
	return;
}

const D = {
	'U': [0, 0,  1],
	'D': [0, 0, -1],
	'F': [0,  1, 0],
	'B': [0, -1, 0],
	'R': [ 1, 0, 0],
	'L': [-1, 0, 0],
}

function part2(data) {

	let res = 0;
	const seen = new set();
	const L = lines(data);

	iter(L, l => {
		let [x, y, z] = [0, 0, 0];
		dirs = l.split(',');
		iter(dirs, m => {
			const d = m[0];
			const n = int(m.slice(1));
			const [dx, dy, dz] = D[d];
			range(n)(_ => {
				x += dx;
				y += dy;
				z += dz;
				seen.add([x, y, z]);
			})
		})
	})
	res = seen.size;

	debug(res);
	if (res) exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART2");
	return;
}

const bfs = (G, [lx, ly, lz], [ex, ey, ez]) => {
	const q = new Queue();
	q.push([lx, ly, lz, 0]);
	const seen = new set();
	while (!q.empty()) {
		const [x, y, z, score] = q.pop();
		if (seen.has([x, y, z])) continue;
		seen.add([x, y, z]);
		if (x === ex && y === ey && z === ez) {
			return score;
		}
		iter(values(D), ([dx, dy, dz]) => {
			if (G.has([x+dx, y+dy, z+dz])) {
				q.push([x+dx, y+dy, z+dz, score + 1]);
			}
		})
	}
	return -1;
}

function part3(data) {

	let res = 0;
	const L = lines(data);
	const leaves = new set();
	let zz = 0, mxz = 0;
	const zs = [];
	const seen = new set();
	iter(L, l => {
		let [x, y, z] = [0, 0, 0];
		dirs = l.split(',');
		iter(dirs, m => {
			const d = m[0];
			const n = int(m.slice(1));
			const [dx, dy, dz] = D[d];
			range(n)(_ => {
				x += dx;
				y += dy;
				z += dz;
				mxz = max(mxz, z);
				seen.add([x, y, z]);
			})
		})
		leaves.add([x, y, z]);
	})

	res = MOD;
	range(1, mxz + 1)(z => {
		if (!seen.has([0, 0, z])) return;
		let tmp = 0;
		iter(leaves, ([lx, ly, lz]) => {
			const res = bfs(seen, [lx, ly, lz], [0, 0, z]);
			if (res === -1) {
				tmp = MOD * 1000;
				return true;
			}
			tmp += res;
		})
		res = min(res, tmp);
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

main('14');


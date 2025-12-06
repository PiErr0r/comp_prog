
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

const err = (s) => {
	throw new Error(s);
}

const dijkstra1 = (G, [sz, sy, sx], T) => {
	const q = new PriorityQueue((a, b) => b[0] - a[0] || b[3] - a[3]);
	const seen = new Map();
	q.push([sz, sy, sx, 0, 0, 0]) // z y x t dy dx
	let mx = 0;
	while (!q.empty()) {
		const [z, y, x, t, pdy, pdx] = q.pop();
		if (t === T) {
			mx = max(mx, z);
			continue;
		}
		const S = [y, x, t, pdy, pdx] + "";
		if (seen.has(S) && seen.get(S) >= z) continue;
		seen.set(S, z);
		if (mx - (T - t) >= z) continue;

		iter(D4, ([dy, dx]) => {
			if (dy === -pdy && dx === -pdx) return;
			const [ny, nx] = [y+dy, x+dx];
			if (!inBB(ny, nx, G)) return;
			const g = G[ny][nx];
			if (g === '#') return;
			const dz = g === '.' ? -1 : g === '-' ? -2 : g === '+' ? 1 : err("BAD");
			q.push([z+dz, ny, nx, t + 1, dy, dx]);
		})
	}
	return mx;
}

function part1(data) {

	let res = 0;
	data = table(data);
	let sy, sx;
	iter(data, (r, i) => {
		iter(r, (c, j) => {
			if (c === 'S') {
				sy = i;
				sx = j;
			}
		})
	})
	data[sy][sx] = '.';

	res = dijkstra1(data, [1000, sy, sx], 100);

	debug(res);
	if (res) exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART1");
	return;
}

const nextCheckpoint = (c) => {
	switch (c) {
		case 'A': return 'B';
		case 'B': return 'C';
		case 'C': return 'S';
		case 'S': return null;
		default: err(); return null;
	}
}

const getW = ([z, y, x], togo, checks, mul = 10) => {
	if (togo === 'S') {
		const D = manDist([y, x], checks['S']);
		// return (z >= 10000 ? 0 : 10000 - z) + D;
		return (z >= (10000 + D) ? 0 : (10000 + D - z));
	} else {
		// debug(togo, checks[togo])
		return manDist([y, x], checks[togo]) + mul * getW([10000, ...checks[togo]], nextCheckpoint(togo), checks, mul);
	}
}

const dijkstra2 = (G, [sz, sy, sx], _nxt, checks, sdy, sdx) => {
	const q = new PriorityQueue((a, b) => {
		const [az, ay, ax, at, ady, adx, anxt] = a;
		const [bz, by, bx, bt, bdy, bdx, bnxt] = b;
		const wa = getW([az, ay, ax], anxt, checks, 1);
		const wb = getW([bz, by, bx], bnxt, checks, 1);
		// debug(at + wa, )
		return(at + wa) - (bt + wb);// || bz - az;
	});
	q.push([sz, sy, sx, 0, 0, 0, _nxt, ""]) // z y x t dy dx next
	// q.push([sz, sy, sx, 0, sdy, sdx, "S", ""]) // z y x t dy dx next
	const seen = new Map();
	// let mn = MOD * 1000;
	let mn = 537;
		// manDist([sy, sx], checks['A']) + 
		// manDist(checks['A'], checks['B']) + 
		// manDist(checks['B'], checks['C']) + 
		// manDist(checks['C'], checks['S']) + 
		// 20 * G.length + 20 *  G[0].length;
		debug(mn, sz);
	let i = 0;
	while (!q.empty()) {
		if (i % 100000 === 0) {
			debug(q.size)
		}
		++i;
		const [z, y, x, t, pdy, pdx, nxt, PP] = q.pop();
		// debug(PP)
		// debug(t, G[y][x], z, y, x, nxt)
		if (t && G[y][x] === 'S' && nxt === 'S') {
			mn = min(mn, t);
			debug(mn, t, z)
			continue;
		}
		// debug("!!!")
		const S = [z, y, x, pdy, pdx, nxt] + "";
		if (seen.has(S) && seen.get(S) <= t) continue;
		seen.set(S, t);
		// debug("@@@", getW([z, y, x], nxt, checks, 1))
		// debug(nxt)
		if (t + getW([z, y, x], nxt, checks, 1) >= mn) continue;
		// debug([z, y, x, nxt], t, getW([z, y, x], nxt, checks, 1), t + getW([z, y, x], nxt, checks, 1))

		iter(D4, ([dy, dx]) => {
			// debug(1);
			if (dy === -pdy && dx === -pdx) return;
			const [ny, nx] = [y+dy, x+dx];
			// debug(2);
			if (!inBB(ny, nx, G)) return;
			const g = G[ny][nx];
			// debug(3, y, x, ny, nx, g);
			if (g === '#') return;
			// debug(4);
			if (g === 'S' && z <= 10000) return;
			// debug(5);
			const dz = (g !== '+' && g !== '-') ? -1 : g === '-' ? -2 : g === '+' ? 1 : err("BAD");
			q.push([z + dz, ny, nx, t + 1, dy, dx, G[y][x] === nxt ? nextCheckpoint(nxt) : nxt, ""/*PP + " - " + [y,x]*/]);
		})
	}
	return mn;
}

const bfs = (G, [sz, sy, sx], _nxt, sdy, sdx, checks) => {
	const q = new Queue();
	q.push([sz, sy, sx, 0, sdy, sdx]);
	const seen = new set();
	let mn = manDist([sy, sx], checks[_nxt]) + 50;
	let mxz = 0, mdy = 0, mdx = 0;
	let i = 0;
	while (!q.empty()) {
		const [z, y, x, t, pdy, pdx] = q.pop();
		if (i % 10000 === 0) {
			debug(q.size(), t + manDist([y, x], checks[_nxt]), mn)
		}
		++i;
		if (t > mn) continue;
		if (t + manDist([y, x], checks[_nxt]) > mn) continue;
		if (seen.has([z, y, x, pdy, pdx])) continue;
		seen.add([z, y, x, pdy, pdx]);
		if (G[y][x] === _nxt) {
			if (t < mn) {
				mn = t;
				mxz = z;
				mdy = pdy;
				mdx = pdx;
				debug('!',mn, mxz, mdy, mdx)
			} else if (t === mn) {
				if (z > mxz) {
					mxz = z;
					mdy = pdy;
					mdx = pdx;
				}
			}
		}
		iter(D4, ([dy, dx]) => {
			if (dy === -pdy && dx === -pdx) return;
			const [ny, nx] = [y + dy, x + dx];
			if (!inBB(ny, nx, G)) return;
			const g = G[ny][nx];
			if (g === '#') return;
			const dz = (g !== '+' && g !== '-') ? -1 : g === '-' ? -2 : g === '+' ? 1 : err("BAD");
			q.push([z+dz, ny, nx, t + 1, dy, dx])
		})
	}

	return [mn, mxz, mdy, mdx];
}

function part2(data) {

	let res = 0;
	data = table(data);
	let sy, sx;
	const checks = {};
	iter(data, (r, i) => {
		iter(r, (c, j) => {
			if (c === 'S') {
				sy = i;
				sx = j;
			}
			if (in_(c, 'ABCS')) {
				checks[c] = [i, j];
			}
		})
	})
	// debug(getW([10000, sy, sx], 'A', checks, 1))
	// return
	// const GOALS = 'ABC';
	// let prevmn, prevz, prevdy, prevdx;
	// iter(GOALS, (togo, i) => {
	// 	const [y, x] = i === 0 ? [sy, sx] : checks[ GOALS[i - 1] ]; 
	// 	const [z, dy, dx] = i === 0 ? [10000, 0, 0] : [prevz, prevdy, prevdx];
	// 	[prevmn, prevz, prevdy, prevdx] = bfs(data, [z, y, x], togo, dy, dx, checks);
	// 	res += prevmn;
	// 	debug("@@@", res, prevmn, prevz, prevdy, prevdx)
	// })
	res = dijkstra2(data, [10000, sy, sx], 'A', checks, 0, 0);
	debug("@@@")

	debug(res);
	if (res) exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART2");
	return;
}

function part3(data) {

	let res = 0;
	let H = 384400;
	/**
		> 384400 - 3
		384397
		> (384400 - 3) / 2
		192198.5
		> a = (384400 - 3) / 2
		192198.5
		> a = floor(a)
		Uncaught ReferenceError: floor is not defined
		> a = Math.floor(a)
		192198
		> b = 384400
		384400
		> (b - 3) - a * 2
		1
		> 1 + b * 4 + 1
		1537602
		> b
		384400
		> 1 + a * 4 + 1
		768794
*/

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

main('20');


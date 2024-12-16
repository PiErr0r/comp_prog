
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


const solve = T => {
	let res = '';
	iter(T, (r, i) => {
		iter(r, (c, j) => {
			if (c === '.') {
				let C = '';
				let R = '';
				range(T.length)(k => {
					if (T[i][k] !== '.') R += T[i][k];
					if (T[k][j] !== '.') C += T[k][j];
				});
				C = new set(C);
				R = new set(R);
				res += and(C, R).values().next().value;
			}
		})
	})
	return res;
}

function part1(data) {

	let res = solve(table(data));

	debug(res);
	if (res) exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART1");
	return;
}

const V = {A:1, B:2, C:3, D:4, E:5, F:6, G:7, H:8, I:9, J:10, K:11, L:12, M:13, N:14, O:15, P:16, Q:17, R:18, S:19, T:20, U:21, V:22, W:23, X:24, Y:25, Z:26};

function part2(data) {

	let res = 0;
	data = table(data);
	range(0, data.length, 9)(i => {
		range(0, data[0].length, 9)(j => {
			const T = data.slice(i, i + 8).map(r => r.slice(j, j + 8));
			const s = solve(T);
			iter(s, (c, i) => {
				res += V[c] * (i + 1);
			})
		})
	})

	debug(res);
	if (res) exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART2");
	return;
}

const trySolve = T => {
	let res = '';
	iter(T, (r, i) => {
		iter(r, (c, j) => {
			if (c === '.') {
				let C = '';
				let R = '';
				range(T.length)(k => {
					if (T[i][k] !== '.' && T[i][k] !== '?') R += T[i][k];
					if (T[k][j] !== '.' && T[k][j] !== '?') C += T[k][j];
				});
				C = new set(C);
				R = new set(R);

				if (and(C, R).size === 1)
					res += and(C, R).values().next().value;
				else
					res += ' ';
			}
		})
	});

	if (!in_(' ', res)) {
		return [true, res];
	}

	res = res.split('');
	let cnt;
	do {
		cnt = 0;
		range(res.length)(ii => {
			if (res[ii] !== ' ') return;
			const i = floor(ii / 4);
			const j = ii % 4;
			let R = T[i + 2][0] + T[i + 2][1] + T[i + 2][6] + T[i + 2][7];
			let C = T[0][j + 2] + T[1][j + 2] + T[6][j + 2] + T[7][j + 2];
			let Rm = res.slice(4 * i, 4 * (i + 1));
			let Cm = res.filter((_, jj) => jj % 4 === j);
			if (in_('?', R) && in_('?', C)) {
				return;
			} else if (in_('?', R)) {
				const ri = R.indexOf('?');
				const CC = new Counter(C);
				iter(Cm, c => {
					if (!(c in CC)) return;
					CC[c]--;
					if (CC[c] === 0) delete CC[c];
				})
				if (keys(CC).length === 1 && values(CC)[0] === 1) {
					res[ii] = keys(CC)[0];
					++cnt;
					T[i + 2][floor(ri / 2) * 6 + (ri % 2)] = keys(CC)[0];
				}
			} else if (in_('?', C)) {
				const ci = C.indexOf('?');
				const RR = new Counter(R);
				iter(Rm, c => {
					if (!(c in RR)) return;
					RR[c]--;
					if (RR[c] === 0) delete RR[c];
				})
				if (keys(RR).length === 1 && values(RR)[0] === 1) {
					res[ii] = keys(RR)[0];
					++cnt;
					T[floor(ci / 2) * 6 + (ci % 2)][j + 2] = keys(RR)[0];
				}
			}
		})
	} while (cnt !== 0);
	if (!in_(' ', res)) return [true, res.join('')];
	else return [false, ''];
}

function part3(data) {

	let res = 0;
	let prev = -1;
	data = table(data);

	while (prev !== res) {
		prev = res;
		res = 0;
		range(0, data.length - 2, 6)(i => {
			range(0, data[0].length - 2, 6)(j => {
				const T = data.slice(i, i+8).map(r => r.slice(j, j+8));
				const [solvable, s] = trySolve(T);
				if (solvable) {
					iter(s, (c, i) => {
						res += V[c] * (i + 1);
					})
					range(T.length)(y => {
						range(T[0].length)(x => {
							data[i + y][j + x] = T[y][x];
						})
					})
				}
			})
		})
	}

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


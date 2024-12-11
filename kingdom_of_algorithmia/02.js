
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
const { combinations, combinations_with_replacement, next_permutation, product } = require("../../aoc/lib");


function part1(data) {

	let res = 0;
	const [W, insc] = getGroups(data);
	const [_, runic_] = W.split(':');
	const runic = new set();

	runic_.split(',').forEach(w => runic.add(w));
	const lens = [...new set([...runic].map(w => w.length))];

	range(insc.length)(i => {
		iter(lens, l => {
			res += runic.has(insc.slice(i, i + l));
		})
	})

	debug(res);
	exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART1");
	return;
}

function part2(data) {

	let res = 0;
	const [W, insc] = getGroups(data);
	const [_, runic_] = W.split(':');
	const runic = new set();

	runic_.split(',').forEach(w => (runic.add(w), runic.add(w.split('').reverse().join(''))));
	const lens = [...new set([...runic].map(w => w.length))];
	iter(lines(insc), L => {
		const found = new set();
		range(L.length)(i => {
			iter(lens, l => {
				const w = L.slice(i, i + l);
				if (runic.has(w)) {
					iter(w, (c, j) => {
						found.add([c, i+j]);
					})
				}
			})
		})
		res += found.size;
	})

	debug(res);
	exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART2");
	return;
}

function part3(data) {

	let res = 0;
	let [W, insc] = getGroups(data);
	const [_, runic_] = W.split(':');
	const runic = runic_.split(',');
	insc = table(insc);
	const [Y, X] = [insc.length, insc[0].length];

	const found = new set();
	iter(insc, (r, i) => {
		iter(r, (c, j) => {
			iter(runic, rune => {
				if (c !== rune[0]) return;
				let [y, x] = [i, j];
				iter(D4, ([dy, dx]) => {
					let isRune = true;
					range(rune.length)(k => {
						if (y + k * dy < 0 || y + k * dy >= Y) {
							isRune = false;
							return;
						}
						if (rune[k] !== insc[y + k * dy][mod(x + k * dx, X)])
							isRune = false;
						return !isRune;
					})
					if (isRune) {
						range(rune.length)(k => {
							found.add([y + k * dy, mod(x + k * dx, X)]);
						})
					}
				})
			})
		})
	})
	// disp(insc)
	// debug(found)
	res = found.size;		
	
	debug(res);
	exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART3");
	return;
}

function main(n) {
	part1(fs.readFileSync(`${n}a_input`).toString("utf-8"));
	part2(fs.readFileSync(`${n}b_input`).toString("utf-8"));
	part3(fs.readFileSync(`${n}c_input`).toString("utf-8"));
	process.exit(0);
}

main('02');

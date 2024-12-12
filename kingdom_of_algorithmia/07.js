
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

const getData = data => {
	return lines(data).reduce((acc, curr) => {
		const [chariot, act] = curr.split(':');
		const actions = act.split(',').join('');
		acc[chariot] = actions;
		return acc;
	}, {});
}

const OP = {
	'+': 1,
	'-': -1,
	'=': 0,
};

function part1(data) {

	let res = 0;
	data = getData(data);

	const total = new DD();
	const G = new DD();
	keys(data).forEach(k => (G[k] = 10))

	range(10)(i => {
		iter(keys(data), k => {
			G[k] += OP[ data[k][ i % data[k].length ] ];
			total[k] += G[k];
		})
	})

	const chariots = entries(total);
	sort(chariots, (a, b) => b[1] - a[1]);
	res = chariots.map(c => c[0]).join('')

	debug(res);
	if (res) exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART1");
	return;
}

const __TRACK2 = table(`S-=++=-==++=++=-=+=-=+=+=--=-=++=-==++=-+=-=+=-=+=+=++=-+==++=++=-=-=--
-                                                                     -
=                                                                     =
+                                                                     +
=                                                                     +
+                                                                     =
=                                                                     =
-                                                                     -
--==++++==+=+++-=+=-=+=-+-=+-=+-=+=-=+=--=+++=++=+++==++==--=+=++==+++-`);
const TRACK2 = "-=++=-==++=++=-=+=-=+=+=--=-=++=-==++=-+=-=+=-=+=+=++=-+==++=++=-=-=--" +
	"-=++==-" +
	"-+++==++=+=--==++==+++=++=+++=--=+=-=+=-+=-+=-+-=+=-=+=-+++=+==++++==--" +
	"-=+=+=-S";

function part2(data) {

	let res = 0;
	data = getData(data);

	const total = new DD();
	const G = new DD();
	keys(data).forEach(k => (G[k] = 10))

	let i = 0;
	while (i < 10 * TRACK2.length) {
		const curr = TRACK2[i % TRACK2.length];
		if (curr === '+' || curr === '-') {
			iter(keys(data), k => {
				G[k] += OP[curr];
				total[k] += G[k];
			})			
		} else {
			iter(keys(data), k => {
				G[k] += OP[ data[k][ i % data[k].length ] ];
				total[k] += G[k];
			})
		}
		++i;
	}

	const chariots = entries(total);
	sort(chariots, (a, b) => b[1] - a[1]);
	res = chariots.map(c => c[0]).join('')

	debug(res);
	if (res) exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART2");
	return;
}

const __TRACK3 = table(`S+= +=-== +=++=     =+=+=--=    =-= ++=     +=-  =+=++=-+==+ =++=-=-=--
- + +   + =   =     =      =   == = - -     - =  =         =-=        -
= + + +-- =-= ==-==-= --++ +  == == = +     - =  =    ==++=    =++=-=++
+ + + =     +         =  + + == == ++ =     = =  ==   =   = =++=       
= = + + +== +==     =++ == =+=  =  +  +==-=++ =   =++ --= + =          
+ ==- = + =   = =+= =   =       ++--          +     =   = = =--= ==++==
=     ==- ==+-- = = = ++= +=--      ==+ ==--= +--+=-= ==- ==   =+=    =
-               = = = =   +  +  ==+ = = +   =        ++    =          -
-               = + + =   +  -  = + = = +   =        +     =          -
--==++++==+=+++-= =-= =-+-=  =+-= =-= =--   +=++=+++==     -=+=++==+++-`);

const getTrack = track => {
	let [py, px] = [0, 0];
	let [y, x] = [0, 1];
	let S = '';
	do {
		S += track[y][x];
		iter(D4, ([dy, dx]) => {
			if (!inBB(y+dy, x+dx, track)) return;
			if (y+dy === py && x+dx === px) return;
			if (track[y+dy][x+dx] !== ' ') {
				[py, px] = [y, x];
				[y, x] = [y+dy, x+dx];
				return true;
			}
		})
	} while (track[py][px] !== 'S');
	return S;
}

function part3(data) {

	let res = 0;
	data = getData(data);
	const TRACK = getTrack(__TRACK3);
	const plan = "+++++---===";

	iter(unique_permutations(plan), (me, mei) => {
		data['me'] = me.join('');
		const total = new DD();
		const G = new DD();
		keys(data).forEach(k => (G[k] = 10))

		let i = 0;
		let CC = 0, prev = 0;
		while (i < 2024 * TRACK.length) {

			if (i && i % TRACK.length === 0 && i % me.length === 0) {
				break;
			}
			if (CC === 5) break;
			const curr = TRACK[i % TRACK.length];
			if (curr === '+' || curr === '-') {
				if (G['A'] + OP[curr] >= 0)
					G['A'] += OP[curr];
				total['A'] += G['A'];
				if (G['me'] + OP[curr] >= 0)
					G['me'] += OP[curr];
				total['me'] += G['me'];			
			} else {
				if (G['A'] + OP[ data['A'][ i % data['A'].length ] ] >= 0)
					G['A'] += OP[ data['A'][ i % data['A'].length ] ];
				total['A'] += G['A'];
				if (G['me'] + OP[ data['me'][ i % data['me'].length ] ] >= 0)
					G['me'] += OP[ data['me'][ i % data['me'].length ] ];
				total['me'] += G['me'];
			}
			++i;
		}
		if (total['me'] > total['A']) ++res;
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

main('07');


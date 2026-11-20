
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

const add = (a, b) => {
    if (a === 'K' || b === 'K') return 'K';
    else if (a === b) return a;
    else if (a === 'C' && b === 'M' || a === 'M' && b === 'C') return 'B'
    else if (a === 'C' && b === 'Y' || a === 'Y' && b === 'C') return 'G'
    else if (a === 'Y' && b === 'M' || a === 'M' && b === 'Y') return 'R'
    console.assert(false)
}

function part1(data) {

	let res = 0;
    const [T1, T2] = getGroups(data).map(T => table(T))
    const R = { R: 0, G: 0, B: 0, C: 0, M: 0, Y: 0, K: 0 }
    range(T1.length)(y => {
        range(T1[0].length)(x => {
            const r = add(T1[y][x], T2[y][x])
            R[r]++
        })
    })
    const V = values(R)
    sort(V, (a, b) => b - a)
    res = prod(V.slice(0, 3))

	debug(res);
	if (res) exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART1");
	return;
}

const replace = (c, perm, C) => {
    const i = perm.indexOf(c)
    console.assert(i !== -1)
    return C[i]
}

function part2(data) {

	let res = 0;
    const C = 'CMYK'
    const P = unique_permutations('1234')
    const [T1, T2] = getGroups(data).map(T => table(T))
    let mx = 0;
    iter(P, perm => {
        const R = { R: 0, G: 0, B: 0, C: 0, M: 0, Y: 0, K: 0 }
        range(T1.length)(y => {
            range(T1[0].length)(x => {
                const r = add(T1[y][x], replace(T2[y][x], perm, C))
                R[r]++
            })
        })
        const V = values(R)
        sort(V, (a, b) => b - a)
        mx = max(mx, prod(V.slice(0, 3)))
    })
    res = mx

	debug(res);
	if (res) exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART2");
	return;
}

function part3(data) {

    const T = table(data)
    const K = count(data, 'K')
    const a = T.length
    const b = T[0].length
    const r = a * b - K
    let res = 1;
    const n = floor(r / 3)
    let residue = r % 3
    range(3)(_ => {
        res *= (n + (residue > 0 ? 1 : 0))
        --residue
    })

	debug(res);
	if (res) exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART3");
	return;
}

function main(n) {
	part1(fs.readFileSync(`${n}a_input`).toString("utf-8").trim());
	part2(fs.readFileSync(`${n}b_input`).toString("utf-8").trim());
	part3(fs.readFileSync(`${n}c_input`).toString("utf-8").trim());
	process.exit(0);
}

main('19');


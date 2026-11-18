
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

function get_d(data) {
    const D = {}
    let prev = 0;
    for (let i = 1; i <= data.length; ++i) {
        if (i === data.length || data[i] !== data[prev]) {
            if (!(data[prev] in D)) D[data[prev]] = []
            D[data[prev]].push([prev, i - prev]);
            prev = i;
        }
    }
    return D;
}

function solve_flip(data) {
    let res = 0;
    let D = get_d(data)
    while (keys(D).some(k => D[k].length > 1)) {
        let fk = null
        iter(keys(D), k => {
            if (D[k].length <= 1) return;
            if (fk === null) fk = k
            else if (D[k].length > 1 && D[k][0][0] < D[fk][0][0]) fk = k
        })
        let ai = sum(D[fk][0]);
        let bi = sum(D[fk].at(-1)) - 1;
        while (ai < bi) {
            const tmp = data[ai]
            data[ai] = data[bi]
            data[bi] = tmp;
            ai++
            bi--
        }
        ++res
        D = get_d(data)
    }
    return res;
}

function part1(data) {

	let res = 0;
    data = singles(data)
    res = solve_flip(data)

	debug(res);
	if (res) exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART1");
	return;
}

function solve_len(data) {
    let curr = data[0];
    let res = 0;
    let T = new Array(data.length).fill(0)
    let n = data.length - 1
    do {
        let l = 0
        let r = data.length - 1;
        let rev = false;
        while (l < r && data[l] === curr) ++l;
        while (l < r && data[r] !== curr) T[n--] = data[r--];
        while (l <= r) {
            if (l === r) {
                if (data[l] !== curr) T[n--] = data[l]
                break;
            }
            // debug(r + 1 - l)
            res += r + 1 - l
            if (rev) {
                while (l < r && data[l] === curr && data[r] !== curr) {
                    T[n--] = data[r--]
                    ++l;
                }
                while (l < r && data[r] !== curr) {
                    T[n--] = data[r--]
                }
                while (l < r && data[l] === curr) ++l;
            } else {
                while (l < r && data[r] === curr && data[l] !== curr) {
                    T[n--] = data[l++]
                    --r;
                }
                while (l < r && data[l] !== curr) {
                    T[n--] = data[l++]
                }
                while (l < r && data[r] === curr) --r;
            }
            rev = !rev
        }
        data = T.slice(n + 1)
        T = new Array(data.length).fill(0);
        n = data.length - 1
        curr = data[0]
        rev = false
    } while (!data.every(l => l === data[0]));
    return res
}

function part2(data) {

	let res = 0;
    let R = ""
    range(10)(_ => {
        R += data
    })
    R = singles(R)
    res = solve_len(R)

	debug(res);
	if (res) exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART2");
	return;
}

function part3(data) {

	let res = 0;
    let R = ""
    range(100)(_ => {
        R += data
    })
    R = singles(R)
    res = solve_len(R)

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

main('16');



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

const C = { "CW": 1, "CCW": -1 };

function parse_data(data) {
    const [_hand, _dir, _curr, _mov] = lines(data).map(r => r.split(" ")[1].split(":"));
    const hand = _hand.map(h => int(h))
    const G = hand.reduce((acc, curr) => {
        acc = lcm(acc, curr)
        return acc
    }, 1)
    const dir = _dir.map((d, i) => round(C[d] * G / hand[i]));
    const curr = _curr.map((c, i) => round(c * G / hand[i]));
    const mov = _mov.map(m => int(m))
    return [dir.length, G, dir, curr, mov]
}

function overlap(A, B, i, G) {
    const N = A.length;
    const j = (i + 1) % N;
    const sa = sign(B[i] - A[i]) * 0.0001;
    const sgna = sign(B[i] - A[i]) * 0.0001;
    const sb = sign(B[j] - A[j]) * 0.0001;
    const sgnb = sign(B[j] - A[j]) * 0.0001;
    const At = [min(A[i] + sgna, B[i]), max(A[i] + sgna, B[i])]
    const Bt = [min(A[j] + sgnb, B[j]), max(A[j] + sgnb, B[j])]
    const As = [], Bs = [];
    range(-1, 2)(n => {
        As.push([At[0] + n * G, At[1] + n * G])
        Bs.push([Bt[0] + n * G, Bt[1] + n * G])
    })

    let once = false;
    range(As.length)(i => {
        const [a1, a2] = As[i]
        range(Bs.length)(j => {
            const [b1, b2] = Bs[j]
            once = sa !== sb ? b1 <= a2 && b2 >= a1 : (a1 <= b1 && b2 <= a2 || b1 <= a1 && a2 <= b2)
            return once;
        })
        return once;
    })
    return once
}

function solve(data) {
	let res = 0;
    const [N, G, dir, curr, mov] = parse_data(data);

    const prev = copy(curr)
    let seen = {}
    let ii = 0;
    while (mov.some(m => m)) {
        const h = prev.join(',')
        if (prev.join(',') in seen) {
            const [r, mm] = seen[h]
            const dm = mm.reduce((acc, curr, i) => {
                acc = min(acc, curr - mov[i] === 0 ? 1e9 : curr - mov[i])
                return acc
            }, 1e9)
            const dr = res - r;
            const n = min(...mov.map(m => m ? floor(m / dm) : 1e9))
            res += n * dr;
            range(N)(i => {
                if (mov[i] === 0 || n*dm > mov[i]) return
                mov[i] -= n * dm
            })
            seen = {};
        }
        ++ii
        seen[h] = [res, [...mov]]
        const next = []
        range(N)(hi => {
            if (mov[hi] === 0) {
                next.push(prev[hi])
            } else {
                next.push(prev[hi] + dir[hi]);
                --mov[hi]
                if (mov[hi] === 0) seen = {}
            }
        })
        let tmp = 0;
        range(N)(hi => {
            if (prev[hi] !== prev[(hi + 1) % N] && overlap(prev, next, hi, G)) {
                ++tmp;
            }
        })
        res += tmp
        range(N)(hi => {
            prev[hi] = (next[hi] + G) % G
        })
    }
    return res
}

function part1(data) {
    const res = solve(data);
	debug(res);
	if (res) exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART1");
	return;
}

function part2(data) {

	let res = 0;
    data = getGroups(data)
    iter(data, dd => {
        res += solve(dd)
    })

	debug(res);
	if (res) exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART2");
	return;
}

function part3(data) {

	let res = 0;
    data = getGroups(data)
    iter(data, dd => {
        res += solve(dd)
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

main('13');


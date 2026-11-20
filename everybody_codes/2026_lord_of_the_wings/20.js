
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

const segments = {0:6, 1:2, 2:5, 3:5, 4:4, 5:5, 6:6, 7:3, 8:7, 9:6, '+':2, '-':1, '=':2, 'A':6}
const subs = {0: [6, 9, 'A'], 1: [], 2: [3, 5], 3: [2, 5], 4: [], 5: [2, 3], 6: [0, 9, 'A'], 7: [], 8: [], 9: [0, 6, 'A'], 'A': [0, 6, 9], '-': [], '+': []}
const to_rm = {0: [], 1: [], 2: [], 3: [], 4: [], 5: [], 6: [5], 7: [1], 8: [0, 6, 9, 'A'], 9: [3, 5], 'A': [], '-': [], '+': ['-']}
const to_add = {0: [8], 1: [7], 2: [], 3: [9], 4: [], 5: [6, 9], 6: [8], 7: [], 8: [], 9: [8], 'A': [8], '-': ['+'], '+': []}

function part1(data) {

	let res = 0;
    data = lines(data)
    iter(data, r => {
        const [a, b] = r.split('=')
        if (eval(a) === eval(b)) {
            iter(r, c => {
                if (c === ' ') return
                else res += segments[c]
            })
        }
    })

	debug(res);
	if (res) exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART1");
	return;
}

function part2(data) {

	let res = 0;
    data = lines(data)
    iter(data, r => {
        const [a, b] = r.split('=')
        const sa = in_('+', a)
        const sb = in_('+', b)
        let [al, ar] = sa ? a.split('+') : a.split('-')
        let [bl, br] = sb ? b.split('+') : b.split('-')
        al = num(al, 11)
        ar = num(ar, 11)
        bl = num(bl, 11)
        br = num(br, 11)
        const L = sa ? al + ar : al - ar
        const R = sb ? bl + br : bl - br

        if (L === R) {
            iter(r, c => {
                if (c === ' ') return
                else res += segments[c]
            })
        }
    })
    res = res.toString(11)

	debug(res);
	if (res) exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART2");
	return;
}

function evaluate(r) {
    const [a, b] = r.split('=')
    const sa = in_('+', a)
    const sb = in_('+', b)
    let [al, ar] = sa ? a.split('+') : a.split('-')
    let [bl, br] = sb ? b.split('+') : b.split('-')
    al = num(al, 11)
    ar = num(ar, 11)
    bl = num(bl, 11)
    br = num(br, 11)
    const L = sa ? al + ar : al - ar
    const R = sb ? bl + br : bl - br
    return [L, R]

}

function part3(data) {

	let res = 0;
    data = lines(data)
    iter(data, r => {
        const [L, R] = evaluate(r)
        if (L === R) {
            iter(r, c => {
                if (c === ' ') return
                else res += segments[c]
            })
        } else {
            const rr = r.split('');
            let can_be = false
            for (let i = 0; !can_be && i < rr.length; ++i) {
                if (rr[i] === ' ' || rr[i] === '=') continue
                const rrc = [...rr];
                iter(subs[ rr[i] ], s => {
                    rrc[i] = s
                    const [L, R] = evaluate(rrc.join(''))
                    if (L === R) can_be = true
                    return can_be
                })
            }
            if (!can_be) {
                for (let i = 0; !can_be && i < rr.length; ++i) {
                    if (rr[i] === ' ' || rr[i] === '=') continue
                    const rrc = [...rr];
                    iter(to_rm[ rr[i] ], rm => {
                        rrc[i] = rm
                        for (let j = 0; !can_be && j < rr.length; ++j) {
                            if (i === j || rr[j] === ' ' || rr[j] === '=') continue
                            const rrd = [...rrc]
                            iter(to_add[ rrc[j] ], dd => {
                                rrd[j] = dd
                                const [L, R] = evaluate(rrd.join(''))
                                if (L === R) can_be = true
                                return can_be
                            })
                        }
                        return can_be
                    })
                }
            }
            if (can_be) {
                iter(r, c => {
                    if (c === ' ') return
                    else res += segments[c]
                })
            }
        }
    })
    res = res.toString(11)

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

main('20');


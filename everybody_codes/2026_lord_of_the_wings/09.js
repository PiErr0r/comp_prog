
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

function part1(data) {

	let res = 0;
    data = scanf(data.trim(), "%w=%d, %w=%d, %w=%d").map(r => r.filter(c => typeof c === "number"))

    iter(data, ([id, growth, limit]) => {
        let D = { 0: 1 };
        let s = 0;
        let B = 0;
        while (1) {
            const nD = new DD(0)
            iter(keys(D), k => {
                if (k === 'toJSON') return;
                if (int(k) + 1 === growth) {
                    nD[floor(growth / 2)] += 2 * D[k];
                    nD[1] += D[k];
                    B += D[k]
                } else {
                    nD[int(k) + 1] += D[k];
                }
            })
            let S = B;
            ++s;
            D = nD;
            iter(keys(D), k => {
                S += int(k) * D[k];
            })
            if (S >= limit) break;
        }
        res += s;
    })
	debug(res);
	if (res) exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART1");
	return;
}

function part2(data) {

	let res = 0;
    data = scanf(data.trim(), "%w=%d, %w=%d, %w=%d").map(r => r.filter(c => typeof c === "number"))
    iter(data, ([id, growth, limit]) => {
        let leafs = {0: 1};
        let nonleafs = {}
        let s = 0;
        while (1) {
            const nl = new DD();
            const nnl = new DD();
            iter(keys(leafs), k => {
                if (k === 'toJSON') return;
                if (int(k) + 1 === growth) {
                    nl[floor(growth / 2)] += leafs[k];
                    nl[1] += leafs[k];
                    nnl[floor(growth / 2)] += leafs[k]
                } else {
                    nl[int(k) + 1] += leafs[k];
                }
            })
            iter(keys(nonleafs), k => {
                if (k === 'toJSON') return;
                if (int(k) + 1 === growth) {
                    nnl[floor(growth / 2)] += nonleafs[k];
                    nl[1] += nonleafs[k];
                    nnl[floor(growth / 2)] += nonleafs[k]
                } else {
                    nnl[int(k) + 1] += nonleafs[k];
                }
            })
            ++s;
            nonleafs = nnl;
            leafs = nl;
            let S = 0;
            iter(keys(leafs), k => {
                S += leafs[k];
            })
            if (S >= limit) break;
        }
        res += s;
    })

	debug(res);
	if (res) exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART2");
	return;
}

function shift(D, g) {
    let maxl = 0, maxnl = 0;
    iter(keys(D), k => {
        if (int(k) > maxl && int(k) < g) maxl = int(k)
        maxnl = max(maxnl, int(k));
    })
    const mins = min(g-1 - maxl, 2*g - 2 - maxnl);
    const nD = {};
    iter(keys(D), k => {
        nD[int(k) + mins] = D[k];
    });
    return [mins, nD];
}

function part3(data) {

	let res = 0;
    data = scanf(data.trim(), "%w=%d, %w=%d, %w=%d").map(r => r.filter(c => typeof c === "number"))
    iter(data, ([id, growth, limit]) => {
        let D = {0:1};
        let s = 0;
        while (1) {
            const nD = new DD(0)
            if (!(growth - 1 in D) && !((2*growth - 2) in D)) {
                const [step, nnD] = shift(D, growth);
                let S = 0;
                iter(keys(nnD), k => {
                    if (int(k) >= growth) return
                    S += nnD[k];
                })
                if (S < limit) {
                    D = nnD;
                    s += step;
                }
            }
            iter(keys(D), k => {
                if (k === 'toJSON') return;
                if (int(k) + 1 === growth) {
                    nD[floor(growth / 2)] += D[k];
                    nD[1] += D[k];
                    nD[growth - 1 + floor(growth / 2)] += D[k]
                } else if (int(k) + 1 === 2 * growth - 1) {
                    nD[growth - 1 + floor(growth / 2)] += 2*D[k]
                    nD[1] += D[k]
                } else {
                    nD[int(k) + 1] += D[k];
                }
            })
            ++s;
            D = nD;
            let S = 0;
            iter(keys(D), k => {
                if (int(k) >= growth) return
                S += D[k];
            })
            if (S >= limit) break;
        }
        res += s;
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

main('09');


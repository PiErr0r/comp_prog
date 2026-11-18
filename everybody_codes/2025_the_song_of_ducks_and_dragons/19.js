
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
    data = lines(data).map(r => ints(r))
    let ci = 0;
    let x = 0;
    let y = 1;
    while (ci < data.length) {
        const [cx, cy, ch] = data[ci];
        const dx = cx - x;
        if (y - dx <= cy) {
            // y + n - (dx - n) = cy + 1
            // y + n - dx + n = cy + 1
            // n >= (cy + 1 - y + dx) / 2
            const n = ceil((cy + 1 - y + dx) / 2)
            res += n
            y += 2*n-dx
        } else {
            y -= dx;
        }
        x += dx;
        ++ci;
    }

	debug(res);
	if (res) exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART1");
	return;
}

function part2(data) {

	let res = 0;
    data = lines(data).map(r => ints(r))
    const D = data.reduce((acc, curr) => {
        if (acc.length === 0) {
            acc.push([curr]);
        } else {
            if (curr[0] === acc.at(-1)[0][0]) {
                acc.at(-1).push(curr)
            } else {
                acc.push([curr])
            }
        }
        return acc
    }, [])
    let ci = 0;
    let S = new set()
    S.add([1, 0, 0])
    while (ci < D.length) {
        const nS = new set();
        iter(D[ci], ([cx, cy, ch]) => {
            iter([...S], ([y, x, pt]) => {
                const dx = cx - x;
                if (y - dx <= cy) {
                    // y + n - (dx - n) = cy + 1
                    // y + n - dx + n = cy + 1
                    // n >= (cy + 1 - y + dx) / 2
                    const n = ceil((cy + 1 - y + dx) / 2)
                    pt += n
                    y += 2*n-dx
                } else {
                    y -= dx;
                }
                x += dx;
                if (y <= cy || y > cy + ch) return
                nS.add([y, x, pt])
            })
        })
        S = new set([...nS])
        ++ci;
    }
    res = Infinity
    iter([...S], ([_1, _2, pt]) => {
        res = min(pt, res)
    })

	debug(res);
	if (res) exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART2");
	return res;
}

function part3(data) {

	let res = part2(data);

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


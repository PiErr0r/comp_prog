
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
    data = scanf(data.trim(), "%w=%d %w=%d %w=%d %w=%d");
    const N = DD(0)
    iter(data, ([_1, id, _2, q, _3, part, _4, time]) => {
        N[id] += time;
    });
    const L = entries(N);
    sort(L, (a, b) => {
        return a[1] - b[1]
    })

    iter(L, ([id, time], i) => {
        res += (i + 1) * time
    })

	debug(res);
	if (res) exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART1");
	return;
}

function part2(data) {

	let res = 0;
    data = scanf(data.trim(), "%w=%d %w=%d %w=%d %w=%d");
    const N = {}

    iter(data, ([_1, id, _2, q, _3, part, _4, time]) => {
        if (!(id in N)) N[id] = [0, 0];
        N[id][0] += time;
        N[id][1]++;
    });
    const L = entries(N);
    sort(L, (a, b) => {
        if (a[1][1] !== b[1][1])
            return b[1][1] - a[1][1]
        else
            return a[1][0] - b[1][0]
    })

    iter(L, ([id, [time, parts]], i) => {
        res += (i + 1) * time
    })

	debug(res);
	if (res) exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART2");
	return;
}

function parse_data(data) {
    const N = {}
    let maxq = 0;
    iter(data, ([_1, id, _2, q, _3, part, _4, time]) => {
        if (!(id in N)) N[id] = {}
        if (!(q in N[id])) N[id][q] = {}
        maxq = max(maxq, q);
        if (!(part in N[id][q])) N[id][q][part] = time
    })
    iter(keys(N), id => {
        iter(keys(N[id]), q => {
            let cumsum = 0;
            range(1, 4)(part => {
                if (!(part in N[id][q])) return
                cumsum += N[id][q][part];
                N[id][q][part] = cumsum;
            })
        })
    })
    return [N, maxq];
}

function custom_sort(L, part) {
    sort(L, (a, b) => {
        if (a[part] === -1 && b[part] === -1) return 0;
        if (a[part] === -1) return 1;
        if (b[part] === -1) return -1;
        return a[part] - b[part];
    })
}

function sum_pts(pts, PT, L, part) {
    const nl = L.filter(a => a[part] !== -1).map(a => [a[0], a[part]]);
    let curr = PT[part];
    let prev = -1;
    let n_same = 0;
    iter(nl, ([id, time]) => {
        if (prev === -1) {
            pts[id] += curr;
            prev = time;
            n_same = 1;
        } else if (time !== prev) {
            curr -= n_same;
            if (curr < 0) curr = 0;
            pts[id] += curr;
            prev = time;
            n_same = 1;
        } else {
            pts[id] += curr;
            n_same++;
        }
    })
}

function part3(data) {

	let res = 0;
    data = scanf(data.trim(), "%w=%d %w=%d %w=%d %w=%d");
    const [N, maxq] = parse_data(data)
    const pts = DD(0)
    range(1, maxq+1)(q => {
        const PT = {1: 50, 2: 100, 3: 150};
        const L = [];
        iter(keys(N), id => {
            if (!(q in N[id])) return;
            const LL = [id, -1, -1, -1];
            range(1, 4)(part => {
                if (!(part in N[id][q])) return
                LL[part] = N[id][q][part]
            })
            L.push(LL);
        })
        range(1, 4)(part => {
            custom_sort(L, part);
            sum_pts(pts, PT, L, part);
        });
    })
    const L = values(pts)
    sort(L, (a, b) => b - a)
    let curr = 1;
    let prev = -1;
    let nsame = 0;
    const LL = [];
    iter(L, pt => {
        if (prev === -1) {
            LL.push([pt, curr])
            prev = pt;
            nsame = 1;
        } else if (prev === pt) {
            LL.push([pt, curr])
            nsame++;
        } else {
            curr += nsame;
            LL.push([pt, curr]);
            prev = pt;
            nsame = 1;
        }
    })
    iter(LL, ([pt, place], i) => {
        res += place * pt;
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

main('04');


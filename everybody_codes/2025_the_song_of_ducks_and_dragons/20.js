
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
    data = table(data)
    for (let r = 0; r < data.length; ++r) {
        for (let c = r; c < data[r].length && data[r][c] !== '.'; ++c) {
            if (c > 0 && data[r][c] === 'T' && data[r][c] === data[r][c-1])
                ++res
            if (r > 0 && (c - r) % 2 === 0 && data[r][c] === 'T' && data[r][c] === data[r-1][c])
                ++res
        }
    }

	debug(res);
	if (res) exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART1");
	return;
}

function bfs(D, [sy, sx], [ey, ex]) {
    const q = new Queue()
    q.push([sy, sx, 0]);
    const seen = new set();
    while (!q.empty()) {
        const [y, x, pt] = q.pop()
        if (seen.has([y, x])) continue
        seen.add([y, x])
        if (y === ey && x === ex) return pt
        if (inBB(y, x-1, D) && in_(D[y][x-1], "TES") && !seen.has([y, x-1])) q.push([y, x-1, pt + 1])
        if (inBB(y, x+1, D) && in_(D[y][x+1], "TES") && !seen.has([y, x+1])) q.push([y, x+1, pt + 1])
        if (inBB(y-1, x, D) && in_(D[y-1][x], "TES") && !seen.has([y-1, x]) && (x - y) % 2 === 0) q.push([y-1, x, pt + 1])
        if (inBB(y+1, x, D) && in_(D[y+1][x], "TES") && !seen.has([y+1, x]) && (x - y) % 2 === 1) q.push([y+1, x, pt + 1])
    }
    return -1
}

function part2(data) {

	let res = 0;
    data = table(data)
    let S, E
    iter(data, (row, y) => {
        iter(row, (col, x) => {
            if (col === 'S') S = [y, x]
            if (col === 'E') E = [y, x]
        })
    })
    res = bfs(data, S, E);

	debug(res);
	if (res) exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART2");
	return;
}

function bfs_rot(M, [sy, sx], [ey, ex]) {
    const q = new Queue()
    q.push([sy, sx, 0, 0]);
    const seen = new set();
    while (!q.empty()) {
        const [y, x, pt, r] = q.pop()
        if (seen.has([y, x, r])) continue
        seen.add([y, x, r])
        const nr = (r + 1) % 3
        const D = M[nr]
        if (M[r][y][x] === 'E') return pt
        if (in_(D[y][x], "TE"))
            q.push([y, x, pt + 1, nr])
        if (inBB(y, x-1, D) && in_(D[y][x-1], "TE"))
            q.push([y, x-1, pt + 1, nr])
        if (inBB(y, x+1, D) && in_(D[y][x+1], "TE"))
            q.push([y, x+1, pt + 1, nr])
        if (inBB(y-1, x, D) && in_(D[y-1][x], "TE") && (x - y) % 2 === 0)
            q.push([y-1, x, pt + 1, nr])
        if (inBB(y+1, x, D) && in_(D[y+1][x], "TE") && (x - y) % 2 === 1)
            q.push([y+1, x, pt + 1, nr])
    }
    return -1
}

function rotate(D) {
    const nD = empty(D.length, D[0].length)
    range(D.length)(i => {
        range(D[0].length)(j => {
            nD[i][j] = '.'
        })
    })

    for (let r = 0; r < D.length; ++r) {
        let sr = 0;
        let sc = D[r].length - 1 - 2 * r;
        let left = true;
        for (let c = r; c < D[r].length && D[r][c] !== '.'; ++c) {
            nD[sr][sc] = D[r][c]
            if (left) {
                --sc;
            } else {
                ++sr
            }
            left = !left
        }
    }
    return nD
}

function create_map(data) {
    const M = []
    M.push(copy(data))
    M.push(rotate(data))
    M.push(rotate(rotate(data)))
    return M
}

function part3(data) {

	let res = 0;
    data = table(data)
    let S, E
    iter(data, (row, y) => {
        iter(row, (col, x) => {
            if (col === 'S') S = [y, x]
            if (col === 'E') E = [y, x]
        })
    })
    const M = create_map(data)
    res = bfs_rot(M, S, E)

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


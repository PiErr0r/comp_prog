
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

function bfs(S, E, W) {
    const [ey, ex] = E;
    const q = new Queue();
    q.push([...S, 0])
    const seen = new set();
    while (!q.empty()) {
        const [y, x, pt] = q.pop();
        if (y === ey && x === ex) return pt;
        if (seen.has([y, x])) continue;
        seen.add([y, x])

        iter(D4, ([dy, dx]) => {
            if (seen.has([y+dy, x+dx]) || W.has([y+dy, x+dx])) return
            q.push([y+dy, x+dx, pt+1])
        })
    }
}

function part1(data) {

    data = data.trim().split(',')
	let res = 0;

    const S = [0, 0]
    let curr = [...S]
    let di = 3;
    const W = new set()
    iter(data, dir => {
        const dd = dir[0]
        const step = int(dir.slice(1))
        if (dd === 'R') di = (di + 1) % 4
        else di = (di + 3) % 4;
        range(step)(_ => {
            const [y, x] = curr;
            const [dy, dx] = D4[di];
            curr = [y+dy, x+dx]
            W.add(curr)
        })
    })
    W.delete(curr)

    res = bfs(S, curr, W);

	debug(res);
	if (res) exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART1");
	return;
}

function part2(data) {

    data = data.trim().split(',')
	let res = 0;

    const S = [0, 0]
    let curr = [...S]
    let di = 3;
    const W = new set()
    iter(data, dir => {
        const dd = dir[0]
        const step = int(dir.slice(1))
        if (dd === 'R') di = (di + 1) % 4
        else di = (di + 3) % 4;
        range(step)(_ => {
            const [y, x] = curr;
            const [dy, dx] = D4[di];
            curr = [y+dy, x+dx]
            W.add(curr)
        })
    })
    W.delete(curr)

    res = bfs(S, curr, W);

	debug(res);
	if (res) exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART2");
	return;
}

const dist = (a, b) => {
    const dy = b[0] - a[0];
    const dx = b[1] - a[1];
    return sqrt(dy*dy + dx*dx)
}

function bfs2(S, E, X, Y) {
    const [ey, ex] = E;
    const q = new PriorityQueue((a, b) => dist(a, E) - dist(b, E));
    q.push([...S, 0])
    const seen = new set();
    while (!q.empty()) {
        const [y, x, pt] = q.pop();
        if (q.size % 10000 === 0) {
            debug("##", q.size, dist([y, x], E))
        }
        if (q.size > 1000000) {
            q.splice(10000);
            q.size = 10000
        }
        if (y === ey && x === ex) return pt;
        if (seen.has([y, x])) continue;
        seen.add([y, x])

        iter(D4, ([dy, dx]) => {
            const ny = y+dy
            const nx = x+dx
            if (seen.has([ny, nx])) return
            if (nx in X && X[nx].some(([y1, y2]) => y1 <= ny && ny <= y2)) return;
            if (ny in Y && Y[ny].some(([x1, x2]) => x1 <= nx && nx <= x2)) return;
            q.push([ny, nx, pt+1])
        })
    }
}

function part3(data) {

    data = data.trim().split(',')
	let res = 0;

    const S = [0, 0]
    let curr = [...S]
    let di = 3;
    const X = {}
    const Y = {}
    iter(data, (dir, i) => {
        const dd = dir[0]
        const step = int(dir.slice(1)) + ((i === data.length - 1) ? -1 : 0);
        if (dd === 'R') di = (di + 1) % 4
        else di = (di + 3) % 4;
        if (D4[di][0] === 0) { // dy = 0
            if (!(curr[0] in Y)) Y[curr[0]] = []
            Y[curr[0]].push([min(curr[1], curr[1] + step * D4[di][1]), max(curr[1], curr[1] + step * D4[di][1])])
        } else { // dx = 0
            if (!(curr[1] in X)) X[curr[1]] = []
            X[curr[1]].push([min(curr[0], curr[0] + step * D4[di][0]), max(curr[0], curr[0] + step * D4[di][0])])
        }
        curr[0] += D4[di][0] * (step + ((i === data.length - 1) ? 1 : 0));
        curr[1] += D4[di][1] * (step + ((i === data.length - 1) ? 1 : 0));
    })

    res = bfs2(S, curr, X, Y);

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

main('15');


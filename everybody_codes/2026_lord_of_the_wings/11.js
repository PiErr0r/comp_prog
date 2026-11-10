
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

function bfs(P, p) {
    const R = empty(keys(P).length).map(_ => 1e10);
    const q = new Queue();
    q.push([p, 0])
    while (!q.empty()) {
        const [pp, pt] = q.pop();
        if (pt >= R[pp]) continue
        R[pp] = pt;
        iter(P[pp], np => {
            if (pt + 1 >= R[np]) return
            q.push([np, pt + 1])
        })
    }
    return R;
}

function part1(data) {

	let res = 0;
    let [ps, conn] = getGroups(data.trim())
    ps = ints(ps)[0]
    conn = lines(conn).map(r => ints(r))
    const P = {}
    range(ps)(i => {
        if (!(i in P)) P[i] = []
        P[i].push((i+1)%ps)
        P[i].push((i+ps-1)%ps)
    })
    iter(conn, ([a, b]) => {
        --a;
        --b;
        P[a].push(b)
        P[b].push(a)
    })

    range(ps)(p => {
        const tmp = bfs(P, p)
        res += sum(tmp)
    })
    const n = floor(ps / 2) - 1;
    const S = ps * (n * (n + 1) + (n + 1) + ((ps % 2 === 0) ? 0 : n + 1))
    res = S - res

	debug(res);
	if (res) exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART1");
	return;
}

function part2(data) {

	let res = 0;
    let [ps, conn] = getGroups(data.trim())
    ps = ints(ps)[0]
    conn = lines(conn).map(r => ints(r))
    const P = {}
    range(ps)(i => {
        if (!(i in P)) P[i] = []
        range(1, 4)(j => {
            P[i].push((i+j)%ps)
            P[i].push((i+ps-j)%ps)
        })
    })
    let S = sum(bfs(P, 0));
    S *= ps

    iter(conn, ([a, b]) => {
        --a;
        --b;
        P[a].push(b)
        P[b].push(a)
    })

    let mx = 0;
    range(ps)(i => {
        const D = 12;
        const half = floor(ps / 2 - 6 / 2)
        range(2*D + 1)(j => {
            if (P[i].indexOf(j) !== -1) return;
            const nn = (half + j) % ps;
            const cP = copy([P])[0]
            cP[i].push(nn)
            cP[nn].push(i)
            let SS = 0
            range(ps)(p => {
                const tmp = bfs(cP, p)
                SS += sum(tmp)
            })
            mx = max(mx, S - SS)
        })
    })
    res = mx;

	debug(res);
	if (res) exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART2");
	return;
}

function to_indices(arr) {
    return arr.reduce((acc, curr, i) => {
        acc[curr].push(i)
        return acc;
    }, [[], [], [], []])
}

function part3(data) {
	let res = 0;
    let [ps, conn] = getGroups(data.trim())
    ps = ints(ps)[0]
    conn = lines(conn).map(r => ints(r))
    const P = {}
    range(ps)(i => {
        if (!(i in P)) P[i] = []
        P[i].push((i+1)%ps)
        P[i].push((i+ps-1)%ps)
    })
    range(ps)(i => {
        if (!(i in P)) P[i] = []
        range(1, 4)(j => {
            P[i].push((i+j)%ps)
            P[i].push((i+ps-j)%ps)
        })
    })
    let S = sum(bfs(P, 0));
    S *= ps
    iter(conn, ([a, b]) => {
        --a;
        --b;
        P[a].push(b)
        P[b].push(a)
    })

    let mx = 0;
    debug(S)
    range(floor(ps / 8))(i => {
        debug(i)
        const A = empty(8).map((_, j) => i + floor(ps / 8)*j)
        const B = [0, 0, 1, 1, 2, 2, 3, 3];
        const perms = unique_permutations(B)
        iter(perms, perm => {
            const cP = copy([P])[0]
            const mapping = to_indices(perm)
            iter(mapping, ([a, b]) => {
                cP[A[a]].push(A[b])
                cP[A[b]].push(A[a])
            })
            let SS = 0
            range(ps)(p => {
                const tmp = bfs(cP, p)
                SS += sum(tmp)
            })
            mx = max(mx, S - SS)
        })
    })
    res = mx

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

main('11');


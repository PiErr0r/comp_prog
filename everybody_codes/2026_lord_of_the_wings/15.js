
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

function parse_data(data) {
    const G = table(data);
    let S, E, ats = new set();

    iter(G, (row, y) => {
        iter(row, (col, x) => {
            switch (col) {
                case 'S': S = [y, x]; break;
                case 'E': E = [y, x]; break;
                case '@': ats.add([y, x]); break;
                default: /* pass */ break
            }
        })
    })
    console.assert(S)
    console.assert(E)
    console.assert(ats.size > 0)
    return [S, E, ats, G]
}

function dijkstra(G, [sy, sx], [ey, ex], ats_total) {
    const q = new PriorityQueue((a, b) => a[3].size === b[3].size ? a[2] - b[2] : a[3].size - b[3].size)
    const seen = {}
    q.push([sy, sx, 0, ats_total, [0, 1]])
    let mnT = null;
    let i = 0;
    debug(ats_total)
    while (!q.empty()) {
        const [y, x, T, ats, [ddy, ddx]] = q.pop();
        if (i % 100000 === 0) {
            debug({i, mnT, T, ddy, ddx})
            debug(ats)
        }
        ++i
        const h = [...ats].sort((a, b) => (a[0] - b[0]) || a[1] - b[1]).map(([ay, ax]) => `${ay}_${ax}`).join('#')
        const H = `${y}_${x}_${h}_${ddy}_${ddx}`;
        if (H in seen && seen[H] < T) continue;
        if (G[y][x] === 'E') {
            mnT = T;
            continue;
        }
        if (mnT !== null && T >= mnT) continue;
        seen[H] = T;
        iter(D4, ([dy, dx]) => {
            if (dy === -ddy && dx === -ddx) return;
            const [ny, nx] = [y + dy, x + dx]
            if (!inBB(ny, nx, G)) return;
            if (G[ny][nx] === '#') return;
            const nats = new set([...ats]);
            if (G[ny][nx] === '@') nats.delete([ny, nx]);
            if (G[ny][nx] === 'E' && nats.size !== 0) return
            q.push([ny, nx, T + 1, nats, [dy, dx]])
        })
    }
    return mnT
}

function part1(data) {

	let res = 0;
    const [S, E, ats, G] = parse_data(data);
    res = dijkstra(G, S, E, ats)

	debug(res);
	if (res) exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART1");
	return;
}

function dijkstra2(G, [sy, sx], [ey, ex], ats_total) {
    const q = new PriorityQueue((a, b) => a[3].size === b[3].size ? a[2] - b[2] : a[3].size - b[3].size)
    const seen = {}
    q.push([sy, sx, 0, 2026, [0, 1]])
    let mnT = null;
    let i = 0;
    while (!q.empty()) {
        const [y, x, T, ats, [ddy, ddx]] = q.pop();
        if (i % 1000000 === 0) {
            debug({i, mnT, T, ats, ddy, ddx})
        }
        ++i
        const H = `${y}_${x}_${ats}_${ddy}_${ddx}`;
        if (H in seen && seen[H] < T) continue;
        if (G[y][x] === 'E') {
            mnT = T;
            continue;
        }
        if (mnT !== null && T >= mnT) continue;
        seen[H] = T;
        iter(D4, ([dy, dx]) => {
            if (dy === -ddy && dx === -ddx) return;
            const [ny, nx] = [y + dy, x + dx]
            if (!inBB(ny, nx, G)) return;
            if (G[ny][nx] === '#') return;
            let nats = ats;
            if (G[ny][nx] === '@') --nats;
            if (G[ny][nx] === 'E' && nats !== 0) return
            q.push([ny, nx, T + 1, nats, [dy, dx]])
        })
    }
    return mnT
}

function part2(data) {

	let res = 0;
    const [S, E, ats, G] = parse_data(data);
    res = dijkstra2(G, S, E, ats)

	debug(res);
	if (res) exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART2");
	return;
}

function dijkstra3(G, [sy, sx], [ey, ex], ats_total) {
    const q = new PriorityQueue((a, b) => a[3] === b[3] ? a[2] - b[2] : a[3] - b[3])
    const seen = {}
    const seen2 = {}
    q.push([sy, sx, 0, 202620262026, [0, 1]])
    let mnT = null;
    let i = 0;
    while (!q.empty()) {
        let [y, x, T, ats, [ddy, ddx]] = q.pop();
        const H = `${y}_${x}_${ddy}_${ddx}`;
        if (i % 100000 === 0) {
            debug({i, mnT, T, ats, ddy, ddx})
            debug(T, ats, H, H in seen, seen[H], q.size)
        }
        // if (isNaN(T)) process.exit()
        ++i
        if (H in seen && T < 500) {
            const [oT, oats] = seen[H]
            //if (oT < T) continue;
            // if (oats < ats) continue;
            const dT = T - oT;
            const dats = oats - ats;
            if (dT > 0 && dats > 0) {
                const n = floor(ats / dats);
                if (n > 2) {
                    q.push([y, x, T + n*dT, ats - n*dats, [ddy, ddx]])
                    // T += n * dT
                    // ats -= n * dats;
                    // debug(H)
                    // debug("!!!", n, n*dT, dT, T, n*dats, dats, ats)
                }
            }
        }
        const HH = `${y}_${x}_${ats}_${ddy}_${ddx}`;
        if (HH in seen2 && T >= seen2[HH]) continue
        seen2[HH] = T
        if (ats === 0 && y === ey) {
            if (mnT === null)
                mnT = T + ex - x;
            else
                mnT = min(mnT, T + ex - x)
            continue;
        }
        if (mnT !== null && T + ats >= mnT) continue;
        seen[H] = [T, ats];
        iter(D4, ([dy, dx]) => {
            if (dy === -ddy && dx === -ddx) return;
            const [ny, nx] = [y + dy, x + dx]
            if (!inBB(ny, nx, G)) return;
            if (G[ny][nx] === '#') return;
            let nats = ats;
            if (G[ny][nx] === '@') {
                if (nats === 0) return
                --nats
            }
            if (G[ny][nx] === 'E' && nats !== 0) return
            q.push([ny, nx, T + 1, nats, [dy, dx]])
        })
    }
    return mnT
}

function part3(data) {

	let res = 0;
    const [S, E, ats, G] = parse_data(data);
    res = dijkstra3(G, S, E, ats)

	debug(res);
	if (res) exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART3");
	return;
}

function main(n) {
	// part1(fs.readFileSync(`${n}a_input`).toString("utf-8").trim());
	// part2(fs.readFileSync(`${n}b_input`).toString("utf-8").trim());
	part3(fs.readFileSync(`${n}c_input`).toString("utf-8").trim());
	process.exit(0);
}

main('15');


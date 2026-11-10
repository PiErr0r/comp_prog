
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
    data = table(data.trim())

    let vy, vx
    iter(data, (row, y) => {
        iter(row, (col, x) => {
            if (col === '@') {
                vy = y;
                vx = x;
            }
        })
    })

    const R = 10;
    iter(data, (row, y) => {
        iter(row, (col, x) => {
            if (col === '@') return
            if ((vx - x)*(vx-x) + (vy-y)*(vy-y) <= R*R) {
                res += int(data[y][x])
            }
        })
    })

	debug(res);
	if (res) exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART1");
	return;
}

function part2(data) {

	let res = 0;
    data = table(data.trim())

    let vy, vx
    iter(data, (row, y) => {
        iter(row, (col, x) => {
            if (col === '@') {
                vy = y;
                vx = x;
            }
        })
    })

    let R = 1;
    let prev = 0
    let mx = 0
    let mxr = 0
    while (1) {
        let S = 0
        iter(data, (row, y) => {
            iter(row, (col, x) => {
                if (col === '@') return
                if ((vx - x)*(vx-x) + (vy-y)*(vy-y) <= R*R) {
                    S += int(data[y][x])
                }
            })
        })
        if (S - prev > mx) {
            mx = S - prev;
            mxr = R
        }
        prev = S

        ++R;
        if (abs(R-vx) < 0 || R + vx >= data[0].length || abs(R-vy) < 0 || R + vy >= data.length)
            break
    }
    res = mxr * mx

	debug(res);
	if (res) exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART2");
	return;
}

function dijkstra(D, sy, sx) {
    const dyl = D.length >> 1;
    const dxl = D[0].length >> 1
    const goals = [
        [[dyl, dyl], [0, dxl]],
        [[dyl, D.length-1], [dxl, dxl]],
        [[dyl, dyl], [dxl, D[0].length-1]],
        [[sy, sy], [sx, sx]]];
    const q = new PriorityQueue((a, b) => b[3] - a[3] === 0 ? a[2] - b[2] : b[3] - a[3]);
    q.push([sy, sx, 0, 0])
    let mn = Infinity
    let S = {}
    while (!q.empty()) {
        const [y, x, pt, gi] = q.pop();
        if (pt > mn) continue
        const ss = `${gi}-${y}-${x}`;
        if (ss in S && pt >= S[ss]) continue
        S[ss] = pt
        iter(D4, ([dy, dx]) => {
            if (!inBB(y+dy, x+dx, D)) return;
            const curr = D[y+dy][x+dx]
            if (in_(curr, "X@")) return;
            if (gi < 2 && curr === 'S') return;
            const [gy, gx] = goals[gi];
            if (gy[0] <= y + dy && y + dy <= gy[1] && gx[0] <= x + dx && x + dx <= gx[1]) {
                if (gi === 3) {
                    mn = min(mn, pt)
                } else {
                    q.push([y+dy, x+dx, pt + (curr === 'S' ? 0 : int(D[y+dy][x+dx])), gi + 1])
                }
            } else {
                q.push([y+dy, x+dx, pt + (curr === 'S' ? 0 : int(D[y+dy][x+dx])), gi])
            }
        })
    }
    return mn;
}

function part3(data) {

	let res = 0;
    data = table(data.trim())

    let vy, vx, sy, sx
    iter(data, (row, y) => {
        iter(row, (col, x) => {
            if (col === '@') {
                vy = y;
                vx = x;
            }
            if (col === 'S') {
                sy = y
                sx = x
            }
        })
    })

    let R = 1;
    while (1) {
        let S = 0
        const D = copy(data)
        iter(data, (row, y) => {
            iter(row, (col, x) => {
                if ((vx - x)*(vx-x) + (vy-y)*(vy-y) <= R*R) {
                    D[y][x] = 'X'
                }
            })
        })
        const tmp = dijkstra(D, sy, sx);
        if (tmp < (R+1) * 30) {
            res = tmp * R;
            break
        }
        ++R;
    }

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

main('17');


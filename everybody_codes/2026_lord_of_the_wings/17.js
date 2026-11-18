
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

function bfs(data, sy, sx, ey, ex) {
    const q = new Queue()
    q.push([sy, sx, 0])
    const seen = new set()
    while (!q.empty()) {
        const [y, x, pt] = q.pop()
        if (seen.has([y, x])) continue
        seen.add([y, x])
        if (y === ey && x === ex) return pt
        iter(D4, ([dy, dx]) => {
            const [ny, nx] = [y + dy, x + dx]
            if (!inBB(ny, nx, data)) return
            if (data[ny][nx] !== '#') return
            q.push([ny, nx, pt + 1])
        })
    }
    return -1
}

function part1(data) {

	let res = 0;
    data = table(data)
    res = bfs(data, 0, 0, data.length - 1, data[0].length - 1)

	debug(res);
	if (res) exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART1");
	return;
}

function borders(data) {
    const S = new set()
    iter(data, (row, y) => {
        iter(row, (col, x) => {
            if (col === '#') S.add([y, x])
        })
    })
    let res = 0;
    iter([...S], ([y, x]) => {
        iter(D4, ([dy, dx]) => {
            const [ny, nx] = [y + dy, x + dx]
            if (!inBB(ny, nx, data)) {
                ++res;
                return;
            }
            if (data[ny][nx] !== '#') ++res;
        })
    })
    return res
}

function part2(data) {

	let res = 0;
    data = table(data)
    res = borders(data)

	debug(res);
	if (res) exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART2");
	return;
}

function add_border(B, y, x, dy, dx) {
    if (dy) {
        if (dy === -1) {
            B.add([y, x, y, x+1])
            B.add([y, x+1, y, x])
        } else { // dy === 1
            B.add([y+1, x, y+1, x+1])
            B.add([y+1, x+1, y+1, x])
        }
    } else { // dx
        if (dx === -1) {
            B.add([y, x, y+1, x])
            B.add([y+1, x, y, x])
        } else { // dx === 1
            B.add([y, x+1, y+1, x+1])
            B.add([y+1, x+1, y, x+1])
        }
    }
}

function from_border(S, py, px, y, x) {
    const mnx = min(x, px)
    const mny = min(y, py)
    const mxx = max(x, px)
    const mxy = max(y, py)
    if (y !== py) {
        if (S.has([mny, mnx])) return [mny, mnx]
        else return [mny, mnx - 1]
    } else { // x !== px
        if (S.has([mny, mnx])) return [mny, mnx]
        else return [mny - 1, mnx]
    }
}

function is_valid(S, py, px, y, x, ny, nx) {
    let cnt = S.has([y, x]) + S.has([y-1, x-1]) + S.has([y, x-1]) + S.has([y-1, x])
    if (cnt === 3 || cnt === 1) return true
    return same_dir(py, px, y, x, ny, nx)
}

function same_dir(py, px, y, x, ny, nx) {
    const pdy = y - py;
    const pdx = x - px;
    const ndy = ny - y;
    const ndx = nx - x;
    return pdy === ndy && pdx === ndx
}

function bfs_borders(data) {
    const S = new set()
    iter(data, (row, y) => {
        iter(row, (col, x) => {
            if (col === '#') S.add([y, x])
        })
    })
    const B = new set()
    iter([...S], ([y, x]) => {
        iter(D4, ([dy, dx]) => {
            const [ny, nx] = [y + dy, x + dx]
            if (!inBB(ny, nx, data)) {
                add_border(B, y, x, dy, dx)
            } else if (data[ny][nx] !== '#') {
                add_border(B, y, x, dy, dx)
            }
        })
    })
    const q = new Queue()
    const [ey, ex] = [data.length, data[0].length]
    q.push([0, 0, 0, 0, 0])
    const seen = new set()
    while (!q.empty()) {
        const [py, px, y, x, pt] = q.pop();
        if (seen.has([py, px, y, x])) continue
        seen.add([py, px, y, x])
        if (y === ey && x === ex) return pt
        iter(D4, ([dy, dx]) => {
            const [ny, nx] = [y + dy, x + dx]
            if (B.has([y, x, ny, nx])) {
                if (is_valid(S, py, px, y, x, ny, nx))
                    q.push([y, x, ny, nx, pt + 1])
            }
        })
    }
    return -1;
}

function part3(data) {

	let res = 0;
    data = table(data)
    res = bfs_borders(data)

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

main('17');


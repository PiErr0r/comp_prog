
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

function find_rects(D) {
    const R = []
    iter(D, (row, y) => {
        iter(row, (col, x) => {
            if (col === '#') {
                let ty = y, tx = x;
                let w, h;
                while (ty < D.length && D[ty][tx] === '#') {
                    while (tx < D[0].length && D[ty][tx] === '#') {
                        D[ty][tx] = '.';
                        ++tx;
                    }
                    w = tx - x;
                    tx = x;
                    ++ty;
                }
                h = ty - y;
                R.push([y, x, h, w]);
            }
        })
    })
    return R;
}

function part1(data) {

	let res = 0;
    data = table(data)
    const R = find_rects(data);

    iter(R, ([y0, x0, h, w]) => {
        res += min(w, h);
    })

	debug(res);
	if (res) exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART1");
	return;
}

function bfs(data, y, x) {
    const q = new Queue()
    let mny = y, mxy = y, mnx = x, mxx = x;
    const B = new set()
    q.push([y, x])
    while (!q.empty()) {
        const [yy, xx] = q.pop();
        if (B.has([yy, xx])) continue
        B.add([yy, xx])
        mny = min(mny, yy)
        mxy = max(mxy, yy)
        mnx = min(mnx, xx)
        mxx = max(mxx, xx)
        iter(D4, ([dy, dx]) => {
            const ny = yy + dy
            const nx = xx + dx
            if (!inBB(ny, nx, data)) return
            if (B.has([ny, nx])) return
            if (data[ny][nx] !== '#') return
            q.push([ny, nx])
        })
    }
    return [mny, mnx, mxy - mny + 1, mxx - mnx + 1, B]
}

function find_bbs(data) {
    const bbs = []
    iter(data, (row, y) => {
        iter(row, (col, x) => {
            if (col === '#') {
                bbs.push(bfs(data, y, x));
                iter([...bbs[bbs.length-1][4]], ([ty, tx]) => {
                    data[ty][tx] = 'X'
                })
            }
        })
    })
    return bbs;
}

function find_inflection(B, y0, x0, w, h) {
    let dy, dx, yi = -1, xi = -1
    if (!B.has([y0, x0])) {
        dy = 1
        dx = 1
        yi = y0
        xi = x0
    } else if (!B.has([y0 + h - 1, x0 + w - 1])) {
        dy = -1
        dx = -1
        yi = y0 + h - 1
        xi = x0 + w - 1
    } else if (!B.has([y0 + h - 1, x0])) {
        dy = -1
        dx = 1
        yi = y0 + h - 1
        xi = x0
    } else if (!B.has([y0, x0 + w - 1])) {
        dy = 1
        dx = -1
        yi = y0
        xi = x0 + w - 1
    }
    if (yi === -1 && xi === -1)
        return [-1, -1, 0, 0, true]

    while (!B.has([yi, xi])) {
        yi += dy;
    }
    yi -= dy
    while (!B.has([yi, xi])) {
        xi += dx;
    }
    xi -= dx;
    return [yi + dy, xi + dx, dy, dx, false]
}

function part2(data) {

	let res = 0;
    data = table(data)
    const bb = find_bbs(data);
    iter(bb, ([y0, x0, h, w, B]) => {
        const [yi, xi, dy, dx, is_rect] = find_inflection(B, y0, x0, w, h);
        if (is_rect) {
            const tmp = min(w, h)
            res += tmp
            return;
        }
        const yy = dy === -1 ? yi - y0 + 1 : y0 + h - yi
        const xx = dx === -1 ? xi - x0 + 1 : x0 + w - xi
        const tmp = min(min(w, h), yy + xx)
        res += tmp
    })

	debug(res);
	if (res) exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART2");
	return;
}

function split_h(by, bx, bh, bw, sy, sx, sh, sw) {
    return [
        [by, bx, sy - by, bw],
        [sy, bx, sh, sx - bx],
        [sy, sx + sw, sh, (bx + bw) - (sx + sw)],
        [sy + sh, bx, (by + bh) - (sy + sh), bw]
    ]
}

function split_v(by, bx, bh, bw, sy, sx, sh, sw) {
    return [
        [by, bx, bh, sx - bx],
        [by, sx, sy - by, sw],
        [sy + sh, sx, (by + bh) - (sy + sh), sw],
        [by, sx + sw, bh, (bx + bw) - (sx + sw)]
    ]
}

function hollow_rect(y0, x0, h, w, B) {
    const E = new set()
    let mny = y0 + h, mnx = x0 + w, mxy = y0, mxx = x0
    range(y0, y0 + h)(y => {
        range(x0, x0 + w)(x => {
            if (B.has([y, x])) return;
            E.add([y, x])
            mny = min(mny, y)
            mxy = max(mxy, y)
            mnx = min(mnx, x)
            mxx = max(mxx, x)
        })
    })
    const rh = split_h(y0, x0, h, w, mny, mnx, mxy - mny + 1, mxx - mnx + 1);
    const rv = split_v(y0, x0, h, w, mny, mnx, mxy - mny + 1, mxx - mnx + 1)

    return min(
        sum(rh.map(([_y, _x, h, w]) => min(h, w))),
        sum(rv.map(([_y, _x, h, w]) => min(h, w)))
    );
}

function part3(data) {

	let res = 0;
    data = table(data)
    const bb = find_bbs(data);
    iter(bb, ([y0, x0, h, w, B]) => {
        const [yi, xi, dy, dx, is_rect] = find_inflection(B, y0, x0, w, h);
        if (is_rect) {
            if (B.size !== w * h) {
                const tmp = hollow_rect(y0, x0, h, w, B)
                res += tmp
            } else {
                const tmp = min(w, h)
                res += tmp
            }
            return;
        }
        const yy = dy === -1 ? yi - y0 + 1 : y0 + h - yi
        const xx = dx === -1 ? xi - x0 + 1 : x0 + w - xi
        const tmp = min(min(w, h), yy + xx)
        res += tmp
    })

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

main('12');


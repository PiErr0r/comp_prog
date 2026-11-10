
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
    let D = {}
    iter(data, (row, y) => {
        iter(row, (col, x) => {
            switch(col) {
                case '>':
                    D[[y, x]] = [[0, 1]];
                    data[y][x] = '.'
                    break
                case '<':
                    D[[y, x]] = [[0, -1]];
                    data[y][x] = '.'
                    break
                case '^':
                    D[[y, x]] = [[-1, 0]];
                    data[y][x] = '.'
                    break
                case 'v':
                    D[[y, x]] = [[1, 0]]
                    data[y][x] = '.'
                    break
            }
        })
    })

    range(10)(round => {
        const nD = {}
        iter(keys(D), pos => {
            const [y, x] = ints(pos)
            range(D[pos].length)(di => {
                const [dy, dx] = D[pos][di];
                if (data[y+dy][x+dx] === '#') {
                    ++res;
                    if (!(pos in nD)) nD[pos] = []
                    nD[pos].push([dx, -dy])
                } else {
                    if (!([y+dy, x+dx] in nD))
                        nD[[y+dy, x+dx]] = [];
                    nD[[y+dy, x+dx]].push([dy, dx])
                }
            })
        })
        D = nD;
        iter(keys(D), pos => {
            if (D[pos].length > 1) {
                res += D[pos].length
                range(D[pos].length)(di => {
                    D[pos][di][0] *= -1;
                    D[pos][di][1] *= -1;
                })
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
    let D = {}
    iter(data, (row, y) => {
        iter(row, (col, x) => {
            switch(col) {
                case '>':
                    D[[y, x]] = [[0, 1, 0]];
                    data[y][x] = '.'
                    break
                case '<':
                    D[[y, x]] = [[0, -1, 0]];
                    data[y][x] = '.'
                    break
                case '^':
                    D[[y, x]] = [[-1, 0, 0]];
                    data[y][x] = '.'
                    break
                case 'v':
                    D[[y, x]] = [[1, 0, 0]]
                    data[y][x] = '.'
                    break
            }
        })
    })
    const LIMIT = 10000;
    while(1) {
        const nD = {}
        if (keys(D).length === 0)
            break
        iter(keys(D), pos => {
            const [y, x] = ints(pos)
            range(D[pos].length)(di => {
                const [dy, dx, pt] = D[pos][di];
                if (data[y+dy][x+dx] === '#') {
                    if (!(pos in nD)) nD[pos] = []
                    nD[pos].push([dx, -dy, pt + 1])
                } else {
                    if (!([y+dy, x+dx] in nD))
                        nD[[y+dy, x+dx]] = [];
                    nD[[y+dy, x+dx]].push([dy, dx, pt])
                }
            })
        })
        D = nD;
        iter(keys(D), pos => {
            D[pos] = D[pos].filter(([y, x, pt]) => pt < LIMIT);
            if (D[pos].length > 1) {
                range(D[pos].length)(di => {
                    D[pos][di][0] *= -1;
                    D[pos][di][1] *= -1;
                    D[pos][di][2]++;
                })
            }
            D[pos] = D[pos].filter(([y, x, pt]) => pt < LIMIT);
            if (D[pos].length === 0) delete D[pos]
        })
        ++res;
    }

	debug(res);
	if (res) exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART2");
	return;
}

function create_hash(D) {
    const S = [];
    iter(keys(D), pos => {
        const [y, x] = ints(pos)
        iter(D[pos], ([dy, dx, pt, id]) => {
            S.push(`${y}_${x}_${dy}_${dx}_${id}`);
        })
    })
    sort(S)
    return S.join("#")
}

function part3(data) {

	let res = 0;
    data = table(data.trim())
    let D = {}
    let id = 0;
    iter(data, (row, y) => {
        iter(row, (col, x) => {
            switch(col) {
                case '>':
                    D[[y, x]] = [[0, 1, 0, id++]];
                    data[y][x] = '.'
                    break
                case '<':
                    D[[y, x]] = [[0, -1, 0, id++]];
                    data[y][x] = '.'
                    break
                case '^':
                    D[[y, x]] = [[-1, 0, 0, id++]];
                    data[y][x] = '.'
                    break
                case 'v':
                    D[[y, x]] = [[1, 0, 0, id++]]
                    data[y][x] = '.'
                    break
            }
        })
    })
    const LIMIT = 1000000000000;
    let H = {}
    let until_dead = false;
    let nkeys = sum(keys(D).map(k => D[k].length));
    while(1) {
        const nD = {}
        if (keys(D).length === 0)
            break
        iter(keys(D), pos => {
            const [y, x] = ints(pos)
            range(D[pos].length)(di => {
                const [dy, dx, pt, id] = D[pos][di];
                if (data[y+dy][x+dx] === '#') {
                    if (!(pos in nD)) nD[pos] = []
                    nD[pos].push([dx, -dy, pt + 1, id])
                } else {
                    if (!([y+dy, x+dx] in nD))
                        nD[[y+dy, x+dx]] = [];
                    nD[[y+dy, x+dx]].push([dy, dx, pt, id])
                }
            })
        })
        D = nD;
        iter(keys(D), pos => {
            D[pos] = D[pos].filter(([y, x, pt, _]) => pt < LIMIT);
            if (D[pos].length > 1) {
                range(D[pos].length)(di => {
                    D[pos][di][0] *= -1;
                    D[pos][di][1] *= -1;
                    D[pos][di][2]++;
                })
            }
            D[pos] = D[pos].filter(([y, x, pt, _]) => pt < LIMIT);
            if (D[pos].length === 0) delete D[pos]
        })
        ++res;
        if (sum(keys(D).map(k => D[k].length)) !== nkeys) {
            if (until_dead) {
                until_dead = false;
            }
            H = {};
            nkeys = sum(keys(D).map(k => D[k].length))
            debug(res, nkeys)
        } else {
            const h = create_hash(D);
            if (h in H) {
                const [pres, pD] = H[h][H[h].length - 1]
                const prev_pts = [];
                const next_pts = [];
                iter(keys(D), pos => {
                    range(D[pos].length)(i => {
                        const [pdy, pdx, ppt, pid] = pD[pos][i]
                        const ii = D[pos].findIndex(([dy, dx, pt, id]) => id === pid);
                        const [dy, dx, pt, id] = D[pos][ii]
                        prev_pts.push([pid, ppt])
                        next_pts.push([id, pt])
                    })
                })
                sort(prev_pts, ([id1, _1], [id2, _2]) => id1 - id2)
                sort(next_pts, ([id1, _1], [id2, _2]) => id1 - id2)
                const diff = next_pts[0][1] - prev_pts[0][1];
                let min_n = floor((LIMIT - 1 - next_pts[0][1]) / diff);
                let mx_i = 0;
                for (let i = 1; i < prev_pts.length; ++i) {
                    const diff = next_pts[i][1] - prev_pts[i][1];
                    // solve pt + n * diff == LIMIT
                    // n = (LIMIT - pt) // diff
                    const n = floor((LIMIT - 1 - next_pts[i][1]) / diff);
                    if (n < min_n) {
                        mx_i = i;
                        min_n = n
                    } else if (n === min_n) {
                        if (next_pts[i][1] > next_pts[mx_i][1]) {
                            mx_i = i;
                        }
                    }
                }
                iter(keys(D), pos => {
                    iter(D[pos], ([dy, dx, pt, id], ppi) => {
                        const i = prev_pts.findIndex(([_id, _pt]) => id === _id);
                        D[pos][ppi][2] += min_n * (pt - prev_pts[i][1])
                    })
                })
                res += min_n * (res - pres)
                until_dead = true;
                H = {}
            } else {
                H[h] = [[res, copy([D])[0]]]
            }
        }
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

main('10');


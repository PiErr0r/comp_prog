
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
    data = getGroups(data)
    const G = {}
    const P = {}
    iter(data, g => {
        const [_p, ..._b] = lines(g)
        const [_1, p, _2, _3, pt] = _p.split(" ")
        P[p] = int(pt)
        G[p] = []
        iter(_b, b => {
            const [_1, typ, _2, _3, ..._data] = b.split(" ")
            if (typ === "free") {
                const [_1, bt] = _data;
                G[p].push([null, int(bt)])
            } else {
                const [pp, _1, _2, bt] = _data;
                G[p].push([pp, int(bt)]);
            }
        })
    })
    return [P, G]
}

function part1(data) {

	let res = 0;
    const [P, G] = parse_data(data)
    const E = {}
    iter(keys(P), p => {
        let bright = 0;
        iter(G[p], ([conn, t]) => {
            if (conn === null) bright = 1;
            else {
                bright += t * E[conn]
            }
        })
        if (bright >= P[p]) {
            E[p] = bright
            res = bright
        } else {
            E[p] = 0
        }
    })


	debug(res);
	if (res) exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART1");
	return;
}

function part2(data) {

	let res = 0;
    let [_data, T] = data.split('\n\n\n')
    T = lines(T).map(l => ints(l))
    const [P, G] = parse_data(_data)
    iter(T, row => {
        const E = {}
        let last;
        iter(keys(P), p => {
            last = p;
            let bright = 0;
            iter(G[p], ([conn, t]) => {
                if (conn === null) {
                    bright = row[int(p) - 1]
                } else {
                    bright += t * E[conn]
                }
            })
            if (bright >= P[p]) {
                E[p] = bright
            } else {
                E[p] = 0
            }
        })
        res += E[last]
    })

	debug(res);
	if (res) exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART2");
	return;
}

function find_max(P, G) {
    let EE = 0;
    const L = keys(G).reduce((acc, curr) => {
        acc += G[curr].length === 1
        return acc
    }, 0)
    const n = sqrt(L);
    let genes = [];
    range(n)(_ => {
        const g = empty(L)
        iter(g, (gg, i) => {
            if (randint(100) > 15) g[i] = 1;
        })
        genes.push(g)
    })

    let changed = false
    let cnt = 0;
    while (cnt < 1000) {
        const E = {}
        if (!changed) {
            ++cnt
        }
        changed = false
        const R = []
        iter(genes, (row, ri) => {
            const E = {}
            let last;
            iter(keys(P), p => {
                last = p;
                let bright = 0;
                iter(G[p], ([conn, t]) => {
                    if (conn === null) {
                        bright = row[int(p) - 1]
                    } else {
                        bright += t * E[conn]
                    }
                })
                if (bright >= P[p]) {
                    E[p] = bright
                } else {
                    E[p] = 0
                }
            })
            if (E[last] > EE) {
                changed = true
                cnt = 0
                EE = E[last]
            }
            R.push([row, E[last]])
        })
        sort(R, (a, b) => b[1] - a[1])
        const ngenes = [];
        range(n)(_ => {
            const a = randint(genes.length / 4)
            let b;
            do {
                b = randint(genes.length / 4);
            } while (a === b);
            const c = [...R[a][0].slice(0, floor(L/2)), ...R[b][0].slice(floor(L/2))]
            iter(c, (v, i) => {
                if (randint(1000) < 20) {
                    c[i] = 1 - c[i]
                }
            })
            ngenes.push(c)
        })
        genes = ngenes
    }
    return EE
}

function part3(data) {

	let res = 0;
    let [_data, T] = data.split('\n\n\n')
    T = lines(T).map(l => ints(l))
    const [P, G] = parse_data(_data)
    const EE = find_max(P, G)
    iter(T, row => {
        const E = {}
        let last;
        iter(keys(P), p => {
            last = p;
            let bright = 0;
            iter(G[p], ([conn, t]) => {
                if (conn === null) {
                    bright = row[int(p) - 1]
                } else {
                    bright += t * E[conn]
                }
            })
            if (bright >= P[p]) {
                E[p] = bright
            } else {
                E[p] = 0
            }
        })
        if (E[last] !== 0)
            res += EE - E[last]
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

main('18');


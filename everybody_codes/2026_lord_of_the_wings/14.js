
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

function bfs(data, sy, sx) {
    const C = data[sy][sx]
    const q = new Queue()
    q.push([sy, sx])
    const seen = new set()
    while (!q.empty()) {
        const [y, x] = q.pop();
        if (seen.has([y, x])) continue;
        seen.add([y, x])
        iter(D4, ([dy, dx]) => {
            const [ny, nx] = [y + dy, x + dx]
            if (!inBB(ny, nx, data)) return
            if (data[ny][nx] !== C) return
            q.push([ny, nx])
        })
    }
    return seen
}

function calc_circ(tiles, data, C, seen) {
    let c = 0;
    iter([...tiles], ([y, x]) => {
        iter(D4, ([dy, dx]) => {
            const [ny, nx] = [y + dy, x + dx]
            if (!inBB(ny, nx, data)) ++c;
            else if (data[ny][nx] !== C && !seen.has(data[ny][nx])) ++c
        })
    })
    return c;
}

function part1(data) {

	let res = 0;
    data = table(data)
    const seen = new set();
    iter(data, (row, y) => {
        iter(row, (col, x) => {
            if (!seen.has(col)) {
                const tiles = bfs(data, y, x);
                const tmp = calc_circ(tiles, data, col, seen)
                res += tmp
                seen.add(col)
            }
        })
    })

	debug(res);
	if (res) exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART1");
	return;
}

function connect_graph(G, C, tiles, data) {
    G[C] = {}
    const entry = (D, key) => {
        if (key in D) D[key]++
        else D[key] = 1;
    }
    iter([...tiles], ([y, x]) => {
        iter(D4, ([dy, dx]) => {
            const [ny, nx] = [y + dy, x + dx]
            if (!inBB(ny, nx, data)) {
                entry(G[C], 'out')
                if (!('out' in G)) G['out'] = {}
                entry(G['out'], C)
            } else if (data[ny][nx] !== C) {
                entry(G[C], data[ny][nx]);
                //if (!(data[ny][nx] in G)) G[data[ny][nx]] = {};
                //entry(G[data[ny][nx]], C)
            }
        })
    })
}

function dijkstra(G, s) {
    iter(keys(G), k => {
        G[k].res = Infinity
        G[k].f = ''
    })
    const q = new PriorityQueue((a, b) => a[1] - b[1])
    q.push(["", s, 0])
    const seen = new set()
    while (!q.empty()) {
        const [f, curr, pt] = q.pop();
        if (seen.has([f, curr, pt])) continue
        seen.add([f, curr, pt])
        if (pt > G[curr].res) continue
        G[curr].res = pt
        G[curr].f = f
        iter(keys(G[curr]), k => {
            if (k === 'res' || k === 'f') return;
            if (pt + G[curr][k] > G[k].res) return;
            q.push([curr, k, pt + G[curr][k]])
        })
    }
}

function dfs(G, K, S, res) {
    if (S.size === keys(G).length) {
        debug("HERE")
        return res;
    }
    let mn = res
    S.add(K)
    iter(keys(G[K]), k => {
        if (S.has(k)) return
        const tmp = dfs(G, k, S, G[K][k])
        mn += tmp
    })
    S.delete(K)
    //debug(K, res, mn)
    return mn;
}

function prim(G) {
    const V = keys(G)
    const C = {};
    const E = {};
    iter(V, k => {
        C[k] = Infinity;
        E[k] = null
    })

    const nex = new set(V);

    C[V[0]] = 0

    while (nex.size > 0) {
        let curr;
        let mn = Infinity
        iter(V, v => {
            if (!nex.has(v)) return
            if (C[v] < mn) {
                curr = v;
                mn = C[v];
            }
        })

        nex.delete(curr);

        iter(keys(G[curr]), k => {
            if (nex.has(k) && G[curr][k] < C[k]) {
                C[k] = G[curr][k]
                E[k] = curr
            }
        })
    }
    const R = []
    iter(V, v => {
        if (E[v] !== null) R.push([E[v], v])
    })

    let r = 0;
    iter(R, ([a, b]) => {
        r += G[a][b]
    })
    return r
}

function part2(data) {

	let res = 0;
    data = table(data)
    const G = {}
    const seen = new set()
    iter(data, (row, y) => {
        iter(row, (col, x) => {
            if (!seen.has(col)) {
                const tiles = bfs(data, y, x);
                connect_graph(G, col, tiles, data)
                seen.add(col)
            }
        })
    })
    res = prim(G)
	debug(res);
	if (res) exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART2");
	return;
}

function best_prim(G) {
    const V = keys(G)
    const nV = new set(V)
    nV.delete('out')
    const cV = combinations([...nV], 2)
    let mnr = Infinity
    iter(cV, ([ea, eb]) => {
        const C = {};
        const E = {};
        iter(V, k => {
            C[k] = Infinity;
            E[k] = null
        })

        const nex = new set(V);

        C[ea] = 0
        C[eb] = 0
        E[ea] = null
        E[eb] = null

        while (nex.size > 0) {
            let curr;
            let mn = Infinity
            iter(V, v => {
                if (!nex.has(v)) return
                if (C[v] < mn) {
                    curr = v;
                    mn = C[v];
                }
            })

            nex.delete(curr);

            iter(keys(G[curr]), k => {
                if (nex.has(k) && G[curr][k] < C[k]) {
                    C[k] = k === ea || k === eb || curr === ea || curr === eb ? 0 : G[curr][k]
                    E[k] = curr
                }
            })
        }
        const R = []
        let cnt_null = 0
        iter(V, v => {
            if (E[v] === null) ++cnt_null
            if (v === ea || v === eb || E[v] === ea || E[v] === eb) return
            if (E[v] !== null) R.push([E[v], v])
        })

        let r = 0;
        iter(R, ([a, b]) => {
            r += G[a][b]
        })
        mnr = min(mnr, r)
    })
    return mnr
}

function part3(data) {

	let res = 0;
    data = table(data)
    const G = {}
    const seen = new set()
    iter(data, (row, y) => {
        iter(row, (col, x) => {
            if (!seen.has(col)) {
                const tiles = bfs(data, y, x);
                connect_graph(G, col, tiles, data)
                seen.add(col)
            }
        })
    })
    res = best_prim(G)

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

main('14');


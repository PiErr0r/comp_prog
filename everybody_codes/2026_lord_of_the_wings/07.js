
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

function solve(data, energy_init) {
	let res = 0;
    data = lines(data.trim())
    const ids = [];
    const N = {};
    const imp = {};
    let max_conn = -1;
    iter(data, ln => {
        const [_id, _en, _conn] = ln.split(", ");
        const id = _id.split("=")[1];
        const en = int(_en.split("=")[1]);
        const conn = ints(_conn.split("=")[1])
        if (max_conn === -1 || conn.length > N[max_conn].conn.length) {
            max_conn = id;
        }
        N[id] = { en, conn, total: 0 };
        imp[id] = 0;
        ids.push(id);
    })
    let energy = energy_init;
    imp[max_conn] = 1;
    N[max_conn].total = energy;
    while (energy > 1) {
        const nimp = new DD(0);
        iter(ids, id => {
            if (imp[id]) {
                iter(N[id].conn, conn => {
                    N[conn].total += imp[id] * (energy - 1);
                    nimp[conn] += imp[id];
                })
            }
        })
        iter(ids, id => {
            imp[id] = nimp[id];
        });
        --energy;
    }
    iter(ids, id => {
        res += N[id].total + N[id].en;
    });
    return res;
}

function part1(data) {

    const res = solve(data, 5);

	debug(res);
	if (res) exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART1");
	return;
}

function part2(data) {

    const res = solve(data, 10);

	debug(res);
	if (res) exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART2");
	return;
}

function solve3(data, energy_init, energy_max, start) {
	let res = 0;
    data = lines(data.trim())
    let ids = [];
    const N = {};
    const imp = {};
    iter(data, ln => {
        const [_id, _en, _conn] = ln.split(", ");
        const id = _id.split("=")[1];
        const en = int(_en.split("=")[1]);
        const conn = ints(_conn.split("=")[1])
        N[id] = { conn, total: en };
        ids.push(id);
    })
    if (!(start in N)) return -1;
    imp[start] = { [energy_init]: 1 };
    N[start].total += energy_init;
    let removed = [];
    while (keys(imp).length) {
        const nimp = {};
        iter([...ids, ...removed], id => {
            if (imp[id]) {
                iter(keys(imp[id]), en => {
                    en = int(en)
                    iter(N[id].conn, conn => {
                        if (!(conn in N)) return;
                        N[conn].total += imp[id][en] * (en - 1);
                        if (en - 1 === 1) return;
                        if (conn in nimp) {
                            if ((en - 1) in nimp[conn]) {
                                nimp[conn][en-1] += imp[id][en];
                            } else {
                                nimp[conn][en-1] = imp[id][en]
                            }
                        } else {
                            nimp[conn] = { [en-1] : imp[id][en] };
                        }
                    })
                })
            }
        })
        iter(removed, rid => {
            delete N[rid]
            delete nimp[rid]
            delete imp[rid]
        });
        removed = []
        const nids = [];
        iter(ids, id => {
            if (N[id].total >= energy_max) {
                removed.push(id)
                if (id in nimp) {
                    if (energy_init + 1 in nimp[id]) {
                        nimp[id][energy_init+1]++;
                    } else {
                        nimp[id][energy_init + 1] = 1
                    }
                } else {
                    nimp[id] = { [energy_init + 1]: 1 };
                }
            } else {
                nids.push(id)
            }
        })
        ids = [...nids]
        keys(imp).forEach(k => delete imp[k]);
        iter(keys(nimp), id => {
            imp[id] = nimp[id]
        });
    }
    iter(ids, id => {
        res += N[id].total;
    });
    return res;
}

function part3(data) {

    let i = 1;
    let res = 0;
    while (true) {
        const curr = solve3(data, 10, 1000000, i);
        if (curr === -1) break;
        res = max(res, curr);
        ++i;
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

main('07');


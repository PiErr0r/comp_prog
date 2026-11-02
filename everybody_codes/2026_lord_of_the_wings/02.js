
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

function insert(N, a, b, greater) {
    if (a in N) {
        N[a][b] = greater;
    } else {
        N[a] = {[b]: greater};
    }
    if (b in N) {
        N[b][a] = -greater;
    } else {
        N[b] = {[a]: -greater};
    }
}

function part1(data) {

	let res = 0;
    data = lines(data.trim());
    iter(data, line => {
        const comps = line.split(' ');
        const N = {};
        const nums = new set();
        iter(comps, comp => {
            const [a, b] = ints(comp)
            nums.add(a);
            nums.add(b);
            const greater = in_('>', comp);
            insert(N, a, b, greater ? -1 : 1);
        })
        const L = [...nums];
        sort(L, (a, b) => {
            return N[a][b];
        });
        res += int(L.join(''));
    })

	debug(res);
	if (res) exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART1");
	return;
}

function resolve(N, n) {
    iter(keys(N), i => {
        let S = int(i);
        iter(keys(N[i]), j => {
            S += int(j);
        })
        const SS = n * (n + 1) / 2;
        if (SS === S) return;
        const missing = SS - S;
        iter(keys(N[i]), j => {
            if (N[i][j] === N[j][missing]) {
                N[i][missing] =  N[i][j];
                N[missing][i] = -N[i][j];
            }
        })
    })
}

function part2(data) {

	let res = 0;
    data = lines(data.trim());
    iter(data, line => {
        const comps = line.split(' ');
        const N = {};
        const nums = new set();
        iter(comps, comp => {
            const [a, b] = ints(comp)
            nums.add(a);
            nums.add(b);
            const greater = in_('>', comp);
            insert(N, a, b, greater ? -1 : 1);
        })
        resolve(N, nums.size);
        const L = [...nums];
        sort(L, (a, b) => {
            return N[a][b];
        });
        res += int(L.join(''));
    })

	debug(res);
	if (res) exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART2");
	return;
}

function resolve_multiple(N, nums) {
    iter(keys(N), i => {
        const miss = nums.difference(new set(keys(N[i])));
        if (miss.size === 0) return;
        iter([...miss], missing => {
            iter(keys(N[i]), j => {
                if (N[i][j] === N[j][missing]) {
                    N[i][missing] =  N[i][j];
                    N[missing][i] = -N[i][j];
                }
            })
        })
    })
}

function part3(data) {

	let res = 0;
    data = lines(data.trim());
    iter(data, line => {
        const comps = line.split(' ');
        const N = {};
        const nums = new set();
        iter(comps, comp => {
            const [a, b] = ints(comp)
            nums.add(a);
            nums.add(b);
            const greater = in_('>', comp);
            insert(N, a, b, greater ? -1 : 1);
        })
        const L = [...nums];
        resolve_multiple(N, nums);
        sort(L, (a, b) => {
            return N[a][b];
        });
        res += int(L.join(''));
    })

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

main('02');


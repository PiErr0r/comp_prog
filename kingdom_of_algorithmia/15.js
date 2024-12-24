
const fs = require('fs');
const { exec } = require("child_process");
const { D4, D6, D8, MOD } = require("../../aoc/lib");
const { joseph, findCycle } = require("../../aoc/lib");
const { cache } = require("../../aoc/lib");
const { bin, float, hex, int, num, oct } = require("../../aoc/lib");
const { range, drange, trange, iter, diter, titer } = require("../../aoc/lib");
const { copy,	entries, in_, inBB, keys, sort, values } = require("../../aoc/lib");
const { Counter, DD, empty, FastQueue, PriorityQueue, Queue, set, Stack } = require("../../aoc/lib");
const { ord, chr, count, debug, disp, disp3, crt, gcd, lcm, modPow, modPowBig, modInv, mod, prod, prodBig, randint, sum, sumBig, transpose } = require("../../aoc/lib");
const { digits, ints,	floats,	singles,	words,	lines,	table,	groups,	getGroups,	groupsWith,	parse,	parseLine, scanf } = require ('../../aoc/lib');
const { min, max, random, abs, ceil, floor, log, log10, log2, round, sign, sin, cos, tan, asin, acos, atan, atan2, sqrt, PI } = Math;
const { isSuperset, or, and, xor, sub } = set;
const { combinations, combinations_with_replacement, next_permutation, product, unique_permutations } = require("../../aoc/lib");

const bfs = (G, [sy, sx], toFind) => {
	const q = new Queue();
	q.push([sy, sx, 0]);
	const seen = new set();
	while (!q.empty()) {
		const [y, x, t] = q.pop();
		if (seen.has([y, x])) continue;
		seen.add([y, x]);
		if (G[y][x] === toFind) {
			return [y, x, t];
		}
		iter(D4, ([dy, dx]) => {
			if (!inBB(y+dy, x+dx, G)) return;
			if (G[y+dy][x+dx] === '#') return;
			q.push([y+dy, x+dx, t + 1]);
		})
	}
	return -1;
}

function part1(data) {

	let res = 0;
	const G = table(data);
	let sy = 0, sx;
	iter(G[0], (c, i) => {
		if (c === '.') sx = i;
	})

	res = 2 * bfs(G, [sy, sx], 'H')[2];

	debug(res);
	if (res) exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART1");
	return;
}

function part2(data) {

	let res = 0;
	const G = table(data);
	let sy = 0, sx;
	iter(G[0], (c, i) => {
		if (c === '.') sx = i;
	})
	G[sy][sx] = 'F';

	let lets = 'ABCDE'.split('');
	res = MOD;
	do {
		debug(lets, res)
		let [y, x] = [sy, sx];
		let T = 0;
		iter([...lets, 'F'], c => {
			const [ry, rx, t] = bfs(G, [y, x], c);
			T += t;
			[y, x] = [ry, rx];
		});
		res = min(res, T);
	} while (next_permutation(lets));

	debug(res);
	if (res) exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART2");
	return;
}

const bfs3 = (G, [sy, sx], found) => {
	const q = new Queue();
	q.push([sy, sx, 0]);
	const seen = new set();
	while (!q.empty()) {
		const [y, x, t] = q.pop();
		if (seen.has([y, x])) continue;
		seen.add([y, x]);
		if (G[y][x] !== '.' && !found.has(G[y][x])) {
			found.add(G[y][x]);
			return [y, x, t];
		}
		iter(D4, ([dy, dx]) => {
			if (!inBB(y+dy, x+dx, G)) return;
			if (G[y+dy][x+dx] === '#') return;
			if (G[y+dy][x+dx] === '~') return;
			q.push([y+dy, x+dx, t + 1]);
		})
	}
	return -1;
}

function part3(data) {

	let res = 0;
	const G = table(data);
	let sy = 0, sx;
	const lets = new set();
	iter(G, (r, i) => {
		iter(r, (c, j) => {
			if (i === 0 && c === '.') sx = j;
			if (!in_(c, '#.~')) lets.add(c);
		})
	})

	const found = new set();
	let [y, x] = [sy, sx];
	let cnt = 0;
	while (xor(found, lets).values().next().value !== 'Z') {
		found.delete('Z');
		const [ry, rx, t] = bfs3(G, [y, x], found);
		if (found.size === lets.size)
			G[sy][sx] = 'Z';
		res += t;
		[y, x] = [ry, rx];
		debug('!!', [...xor(found, lets)], xor(found, lets).size, [...found], [y, x])
	}

	debug(res);
	if (res) exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART3");
	return;
}

function part4(data){
const init = (input) => input.split("\n").map(line => line.split(''));
const addVect = (a, b) => a.map((v, c) => v+b[c]);
const k = v => v.join('_');

const MOVES = {
    U: [0, 1], // y grows up
    D: [0, -1], // y grows up
    R: [1, 0],
    L: [-1, 0],
}

const movesVects = Object.values(MOVES);

let dmaps = {};

const distanceMap = (map, from) => {
    let key = k(from);
    if (dmaps[key] !== undefined) return dmaps[key];
    let stack = [{
        p: [...from],
        dist: 0
    }]

    let filled = map.map(row => row.map(v => Infinity))

    while (stack.length != 0) {
        let cur = stack.shift();
        if (filled[cur.p[1]][cur.p[0]] <= cur.dist) continue;
        filled[cur.p[1]][cur.p[0]] = cur.dist;

        movesVects.forEach(m => {
            let np = addVect(cur.p, m);
            if (np[0] < 0 || np[0] > map[0].length-1 || np[1] < 0 || np[1] > map.length-1) return true;
            if (['~', '#'].includes(map[np[1]][np[0]])) return true;
            if (filled[np[1]][np[0]] <= cur.dist+1) return true;
            stack.push({
                p: np,
                dist: cur.dist+1
            })
        })
    }
    dmaps[key] = filled;
    return filled;
}

const p1 = (map) => {
    let res = '';
    let start = [0, 0]; // x, y
    let fruits = [], fruitTypes = {};
    map.forEach((row, y) => row.forEach((v, x) => {
        if (y == 0 && v == '.') start[0] = x;
        if (['~', '#', '.'].includes(v)) return true;
        fruits.push({type : v, p: [x, y]});
        fruitTypes[v] = 1;
    }))

    let dmap = distanceMap(map, start);
    return 2*Math.min(...fruits.map(o => dmap[o.p[1]][o.p[0]]))
}

const permutator = (inputArr) => {
    let result = [];
    const permute = (arr, m = []) => {
        if (arr.length === 0) {
            result.push(m)
        } else {
            for (let i = 0; i < arr.length; i++) {
                let curr = arr.slice();
                let next = curr.splice(i, 1);
                permute(curr.slice(), m.concat(next))
            }
        }
    }

    permute(inputArr)
    return result;
}

const p2 = (map, start, end) => {
    dmaps = {};

    let fruits = [], fruitTypes = {};

    map.forEach((row, y) => row.forEach((v, x) => {
        if (y == 0 && v == '.' && start == undefined) start = [x, y];
        if (['~', '#', '.'].includes(v)) return true;
        fruits.push({type : v, p: [x, y]});
        if (fruitTypes[v] == undefined) fruitTypes[v] = 0;
        fruitTypes[v]++;
    }))

    if (end == undefined) end = [...start];

    //console.log(fruitTypes);

    let min = Infinity;
    let dmap0 = distanceMap(map, start);

    const recur = (seq, lastDist, lastDmap) => {
        fruits.filter(o => o.type == seq[0]).forEach(fruit => {
            let dist = lastDist + lastDmap[fruit.p[1]][fruit.p[0]];
            if (dist >= min) return true;
            let dmap = distanceMap(map, fruit.p);

            if (seq.length > 1) {
                recur(seq.slice(1), dist, dmap)
            } else {
                dist += dmap[end[1]][end[0]];
                if (dist < min) min = dist;
            }
        })
    }

    permutator(Object.keys(fruitTypes)).forEach(sequence => recur(sequence, 0, dmap0))

    return min;
}

// this is not a generic solution; it works for all inputs known to me tho, that have junction points from middle section to left and right at the very bottom, and has herbs close enough
// we're altering the input slightly by renaming one of the herbs in the lowest line middle section (K->L) so they both became unique (and thus had to be visited)
// a more general approach would be BFS on highly evolving graph, but nobody's ain't got no time for that
const p3 = (map) => {
    let maps = [], h = map.length, w = 85;
    for (let i = 0; i < 3; i++) {
        maps[i] = map.map(row => row.slice(85*i, 85*(i+1)))
    }
    maps[1][h-2][maps[1][h-2].indexOf('K')] = 'L';

    let map0Dist = p2(maps[0], [w-1, h-2]) + 1; // +1 for moving between maps
    let map2Dist = p2(maps[2], [0, h-2]) + 1; // +1 for moving between maps

    let dist = p2(maps[1]) + 2 + 2*maps[1][h-2].indexOf('L') + 2*((w-1) - maps[1][h-2].indexOf('K')); // +2 from moving between maps, +4 from moving from the herbs 1 square away from the corner as maps[1][h-2].indexOf('L') = 1

    return map0Dist + map2Dist + dist;
}

console.log('p3', p3(init(data)));
}

function main(n) {
	part1(fs.readFileSync(`${n}a_input`).toString("utf-8"));
	// part2(fs.readFileSync(`${n}b_input`).toString("utf-8"));
	part3(fs.readFileSync(`${n}c_input`).toString("utf-8"));
	// part4(fs.readFileSync(`${n}c_input`).toString("utf-8"));
	process.exit(0);
}

main('15');


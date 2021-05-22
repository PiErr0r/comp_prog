#!/usr/bin/env python3
# -*- coding: utf-8 -*-

from itertools import permutations
from math import inf

def pn(n):
    ps = permutations(str(n))
    cnt = 0
    for p in ps:
        i = int("".join(p))
        nn = i ** (1/3)
        if nn - nn // 1 < 0.000001:
            cnt += 1
    return cnt

i = 10
cnt = 0
ps = {}

while True:
    if i % 1000 == 0:
        print(i)
    cube = i ** 3
    cs = tuple(sorted(list(str(cube))))
    try:
        ps[cs][0] += 1
        if cube < ps[cs][1]:
            ps[cs][1] = cube
    except:
        ps[cs] = [1, cube]
    if ps[cs][0] == 5:
          print("over", cs)
          break
    i += 1

print(ps[cs])

cs = list(cs)


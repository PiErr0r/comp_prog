"""
This seems like a right solution but it isnt
maybe python precision shits the bed
"""
from math import sqrt

def is_int(x):
    print(x)
    if x is not None and x == x // 1:
        return x
    return None

def solve_for(n):
    # a = 1; b = -1; c = i * (i - 1) / 2
    c = n * (n - 1) / 2.0
    sq = sqrt(1 + 4 * c)
    x = (1 + sq) / 2
    return x

first = 10**12 + 1
#first = 25

found = False

i = first
while not found:
    sols = solve_for(i)
    s = is_int(sols)
    if s is not None:
        print(i, i - s)
        break
    i += 1

print(s)

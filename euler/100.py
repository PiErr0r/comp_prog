"""
This seems like a right solution but it isnt
maybe python precision shits the bed
"""
"""
No, the goal is actually to find `a and a-1` such that you can add 2 to list of their divisors (div_arr) and then find numbers `b and b-1` such that their divisors are div_arr

from the example the next such number is a = 85
    85: 5 17
    84: 2 2 3 7
and b = 120
    120: 2 2 2 3 5
    119: 7 17
"""
from math import sqrt

def is_int(x):
    #print(x)
    if x is not None and x == x // 1:
        return int(x)
    return None

def solve_for(n):
    # a = 1; b = -1; c = i * (i - 1) / 2
    c = n * (n - 1) >> 1
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
    #if s is not None and s*(s-1)/(i*(i-1)) == 0.5:
    if s is not None and 2*s*(s-1) == i*(i-1):
        print(i, i - s)
        break
    i += 1

print(s)

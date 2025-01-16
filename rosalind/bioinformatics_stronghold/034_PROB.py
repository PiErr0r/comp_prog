from math import log10

def calc2(s, x):
    p = 1
    for c in s:
        if c in 'GC':
            p *= x / 2.0
        else:
            p *= (1-x) / 2.0
    return log10(p)


def calc(s, x):
    p = 0
    for c in s:
        if c in 'GC':
            p += log10(x / 2.0)
        else:
            p += log10((1-x) / 2.0)
    return p


with open('034_prob.txt') as f:
    [s, probs, _] = f.read().split('\n')

A = list(map(float, probs.split(' ')))

B = [calc(s, x) for x in A]
print(' '.join(map(lambda f: str(round(f, 3)), B)))

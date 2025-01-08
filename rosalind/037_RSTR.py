
def calc(s, x):
    p = 1
    for c in s:
        if c in 'GC':
            p *= x / 2.0
        else:
            p *= (1-x) / 2.0
    return p

with open('037_rstr.txt') as f:
    [NN, s, _] = f.read().split('\n')

[N, p] = NN.split(' ')
N = int(N)
p = float(p)
p = calc(s, p)
res = 1 - (1-p) ** N
print(round(res, 3))

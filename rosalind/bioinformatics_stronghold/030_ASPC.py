# f = lambda n: 1 if n <= 1 else n * f(n-1)
def f(n):
    res = 1
    for i in range(1, n + 1):
        res *= i
    return res
P = lambda n, k: f(n) // (f(k) * f(n-k))

with open ('030_aspc.txt') as ff:
    [m, n] = list(map(int, ff.read().split(' ')))

S = sum(P(max(m, n), i) % 1000000 for i in range(min(m, n), max(m, n) + 1)) % 1000000
print(S)

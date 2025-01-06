M = 1000000
f = lambda n: 1 if n <= 1 else n * f(n-1)
P = lambda n, k: f(n) / f(n-k) % M

[n, k] = list(map(int, input().split(' ')))
print(P(n, k))

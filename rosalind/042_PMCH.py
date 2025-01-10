from helpers import read_fasta

data = read_fasta('list')[0]

A = 0
G = 0

for c in data:
    if c == 'A': A += 1
    if c == 'G': G += 1

f = lambda n: 1 if n <= 1 else n * f(n-1)

print(f(A) * f(G))

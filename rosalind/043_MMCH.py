from helpers import read_fasta

data = read_fasta('list')[0]

A = 0
U = 0
G = 0
C = 0

for c in data:
    if c == 'A': A += 1
    if c == 'U': U += 1
    if c == 'C': C += 1
    if c == 'G': G += 1

def cnt(a, b):
    a, b = max(a, b), min(a, b)
    ca = a
    cb = b - 1
    p = 1
    while cb:
        p *= ca
        ca -= 1
        cb -= 1

    return ca * p

print(cnt(A, U) * cnt(G, C))

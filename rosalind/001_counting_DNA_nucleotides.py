sample = 'AGCTTTTCATTCTGACTGCAACGGGCAATATGTCTCTGTGTGGATTAAAAAAAGAGTGTCTGATAGCAGC'

d = dict(A=0, C=0, T=0, G=0)

sample = input()
for c in sample:
    d[c] += 1

print(d)
for c in ['A', 'C', 'G', 'T']:
    print(d[c], end=' ')

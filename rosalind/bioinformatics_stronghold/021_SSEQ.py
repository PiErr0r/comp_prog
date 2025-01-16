from helpers import read_fasta

[a, b] = read_fasta('list')

ai = bi = 0
seqs = []
while bi < len(b):
    if ai >= len(a):
        print("Something bad")
    if a[ai] == b[bi]:
        seqs.append(ai + 1)
        bi += 1
    ai += 1

print(' '.join(list(map(str, seqs))))

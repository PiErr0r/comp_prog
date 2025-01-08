from helpers import read_fasta

data = read_fasta('list')[0]

A = [0 for i in range(len(data))]

for i, c in enumerate(data):
    if i == 0: continue

    j = 0
    while data[i + j] == data[j]:
        A[i + j] = max(A[i+j], j+1)
        j += 1

print(" ".join(map(str, A)))

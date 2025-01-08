from helpers import read_fasta

data = read_fasta('list')

M = [[0 for i in range(len(data))] for j in range(len(data))]

for i in range(len(data)):
    for j in range(i, len(data)):
        D = 0.0
        for k in range(len(data[i])):
            if data[i][k] != data[j][k]:
                D += 1.0
        M[i][j] = round(D/len(data[i]), 5)
        M[j][i] = round(D/len(data[i]), 5)

print("\n".join(map(lambda r: " ".join(f"{c:1.5f}" for c in r), M)))

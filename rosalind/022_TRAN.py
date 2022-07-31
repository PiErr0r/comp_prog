from helpers import read_fasta

transitions = {'A': 'G', 'G': 'A', 'C': 'T', 'T': 'C'}
transversions1 = {'A': 'C', 'C': 'A', 'G': 'T', 'T': 'G'}
transversions2 = {'A': 'T', 'T': 'A', 'C': 'G', 'G': 'C'}

[a, b] = read_fasta('list')

i = 0

sits = 0
vers = 0

while i < len(a):
    if a[i] == transitions[b[i]]:
        sits += 1
    if a[i] in [transversions1[b[i]], transversions2[b[i]]]:
        vers += 1

    i += 1

print(sits/vers)

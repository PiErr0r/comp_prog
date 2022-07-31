from helpers import read_fasta, codon_table

[s] = read_fasta('list')

rna = ''.join(['U' if i == 'T' else i for i in s])

M = {'A': 'U', 'U': 'A', 'G': 'C', 'C': 'G'}

def complement(s):
    res = ''
    for l in s:
        res += M[l]
    return res

def get_prot(prot):
    res = ''
    for i in range(0, len(prot), 3):
        if len(prot[i:i+3]) != 3:
            break
        tmp = codon_table[prot[i:i+3]]
        if tmp == 'Stop':
            return res
        res += tmp
    return None

result = []
for i in range(len(rna) - 3):
    if rna[i:i+3] == 'AUG':
        result.append(get_prot(rna[i:]))

rna = complement(''.join(reversed(list(rna))))
for i in range(len(rna) - 3):
    if rna[i:i+3] == 'AUG':
        result.append(get_prot(rna[i:]))

for r in set(result):
    if r is not None:
        print(r)


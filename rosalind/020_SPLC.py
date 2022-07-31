from helpers import codon_table

s = None

dna = None
introns = []

while True:
    tmp = input()
    if len(tmp) == 0:
        introns.append(s)
        break
    if tmp[0] == '>':
        if s is None:
            pass
        elif dna is None:
            dna = s
        else:
            introns.append(s)
        s = ''
        continue
    s += tmp

for _in in introns:
    dna = dna.replace(_in, '')

dna = ''.join(['U' if i == 'T' else i for i in dna])

prot = ''
for i in range(3, len(dna), 3):
    subs = dna[i-3:i]
    prot += codon_table[subs]

print(prot)

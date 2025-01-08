from helpers import read_fasta

MAP = { 'A': 'T', 'T': 'A', 'C': 'G', 'G': 'C'}

def revc(s):
    r = ''
    for c in s:
        r += MAP[c]
    return r[::-1]

def hamm_dist(s1, s2):
    D = 0
    for i in range(len(s1)):
        if s1[i] != s2[i]:
            D += 1
    return D

data = read_fasta('list')

S = set()
good = set()

for r in data:
    if r in good:
        continue
    if r in S or revc(r) in S:
        good.add(r)
        good.add(revc(r))
        if r in S:
            S.remove(r)
        else:
            S.remove(revc(r))
        continue
    S.add(r)

for r in S:
    for g in good:
        if hamm_dist(r, g) == 1:
            print(f"{r}->{g}")
            break

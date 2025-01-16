from helpers import read_fasta

data = read_fasta('list')

fst = data[0]
data = data[1:]

for i in range(len(fst), 0, -1):
    for j in range(len(fst)-i+1):
        sub = fst[j:j+i]
        ok = True
        for s in data:
            if not sub in s:
                ok = False
                break
        if ok:
            print(sub)
            exit(0)

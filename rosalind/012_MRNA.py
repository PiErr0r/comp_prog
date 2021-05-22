prot = ['F', 'L', 'I', 'V', 'F', 'L', 'I', 'V', 'L', 'L', 'I', 'V', 'L', 'L', 'M', 'V', 'S', 'P', 'T', 'A', 'S', 'P', 'T', 'A', 'S', 'P', 'T', 'A', 'S', 'P', 'T', 'A', 'Y', 'H', 'N', 'D', 'Y', 'H', 'N', 'D', 'Stop', 'Q', 'K', 'E', 'Stop', 'Q', 'K', 'E', 'C', 'R', 'S', 'G', 'C', 'R', 'S', 'G', 'Stop', 'R', 'R', 'G', 'W', 'R', 'R', 'G' ]

prot_cnt = dict()

for p in prot:
	if p in prot_cnt:
		prot_cnt[p] += 1
	else:
		prot_cnt[p] = 1

prot_str = input().strip()

mul = 3

for p in prot_str:
	mul *= prot_cnt[p] 

print(mul % 1000000)
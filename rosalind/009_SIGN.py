from itertools import permutations

n = int(input())

l = [i for i in range(-1 * n, n + 1) if i]

perms = permutations(l, n)
cnt = 0
for p in perms:
    if (len(p) == len(set(map(abs, p)))):
        cnt += 1
        print(" ".join(map(str, p)))
print(cnt)


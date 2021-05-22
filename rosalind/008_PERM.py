from itertools import permutations

n = int(input())

mul = 1
for i in range(1, n + 1):
    mul *= i

p = permutations(range(1, n + 1))

print(mul)
[print(" ".join(map(str, perm))) for perm in p]


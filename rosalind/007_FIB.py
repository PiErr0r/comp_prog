
[n, k] = map(int, input().split())
f1 = f2 = 1
if n < 3:
    print(1)
    print("End")

for i in range(3, n + 1):
    tmp = f1
    f1 = f1 + f2 * k
    f2 = tmp

print(f1)

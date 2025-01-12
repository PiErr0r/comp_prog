from collections import defaultdict as DD

def ints(arr):
    return list(map(int, arr.split(' ')))

def strs(arr):
    return list(map(str, arr))

def from_data(data):
    return data.split('\n')

def inline(*data):
    print(*data, end=" ")

with open('009_2sum') as __f:
    data = __f.read().strip()

[n, *As] = from_data(data)
[n, m] = ints(n)

for A in As:
    A = ints(A)
    M = {}
    found = False
    for i in range(len(A)):
        if -A[i] in M:
            print(M[-A[i]], i + 1)
            found = True
            break
        M[A[i]] = i + 1
    if not found:
        print(-1)

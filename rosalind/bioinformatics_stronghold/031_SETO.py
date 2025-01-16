with open('031_seto.txt') as f:
    data = f.read().split('\n')
    N = int(data[0])
    S = []
    for r in data[1:-1]:
        s = r[1:-1].split(', ')
        s = list(map(int, s))
        S.append(s)

F = set(range(1, N+1))
a = set(S[0])
b = set(S[1])

print(f'{a|b}')
print(f'{a&b}')
print(f'{a-b}')
print(f'{b-a}')
print(f'{F-a}')
print(f'{F-b}')

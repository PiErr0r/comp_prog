t = int(input())

for i in range(1, t + 1):
    n = int(input())
    movesL = input()
    movesM = ''.join(['E' if m == 'S' else 'S' for m in movesL])
    print('Case #{0}: {1}'.format(i, movesM))
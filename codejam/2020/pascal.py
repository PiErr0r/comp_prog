def nk(row, col):
    return fact(row) / ( fact(col) * fact(row - col))
    
def fact(n):
    ret = 1
    for i in range(1, n + 1):
        ret *= i
    return ret

def get_max_neigh(row, col, suma):
    maxi = 0
    pos = None
    if row > 0:
        if col < row and col > 0:
            for i in range(row - 1, row + 2):
                for j in range(col - 1, col + 2):
                    if i == row and j == col:
                        continue
                    tmp = nk(i, j)
                    if tmp < suma and tmp > maxi:
                        maxi = tmp
                        pos = [i, j]
        elif col == 0:
            for i in range(row - 1, row + 2):
                for j in range(col, col + 2):
                    if i == row and j == col:
                        continue
                    if i == row - 1 and j == col + 1:
                        continue
                    tmp = nk(i, j)
                    if tmp < suma and tmp > maxi:
                        maxi = tmp
                        pos = [i, j]
        else:
            for i in range(row - 1, row + 2):
                for j in range(col - 1, col + 1):
                    if i == row and j == col:
                        continue
                    if i == row - 1 and j == col + 1:
                        continue
                    tmp = nk(i, j)
                    if tmp < suma and tmp > maxi:
                        maxi = tmp
                        pos = [i, j]
        if pos is not None:
            return pos
        else: return None
    else: return [1,1]
    

T = int(input())

for test in range(T):
    suma = int(input())
    start = [0, 0]
    walk = [start[:]]
    while True:
        print(start, suma)
        curr = nk(start[0], start[1])
        suma -= curr
        if suma == 0:
            break
        tmp = get_max_neigh(start[0], start[1], suma)
        if tmp is not None:
            start = tmp
            walk.append(start[:])
        else:
            tmp = walk.pop()
            suma += nk(tmp[0], tmp[1])
            start = walk[-1][:]
    
    print('Case #{0}:'.format(test + 1))
    for p in walk:
        tmp = list(map(str, p))
        tmp = [str(i + 1) for i in p]
        print('{}'.format(' '.join(tmp)))
    
    
    
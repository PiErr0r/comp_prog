def longest_increasing_subseq(n, X):
    P = []
    M = [-1]
    L = 0

    for i in range(n):
        lo = 1
        hi = L + 1
        while lo < hi:
            mid = lo + (hi - lo) // 2
            if X[M[mid]] >= X[i]:
                hi = mid
            else:
                lo = mid + 1
        newL = lo
        P.append(M[newL - 1])
        if newL == len(M):
            M.append(i)
        else:
            M[newL] = i

        if newL > L:
            L = newL

    S = [-1 for i in range(L)]
    k = M[L]
    for j in range(L - 1, -1, -1):
        S[j] = X[k]
        k = P[k]
    return S


with open('035_lgis.txt') as f:
    [n, P, _] = f.read().split('\n')

n = int(n)
P_inc = list(map(int, P.split(' ')))
P_dec = list(map(lambda x: n + 1 - int(x), P.split(' ')))

S_inc = longest_increasing_subseq(n, P_inc)
S_dec = longest_increasing_subseq(n, P_dec)
print(' '.join(map(str, S_inc)))
print(' '.join(map(lambda x: str(n - x + 1), S_dec)))

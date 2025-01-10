from helpers import read_fasta
import sys
sys.setrecursionlimit(10000)

[A, B] = read_fasta('list')

M = [[0 for i in range(len(B) + 1)] for j in range(len(A) + 1)]

for i in range(len(A)):
    for j in range(len(B)):
        if A[i] == B[j]:
            M[i + 1][j + 1] = M[i][j] + 1
        else:
            M[i + 1][j + 1] = max(M[i + 1][j], M[i][j + 1])

s = ''
x, y = len(A), len(B)
while x * y != 0:
    if M[x][y] == M[x - 1][y]:
        x -= 1
    elif M[x][y] == M[x][y - 1]:
        y -= 1
    else:
        s = A[x - 1] + s
        x -= 1
        y -= 1

print(s)

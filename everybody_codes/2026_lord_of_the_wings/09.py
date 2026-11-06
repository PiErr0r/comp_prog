import numpy as np

def parse(row):
    return [int(n.split("=")[1]) for n in row]

def make_matrix(no):
    n = no - 1
    A = np.zeros((2*n, 2*n))
    for i in range(2*n - 1):
        if i == n - 1: continue
        A[i, i+1] = 1
    A[n-1,0] += 1
    A[n-1,n//2 - 1] += 1
    A[n-1,n + n//2 - 1] += 1
    A[2*n-1, 0] += 1
    A[2*n-1, n + n//2 - 1] += 2
    return A.T

def main():
    with open("tmp") as f:
        data = f.read().strip().split('\n')
    ndata = []
    for row in data:
        ndata.append(parse(row.split(", ")))

    A3 = make_matrix(3)
    A5 = make_matrix(17)
    A7 = make_matrix(7)
    A9 = make_matrix(9)
    b3 = np.zeros(4)
    b5 = np.zeros(32)
    b7 = np.zeros(12)
    b9 = np.zeros(16)
    b3[0] = 1
    b5[0] = 1
    b7[0] = 1
    b9[0] = 1
    A = A9
    for i in range(100):
        prev = np.sum(b5)
        b3 = A3@b3
        b5 = A5@b5
        b7 = A7@b7
        b9 = A9@b9
        A = A@A9
        print(b5)
        #print(i, np.sum(b5) / prev, np.sum(b3), np.sum(b5), np.sum(b7), np.sum(b9))
    print(np.linalg.matrix_power(A7, 100)[:, 0])
    print(np.linalg.matrix_power(A7, 2)[:, 0])
    print(np.linalg.matrix_power(A7, 3)[:, 0])
    print(b7)
    print(A7)
    exit()

    final = 0
    for row in ndata:
        [_id, growth, limit] = row
        A = make_matrix(growth)
        b = np.zeros(2*(growth-1))
        b[0] = 1

        step = 2**20
        S = 0
        tmp = b
        #print(b)
        #for i in range(12):
        #    tmp = A @ tmp
        #    print(tmp)
        #print(tmp)
        #print("DONE")
        while np.sum(b[:growth-1]) < limit:
            res = np.linalg.matrix_power(A, step) @ b
            if np.sum(res[:growth-1]) < limit:
                b = res
                S += step
            else:
                step //= 2
                if step == 0:
                    S += 1
                    break
        print("S",S + 1)
        final += S + 1
    print("res",final)

if __name__ == "__main__":
    main()

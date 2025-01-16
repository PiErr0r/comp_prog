import math

def prob_het(k,N):
    prob_AaBb = 4/16.0

    prob = []
    total = 2**k
    for r in range(N,(total+1)):
        prob.append(nCr(total,r)*(prob_AaBb**r)*((1-prob_AaBb)**(total-r)))
    return sum(prob)

def nCr(n,r):
    f = math.factorial
    return f(n) / f(r) / f(n-r)

if __name__ == '__main__':
    with open('032_lia.txt') as f:
        data = f.read()
        [k, N] = list(map(int, data.split(' ')))
    print(prob_het(7,30))





MEMO = {}
def fib(n):
    if n == 0: return 0
    if n == 1: return 1
    if n in MEMO:
        return MEMO[n]
    res = fib(n-1) + fib(n-2)
    MEMO[n] = res
    return res

with open('001_fibo') as __f:
    N = int(__f.read())

print(fib(N))

import sys
s = ""

for i in range(1000000):
    s += str(i)

n = int(input())

for i in range(n):
    curr = int(input())
    mn = max(0, curr - 5)
    mx = min(len(s)-1, curr + 5)
    print(len(s), curr)
#    print(s[mn:mx], file = sys.stderr)
    print(s[curr])

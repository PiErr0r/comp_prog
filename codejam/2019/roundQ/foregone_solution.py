tests = int(input().strip())
solutions = list()
for i in range(tests):
    n = input()
    a = n.replace('4', '2')
    print('Case #{0}: {1} {2}'.format(i + 1, a, int(n) - int(a)))
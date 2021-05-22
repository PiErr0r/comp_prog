def add_p(L):
    ret = []
    for n in L:
        ret += ['('] * n + [str(n)] + [')'] * n
    i = 0
    ln = len(ret)

    while i < ln - 1:
        if ''.join(ret[i : i + 2]) == ')(':
            ret.pop(i)
            ret.pop(i)
            ln -= 2
            i -= 1
        else:
            i += 1

    return ''.join(ret)
    
T = int(input())

for test in range(T):
    string = list(map(int, list(input())))
    p_string = add_p(string)
    
    print('Case #{0}: {1}'.format(test + 1, p_string))
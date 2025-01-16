with open('045_trie') as __f:
    data = __f.read().strip().split('\n')

def print_trie(_T):
    q = [('', None, _T)]
    while q:
        k, prev, T = q.pop()
        if k != '':
            #print(k, T[k])
            print(prev, T[k]['value'], k)
        for kk in T[k].keys():
            if kk == 'value': continue
            q.append((kk, T[k]['value'], T[k]))


N = 1
def trie_add(T, s):
    global N
    curr = ''
    prev = None
    i = 0
    while i < len(s):
        c = s[i]
        if c in T[curr]:
            T = T[curr]
            curr = c
        else:
            T[curr][c] = { 'value': N + 1 }
            T = T[curr]
            curr = c
            N += 1
        i += 1

T = { '': {'value': 1} }
for s in data:
    trie_add(T, s)

print_trie(T)

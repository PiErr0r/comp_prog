def backspaceCompare(S, T):
    """
    :type S: str
    :type T: str
    :rtype: bool
    """
    i = 0        
    while i < max(len(S), len(T)):
        if i == 0 and i < len(S) and i < len(T) and (S[i] == '#' or T[i] == '#'):
            S = S[i + 1:] if i < len(S) and S[i] == '#' else S
            T = T[i + 1:] if i < len(T) and T[i] == '#' else T
            continue
        hash = False
        if i < len(S) - 1 and S[i + 1] == '#':
            print('HERE', S)
            S = S[:i] + S[i + 2:]
            print(S)
            hash = True
        if i < len(T) - 1 and T[i + 1] == '#':
            T = T[:i] + T[i + 2:]
            hash = True
        if hash:
            if i > 0:
                i -= 1
            continue
        print('@@')
        if len(S) == 0 and len(T) == 0:
            return True
        if i > 0 and i < len(S) and i < len(T) and T[-1] != '#' and S[-1] != '#' and T[-1] != S[-1]:
            print(i, S, T, '$$$')
            return False
        i += 1
    print(S, T, '_______________')
    if len(S) == 0 and len(T) == 0: return True
    # return T[-1] == S[-1 ]
    if len(S) == 1 and len(T) == 1 and T[-1] == S[-1 ]: return T[-1] == S[-1 ]
    return T[-2] == S[-2 ]




print(backspaceCompare("l#d##cm#z##nfto","i#l#d##cmx##z##nfto"))


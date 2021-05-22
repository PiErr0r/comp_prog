class Solution:
    def checkValidString(self, s: str) -> bool:
        if len(s) == 0:
            return True
            
        pars = ast = parsBack = astBack = 0
        L = len(s)

        for i in range(L):

            if s[i] == ')':
                pars -= 1
                if pars < 0 and ast == 0:
                    return False
                elif pars < 0 and abs(pars) > ast:
                    return False
            elif s[i] == '(': pars += 1
            elif s[i] == '*': ast += 1

            if s[L - 1 - i] == '(':
                parsBack += 1
                if parsBack > 0 and astBack == 0:
                    return False
                elif parsBack > 0 and parsBack > astBack:
                    return False
            elif s[L - 1 - i] == ')': parsBack -= 1
            elif s[L - 1 - i] == '*': astBack += 1

        if abs(pars) > ast:
            return False
        else: return True
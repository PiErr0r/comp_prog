#not mine
class Solution:
    def rangeBitwiseAnd(self, m: int, n: int) -> int:
        ans = m
        digit = 0
        while m != n:
            m = m >> 1
            n = n >> 1
            digit+=1
            
        return m << digit

# mine much slower :(

import math

class Solution:
    def rangeBitwiseAnd(self, m: int, n: int) -> int:
        if m == 0:
            return 0
        elif m == n:
            return m
        lower = math.floor( math.log(m, 2) )
        higher = math.floor( math.log(n, 2) )
        diff = n - m
        if diff == 1:
            return m & n
        diff = int(math.log(diff, 2) // 1 + 1)
        ret = 0
        if higher != lower:
            return 0
        else:
            while 2 ** diff <= n:
                if (2 ** diff & n and 2 ** diff & m):
                    ret += 2 ** diff
                diff += 1
        return int(ret)
            
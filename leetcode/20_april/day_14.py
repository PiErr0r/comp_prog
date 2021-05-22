class Solution:
    def stringShift(self, s: str, shift: List[List[int]]) -> str:
        # shift string every time
        d = n = 0
        if False:
            for sh in shift:
                [direction, amount] = sh
                s = self.shift_string(s, direction, amount)
        # calculate only one shift
        else:
            for sh in shift:
                [direction, amount] = sh
                if direction == 0:
                    n -= amount
                else:
                    n += amount
            d = 0 if n < 0 else 1
            n = abs(n) % len(s)
            s = self.shift_string(s, d, n)
            
        return s
    
    def shift_string(self, s, d, n):
        if d == 0:
            s = s[n:] + s[:n]
        else:
            s = s[-1 * n:] + s[:-1 * n]
        return s
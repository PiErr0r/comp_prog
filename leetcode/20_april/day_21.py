# """
# This is BinaryMatrix's API interface.
# You should not implement it, or speculate about its implementation
# """
#class BinaryMatrix(object):
#    def get(self, x: int, y: int) -> int:
#    def dimensions(self) -> list[]:

class Solution:
    def leftMostColumnWithOne(self, binaryMatrix: 'BinaryMatrix') -> int:
        [n, m] = binaryMatrix.dimensions()
        if m == 0:
            return -1
        i = 0
        high = m - 1
        low = 0
        rng = list(range(n))
        prev_rng = rng[:]
        while True:
            j = low + (high - low) // 2
            i = 0
            print(low, high, j, rng)
            if low == high and passed_eq:
                return j
            passed_eq = low == high
            while i < len(rng):
                item = binaryMatrix.get(rng[i], j)
                print(item, rng[i])
                if item == 0:
                    rng.pop(i)
                else:
                    i += 1
            if len(rng) == 0:
                if j == m - 1:
                    return -1
                else:
                    rng = prev_rng[:]
                    low = j + 1
            else:
                prev_rng = rng[:]
                high = j
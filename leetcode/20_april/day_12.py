class Solution(object):
    def get_heaviest(self, stones):
        a = b = stones[0]
        c = 0
        ai = bi = ci = 0
        for i in range(1, len(stones)):
            if stones[i] >= a:
                b = a
                bi = ai
                a = stones[i]
                ai = i
            if stones[i] != a and stones[i] > c:
                c = stones[i]
                ci = i
        if ai == bi or c > b:
            bi = ci
        return [ai, bi]
    
    def lastStoneWeight(self, stones):
        while len(stones) > 1:
            [ai, bi] = self.get_heaviest(stones)
            a, b = stones.pop(ai), stones.pop(bi if bi < ai else bi - 1)
            if a != b:
                a = abs(a - b)
                stones.append(a)
        if len(stones) == 1:
            return stones[0]
        else: return 0
        """
        :type stones: List[int]
        :rtype: int
        """
        
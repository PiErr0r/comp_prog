import math
class Solution(object):
    def minPathSum(self, grid):
        m = len(grid)
        n = len(grid[0])
        if m == 0 or n == 0:
            return 0

        for i in range(m):
            for j in range(n):
                if i == 0 and j == 0: continue
                north = math.inf if i == 0 else grid[i-1][j]
                west = math.inf if j == 0 else grid [i][j - 1]
                grid[i][j] += north if north < west else west
        return grid[-1][-1]
        """
        :type grid: List[List[int]]
        :rtype: int
        """
        
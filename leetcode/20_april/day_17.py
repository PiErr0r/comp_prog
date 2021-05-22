class Solution(object):
    def numIslands(self, grid):
        """
        :type grid: List[List[str]]
        :rtype: int
        """
        if len(grid) == 0:
            return 0
        
        VISITED = '2'
        nodes = {}
        nr = len(grid)
        nc = len(grid[0])
        
        def dfs(r, c):
            grid[r][c] = VISITED
            if r - 1 >= 0 and grid[r-1][c] == '1':
                dfs(r-1, c)
            if r + 1 < nr and grid[r+1][c] == '1':
                dfs(r+1, c)
            if c - 1 >= 0 and grid[r][c-1] == '1':
                dfs(r, c-1)
            if c + 1 < nc and grid[r][c+1] == '1':
                dfs(r, c+1)
            
        nums_islands = 0
        for r in range(nr):
            for c in range(nc):
                if grid[r][c] == '1':
                    nums_islands += 1
                    dfs(r, c)
        return nums_islands
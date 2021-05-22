class Solution:
    def maximalSquare(self, matrix: List[List[str]]) -> int:
        if not matrix:
            return 0
        m, n = len(matrix), len(matrix[0])
        heights = [0] * n
        max_width = 0
        for i in range(m):
            width = 0
            for j in range(n):
                # populates heights arr
                if matrix[i][j] == '1':
                    heights[j] += 1
                else:
                    heights[j] = 0
                # calculates max square width using greedy approach
                if heights[j] > max_width:
                    width += 1
                    if width > max_width:
                        max_width, width = width, 0
                else:
                    width = 0
        return max_width * max_width
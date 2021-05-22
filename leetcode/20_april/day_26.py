class Solution:
    def longestCommonSubsequence(self, text1: str, text2: str) -> int:
        L1, L2 = len(text1), len(text2)
        DP = [[None] * (L2 + 1) for x in range(L1 + 1)]
        for i in range(L1 + 1):
            for j in range(L2 + 1):
                if j == 0 or i == 0:
                    DP[i][j] = 0
                elif text1[i - 1] == text2[j - 1]:
                    DP[i][j] = DP[i - 1][j - 1] + 1
                else:
                    DP[i][j] = max(DP[i - 1][j], DP[i][j - 1])
        return DP[L1][L2]
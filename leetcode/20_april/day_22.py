class Solution:
    def subarraySum(self, nums: List[int], k: int) -> int:
        sums = dict()
        c_sum = 0
        cnt = 0
        for i in range(len(nums)):
            c_sum += nums[i]
            if c_sum == k:
                cnt += 1
            if c_sum - k in sums.keys():
                cnt += sums[c_sum - k]
            if c_sum in sums:
                sums[c_sum] += 1
            else:
                sums[c_sum] = 1
        return cnt
                    
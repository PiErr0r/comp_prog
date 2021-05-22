class Solution:
    def canJump(self, nums: List[int]) -> bool:
        if len(nums) <= 1:
            return True
        if nums[0] == 0:
            return False
        maxReach = nums[0]
        step = nums[0]
        
        for i in range(1, len(nums) - 1):
            step -= 1
            if step <= 0:
                if i > maxReach:
                    return False
                step = maxReach - i
            maxReach = max(maxReach, nums[i] + i)
            # print(i, maxReach, step)
        if maxReach >= len(nums) - 1: return True
        else: return False
            
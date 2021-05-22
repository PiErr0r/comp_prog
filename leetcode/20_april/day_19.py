class Solution:
    def search(self, nums: List[int], target: int) -> int:
        n = len(nums)
        if n == 0:
            return -1
        left = 0
        right = n - 1
        n //= 2
        while left <= right:
            if left > right:
                return -1
            if left == right:
                if nums[left] == target: return left
                else: return -1
            if target == nums[n]:
                return n
            elif target < nums[n]:
                if nums[n] >= nums[left]:
                    if target >= nums[left]:
                        right = n - 1
                    else:
                        left = n + 1
                else:
                    right = n - 1
            else:
                if nums[n] <= nums[right]:
                    if target <= nums[right]:
                        left = n + 1
                    else:
                        right = n - 1
                else:
                    left = n + 1
            n = left + (right-left)//2
        return -1
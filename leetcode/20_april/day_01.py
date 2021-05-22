class Solution:
    def singleNumber(self, nums: List[int]) -> int:
        i = 0
        L = len(nums)
        nums.sort()
        while i < L - 1:
            if nums[i] != nums[i + 1]:
                return nums[i]
            i += 2
            
        return nums[-1]
            
        

"""
DIVLJE RJESENJE

a ^ 0 = a
a ^ a = 0
a ^ b ^ a = (a ^ a) ^ b = 0 ^ b = b


def singleNumber(nums: List[int]) -> int:
	n = 0
	for i in nums:
		n ^= i
	return n

"""
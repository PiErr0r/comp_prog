def maxSubArray(self, nums: List[int]) -> int:
    maxi = nums[0]
    curr_sum = 0
    for i in nums:
        curr_sum += i
        if curr_sum > maxi:
            maxi = curr_sum
        if curr_sum < 0:
            curr_sum = 0
    return maxi
def moveZeroes(self, nums: List[int]) -> None:
    """
    Do not return anything, modify nums in-place instead.
    """
    L = len(nums)
    cnt = i = 0
    while i < L - cnt:
        if nums[i] == 0:
            nums.append( nums.pop(i) )
            cnt += 1
        else: i += 1
        
    
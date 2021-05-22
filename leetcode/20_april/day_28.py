class FirstUnique:

    def __init__(self, nums: List[int]):
        self.nums = nums[:]
        self.unique = dict()
        for i in nums:
            if i in self.unique.keys():
                self.unique[i] += 1
            else:
                self.unique[i] = 1
    def showFirstUnique(self) -> int:
        for i in self.unique.keys():
            if self.unique[i] == 1:
                return i
        return -1
            

    def add(self, value: int) -> None:
        self.nums.append(value)
        if value in self.unique.keys():
            self.unique[value] += 1
        else:
            self.unique[value] = 1


# Your FirstUnique object will be instantiated and called as such:
# obj = FirstUnique(nums)
# param_1 = obj.showFirstUnique()
# obj.add(value)
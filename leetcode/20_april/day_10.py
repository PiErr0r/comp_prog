class MinStack(object):

    def __init__(self):
        """
        initialize your data structure here.
        """
        self.stack = []
        self.mini = []
        

    def push(self, x):
        self.stack.append(x)
        if len(self.mini) == 0:
            self.mini.append(x)
        else:
            if x <= self.mini[-1]:
                self.mini.append(x)
        """
        :type x: int
        :rtype: None
        """
        

    def pop(self):
        tmp = self.stack.pop(-1)
        if tmp == self.mini[-1]:
            self.mini.pop()
        """
        :rtype: None
        """
        

    def top(self):
        return self.stack[-1]
        """
        :rtype: int
        """
        

    def getMin(self):
        return self.mini[-1]
        """
        :rtype: int
        """
        


# Your MinStack object will be instantiated and called as such:
# obj = MinStack()
# obj.push(x)
# obj.pop()
# param_3 = obj.top()
# param_4 = obj.getMin()
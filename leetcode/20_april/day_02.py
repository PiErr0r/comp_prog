class Solution:
    def isHappy(self, n: int) -> bool:
        while True:
            tmp = 0
            while n > 0:
                tmp += (n % 10) ** 2
                n //= 10
            if tmp == 1 or tmp == 7:
                return True
            elif tmp < 10:
                return False
            else:
                n = tmp
def findMaxLength(nums):
    n = len(nums)
    um = {}
    suma = 0
    maxLen = 0
    for i in range(n):
        if nums[i] == 0: 
            suma += -1
        else: 
            suma += 1
        if (suma not in um): 
            um[suma] = i 
        if ((suma) in um): 
            # update maxLength 
            if (maxLen < (i - um[suma])): 
                print(maxLen, i, suma, um[suma])
                maxLen = i - um[suma] 
    print(um)            
    return maxLen 

asd = [1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 0, 0, 1, 1, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0]
# asd = [1, 1, 1, 1, 1, 1, 1, 1]
dsa = [1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0]
# print(findMaxLength(asd))
print(findMaxLength(asd))
# print(asd[27:113].count(0))
# print(len(asd[27:112]))
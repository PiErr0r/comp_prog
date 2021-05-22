def maxProfit(prices):
    stock = False
    L = len(prices)
    i = profit = 0
    while i < L - 1:
        if not stock:
            if prices[i] < prices[i + 1]:
                stock = True
                profit -= prices[i]
                
        else:
            if prices[i] > prices[i + 1]:
                profit += prices[i]
                stock = False
            elif i == L - 2:
                profit += prices[i + 1]
        i += 1
    return profit

inp = [[7,1,5,3,6,4], [1,2,3,4,5], [7,6,4,3,1]]

for i in inp:
    print(maxProfit(i))
def ints(arr):
    return list(map(int, arr.split(' ')))

def binary_search(k, A):
    lo = 0
    hi = len(A)
    while lo < hi:
        mid = lo + (hi - lo) // 2
        if A[mid] == k:
            return mid + 1
        elif A[mid] > k:
            hi = mid
        else:
            lo = mid + 1
    return -1

with open('002_bins') as __f:
    data = __f.read().strip()

[n, m, A, nums] = data.split('\n')

n = int(n)
m = int(m)
A = ints(A)
nums = ints(nums)

for k in nums:
    print(binary_search(k, A), end=" ")

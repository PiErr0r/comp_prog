def ints(arr):
    return list(map(int, arr.split(' ')))

def from_data(data):
    return data.split('\n')

with open('003_ins') as __f:
    data = __f.read().strip()

[n, A] = from_data(data)
n = int(n)
A = ints(A)

def insertion_sort(arr):
    swaps = 0
    for i in range(1, len(arr)):
        k = i
        while k > 0 and arr[k] < arr[k-1]:
            swaps += 1
            arr[k-1], arr[k] = arr[k], arr[k-1]
            k -= 1
    return swaps

print(insertion_sort(A))

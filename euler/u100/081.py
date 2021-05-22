

with open('p081_matrix.txt', 'r') as f:
    fdata = f.read()

data = []
cnt = 0
for row in fdata.split('\n'):
    if cnt == 80: break
    data.append(list(map(int, row.split(','))))
    cnt += 1
#data = [list(map(int, row.split(','))) for row in data.split('\n')]

for i in range(len(data)):
    for j in range(len(data[0])):
        if i == 0 and j == 0: continue
        elif i == 0:
            data[i][j] += data[i][j - 1]
        elif j == 0:
            data[i][j] += data[i - 1][j]
        else:
            data[i][j] += min(data[i][j - 1], data[i - 1][j])

print(data[-1][-1])


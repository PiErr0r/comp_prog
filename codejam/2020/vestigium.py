t = int(input())

for test in range(t):
    size = int(input())
    trace = trace_index = 0
    columns = []
    row = col = 0
    for i in range(size):
        columns.append(set())
    for i in range(size):
        r = list(map(int, input().split()))
        trace += r[trace_index]
        trace_index += 1
        if len(set(r)) < size:
            row += 1
        for j in range(size):
            columns[j].add(r[j])
    for c in columns:
        if len(c) < size:
            col += 1
    
    
    print('Case #{0}: {1} {2} {3}'.format(test + 1, trace, row, col))
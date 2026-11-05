import numpy as np

with open("07a_input") as f:
    data = f.read().strip().split("\n")

A = np.zeros((len(data), len(data)))
E = np.zeros(len(data))
mc = None
nc = None
for row in data:
    _id, _en, _conn = row.split(", ")
    n = int(_id.split("=")[1]) - 1
    en = int(_en.split("=")[1])
    conn = list(map(lambda x: int(x) - 1, _conn.split("=")[1].split(",")))
    if nc is None or len(conn) > mc:
        mc = len(conn)
        nc = n
    E[n] = en
    for c in conn:
        A[n, c] = 1

Ai = np.zeros(len(data))
Ai[nc] = 5
print((Ai@A)+Ai@A@A)

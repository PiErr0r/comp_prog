[k, m, n] = map(int, input().split())
suma = k + m + n

# homo dominant first => 100% has the dominant gene
# formula: k / suma  * (k - 1 + m + n) / (suma - 1)

# hetero first => if homo dominant second P = 100% else if hetero second P = 75% else if homo recessive first P = 50%
# formula: m / suma * (k + 0.75 * (m - 1) + 0.5 * n) / (suma - 1)

# homo recessive first => if homo dominant second P = 100% else if hetero second P = 50% else if homo recessive second P = 0%
# formula: n / suma * (k + 0.5 * m) / (suma - 1)

# simplify sum of formulae:
"""
(1 / suma) * (1 / (suma - 1)) * (k ^ 2 - k + mk + nk + mk + 0.75 m ^ 2 - 0.75 m + 0.5 mn + nk + 0.5 mn)
(1 / (suma ^ 2 - suma)) * (k ^ 2 + 0.75m ^ 2 - k - 0.75m + 2mk + 2nk + mn)
"""

P = (1 / (suma ** 2 - suma)) * (k ** 2 + 0.75 * m ** 2 - k - 0.75 * m + 2 * m * k + 2 * n * k + m * n)
print(P)

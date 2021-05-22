#include <stdio.h>

/*

def all_odd(n):
	while n > 0:
		if not n & 1:
			return False
		n //= 10
	return True

def is_rev(n):
	a = n
	b = 0
	while n > 0:
		b = 10 * b + n % 10
		n //= 10
	return all_odd(a + b)

maxi = 1000000000
# maxi = 5000000
cnt = 0
t = 10
prev_cnt = 0
for i in range(10, maxi + 1):
	if i % 1000000 == 0:
		if prev_cnt:
			print(cnt / prev_cnt)
		prev_cnt = cnt
		print(i, cnt)
	if i == t * 10:
		t *= 10

	if (i // t & 1) != (i & 1) and i % 10 and is_rev(i):
		# print(bin(i))
		# print("##################")
		cnt += 1
print(cnt)
*/

int all_odd(int n) {
	while (n) {
		if (!(n & 1)){
			// printf("HERE %d\n",n);
			return 0;
		}
		n /= 10;
	}
	return 1;
}

int is_rev(int n) {
	int a = n, b = 0;
	while (n) {
		b = 10 * b + n % 10;
		n /= 10;
	}
	// printf("%d %d %d\n", a, b, a + b);
	return all_odd(a + b);
}

int main() {
	unsigned long long int i, cnt = 0, t = 10;
	// unsigned long long int maxi = 1000;
	unsigned long long int maxi = 1000000000;

	for (i = 10; i < maxi + 1; ++i) {
		if (i % 1000000 == 0) {
			printf("%d %d\n", i, cnt);
		}
		if (i == t * 10) {
			t *= 10;
		}
		//(i / t & 1) == (i & 1)
		if ((i / t & 1) != (i & 1) && i % 10 && is_rev(i)) {
			++cnt;
		}
	}
	printf("%d\n", cnt);

	return 0;
}
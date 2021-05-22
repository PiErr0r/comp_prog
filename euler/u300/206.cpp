#include <iostream>
#include <string>
#include <math.h>

#define ull unsigned long long

using namespace std;
//goal = "1_2_3_4_5_6_7_8_9_0"

ull get_num(ull n) {
	ull res = 0;
	for (int i = 1; i <= 10; ++i) {
		res = 10 * res + i % 10;
		if (i == 10) break;
		res = 10 * res + n % 10;
		n /= 10;
	}
	return res;
}

bool is_int(ull n) {
	ull s = sqrt(n);
	return (ull)s * (ull)s == (ull)n;
}

int main() {
	ull i = -1, max_n = 1000000000, curr;
	// cout << i << endl;
	
	for (i = max_n; i > 0; --i) {
		// if (i % 1000000 == 0) {
		// 	cout << i << endl;
		// }
		curr = get_num(i);
		if (is_int(curr)) {
			// cout << curr << endl;
			cout << (ull)sqrt(curr) << endl;
			// while (i > 0) {
			// 	cout << i % 10;
			// 	i /= 10;
			// }
			// cout << endl;
			
		}
	}

	return 0;
}
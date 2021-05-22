/*


The first two consecutive numbers to have two distinct prime factors are:

14 = 2 × 7
15 = 3 × 5

The first three consecutive numbers to have three distinct prime factors are:

644 = 2² × 7 × 23
645 = 3 × 5 × 43
646 = 2 × 17 × 19.

Find the first four consecutive integers to have four distinct prime factors each. What is the first of these numbers?

*/

#include "std_lib_facilities.h"
#include <set>

void get_factors(int n, set<int>& factors, vector<int>& primes) {
	if (primes.back() < sqrt(n)) {
		for (int i = primes.back() + 2; i < n / 2; i += 2) {
			bool is_prime = true;
			for (int pr: primes) 
				if (i % pr == 0) {
					is_prime = false;
					break;
				}
			if (is_prime)
				// cout << "new prime: " << i << '\n';
				primes.push_back(i);
		}
	}
	int i = 0;
	while (n > 0 && i < primes.size()) {
		int pr = primes[i];
		if (n % pr == 0) {
			factors.insert(pr);
			while (n % pr == 0)
				n /= pr;
		}
		++i;
	}
}

int main() {
	vector<int> primes {2, 3, 5, 7, 11, 13};
	set<int> s_primes {2, 3, 5, 7, 11, 13};

	int i {2};

	int cnt {0};
	while (true) {
		set<int> factors;
		get_factors(i, factors, primes);
		if (factors.size() == 4)
			++cnt;
		else
			cnt = 0;
		// cout << cnt << "\t" << i << '\n';
		if (cnt == 4) {
			cout << (i - 3) << '\n';
			break;
		}

		++i;
	}

	return 0;
}
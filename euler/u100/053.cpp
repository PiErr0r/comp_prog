#include "std_lib_facilities.h"
#define ll long long


double select(int n, int r) {
	int higher = (r > n - r) ? r : n - r;
	int lower = (r < n - r) ? r : n - r;
	int high = n;
	int low = n - lower;
	double ret = 1;

	while (high > low || lower > 0) {
		// cout << high << '\t' << lower << '\n';
		if (high > low) {
			ret *= high;
			--high;
		}
		if (lower > 0) {
			ret /= lower;
			--lower;
		}
	}
	return ret;
}

int main() {

	int cnt {0};
	constexpr ll int CHECK {1000000};
	for (int i = 23; i <= 100; ++i) {
		for (int j = 0; j <= i; ++j) {
			if ( select(i, j) > CHECK )
				++cnt;
		}
	}
	cout << cnt << '\n';
	return 0;
}
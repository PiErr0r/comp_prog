#include "std_lib_facilities.h"
#include <set>

bool equal(int n, int m) {
	set<int> sN;
	set<int> sM;
	while (n != 0 && m != 0) {
		if (n != 0) {
			sN.insert(n % 10);
			n /= 10;
		}
		if (m != 0) {
			sM.insert(m % 10); 
			m /= 10;
		}
	}
	return sN == sM;
}

int main() {

	int n {0};
	vector<int> test {2, 3, 4, 5, 6};
	bool found = false;
	while (!found) {
		found = true;
		++n;
		for (int i : test) {
			if (!equal(n, n * i)) {
				found = false;
				break;
			}
		}
	}
	cout << n << '\n';
	return 0;
}
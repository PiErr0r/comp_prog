#include <iostream>

using namespace std;

int main() {
  int n;
  int k;
  cin >> n;
  cin >> k;

  long long int f1 = 1, f2 = 1;

  if (n < 3) {
    cout << 1 << '\n';
  }

  for (int i = 3; i <= n; ++i) {
    cout << f1 << " ";
    int tmp = f1;
    f1 = f1 + f2 * k;
    f2 = tmp;
  }
  cout << '\n';

  cout << f1  << '\n';
  return 0;
}

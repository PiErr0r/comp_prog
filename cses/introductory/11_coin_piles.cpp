#include <bits/stdc++.h>

using namespace std;
typedef long long ll;

int main(void) {
  cin.tie(0)->sync_with_stdio(0);
  int t;
  cin >> t;
  for (int i = 0; i < t; ++i) {
    int a, b;
    cin >> a >> b;
    int ma = a % 3, mb = b % 3;
    if ((ma + mb != 0) && (ma + mb != 3)) {
      cout << "NO" << endl;
      continue;
    }
    if ((a >> 1) > b || (b >> 1) > a) {
      cout << "NO" << endl;
      continue;
    }
    cout << "YES" << endl;
  }


  return 0;
}

#include <bits/stdc++.h>
#define PB push_back
#define MP make_pair
#define F first
#define S second
#define FILL(arr) for (auto &value : arr) cin >> value;
#define FOR(n) for (int i = 0; i < n; ++i)

using namespace std;
using ll = long long;

void solve(void) {
  string x;
  cin >> x;
  if (x[0] >= '5') {
    cout << '1';
    FOR((int)x.length()) cout << '0';
    return;
  }
  int i = 0;
  while (i < (int)x.length() && x[i] < '5') ++i;
  if (i == (int)x.length()) {
    cout << x;
    return;
  }
  int j = i - 1;
  while (j >= 0 && (++x[j]) >= '5') --j;
  if (j == -1) cout << '1';
  for (i = 0; i < (int)x.length(); ++i) cout << (i <= j ? x[i] : '0');
}

int main(void) {
  ios::sync_with_stdio(0);
  cin.tie(0);
  int T, i;
  cin >> T;
  // uncomment for precision when couting doubles
  // std::cout << std::fixed;
  // std::cout << std::setprecision(6);

  for (i = 1; i <= T; ++i) {
    solve();
    cout << endl;
  }

  return 0;
}

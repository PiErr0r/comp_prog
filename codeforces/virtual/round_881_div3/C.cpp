#include <bits/stdc++.h>

using namespace std;
using ll = long long;

void solve(void) {
  ll n;
  cin >> n;
  ll res = 0;
  while (n != 0) {
    res += n;
    n >>= 1;
  }
  cout << res;
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

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
  int n; cin >> n;
  if (n == 2) {
    cout << 2;
    return;
  }
  vector<ll> cumsum = {0};
  FOR(n) {
    cumsum.PB(cumsum[i] + (i+1)*(i+1));
  }
  int sz = 2;
  ll mx = cumsum.back() - n * n;
  while (sz < n) {
    ll sm = cumsum[n - sz];
    ll mxd = 0;
    for (int i = n - sz + 1; i <= n; ++i) {
      ll res = 2 * n + 1 - i - sz;
      sm += i * res;
      mxd = max(mxd, (ll)i * res);
    }
    mx = max(sm - mxd, mx);
    ++sz;
  }
  cout << mx;
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

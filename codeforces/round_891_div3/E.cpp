#include <bits/stdc++.h>
#define PB push_back
#define MP make_pair
#define F first
#define S second
#define FILL(arr) for (auto &value : arr) cin >> value;
#define FOR(i, n, s) for (int i = s; i < n; ++i)

using namespace std;
using ll = long long;

void solv3(void) {
  int n;
  cin >> n;
  vector<int> C(n);
  FILL(C);
  //sort(C.begin(), C.end());

  FOR(i, n, 0) {
    ll sm = 0;
    FOR(j, n, 0) {
      //if (i == j) continue;
      //cout << "MX " << max(C[i], C[j]) << " " << min(C[i], C[j]) << endl;
      sm += (ll)(max(C[i], C[j]) + 1 - min(C[i], C[j]));
    }
    cout << sm << " ";
  }
}

void solve(void) {
  int n;
  cin >> n;
  vector<int> C(n);
  FILL(C);
  vector<int> cp = C;
  vector<ll> sms;
  sort(cp.begin(), cp.end());
  ll sm = 0;
  FOR(i, n, 0) {
    sm += cp[i] + 1 - cp[0];
  }
  sms.PB(sm);
  FOR(i, n, 1) {
    if (cp[i] == cp[i-1]) {
      sms.PB(sm);
      continue;
    }
    sm += (ll)(cp[i] - cp[i-1]) * (ll)i;
    sm -= (ll)(cp[i] - cp[i-1]) * (ll)(n-i);
    sms.PB(sm);
  }
  FOR(i, n, 0) {
    auto ni = lower_bound(cp.begin(), cp.end(), C[i]);
    int diff = ni - cp.begin();
    cout << sms[diff] << " ";
  }
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

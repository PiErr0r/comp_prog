#include <bits/stdc++.h>
#define PB push_back
#define MP make_pair
#define F first
#define S second
#define FILL(arr) for (auto &value : arr) cin >> value;
#define FOR(n, i) for (int i = 0; i < n; ++i)

using namespace std;
using ll = long long;

void solve(void) {
  int n; cin >> n;
  vector<vector<int>> a(n, vector<int>());
  FOR(n, i) {
    int m; cin >> m;
    FOR(m, j) {
      int b; cin >> b;
      a[i].PB(b);
    }
    sort(a[i].begin(), a[i].end());
  }
  int mn1 = 1000000001, mn2 = 1000000001;
  ll s = 0;
  FOR(n, i) {
    mn1 = min(mn1, a[i][0]);
    mn2 = min(mn2, a[i][1]);
    s += (ll)a[i][1];
  }
  s = s - (ll)mn2 + (ll)mn1;
  cout << s;
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

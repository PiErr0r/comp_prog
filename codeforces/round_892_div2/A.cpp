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
  int n;
  cin >> n;
  vector<int> a(n);
  FILL(a);
  sort(a.begin(), a.end());
  if (a[0] == a.back()) {
    cout << -1;
    return;
  }
  int last = a.back();
  int cnt = 0;
  int i = n - 1;
  while (a[i--] == last) {
    ++cnt;
  }
  cout << (n-cnt) << " " << cnt << endl;
  for (i = 0; i < n; ++i) {
    if (i == n - cnt) cout << endl;
    cout << a[i] << " ";
  }
}

int main(void) {
  ios::sync_with_stdio(0);
  cin.tie(0);
  int T = 0, i;
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

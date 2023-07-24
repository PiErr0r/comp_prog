#include <bits/stdc++.h>

using namespace std;
using ll = long long;

void solve(void) {
  int n;
  cin >> n;
  ll md = 1000000007, prev;
  cin >> prev;
  for (int i = 1; i < n; ++i) {
    ll a;
    cin >> a;
    if (a < prev) {
      cout << "0" << endl;
      return;
    }
    md = min(md, a - prev);
    prev = a;
  }
  cout << ((md + 2) / 2) << endl;
}

int main(void) {
  cin.tie(0)->sync_with_stdio(0);
  int T, i;
  cin >> T;

  for (i = 1; i <= T; ++i) {
    solve();
  }

  return 0;
}

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
  vector<ll> a(n);
  FILL(a);
  if (n == 1) {
    cout << 1;
    return;
  } else if (n == 2) {
    cout << a[1] - a[0];
    return;
  }
  ll mx1 = 0, mx2 = 0, mx3 = 0;
  for(int i = 0; i < n - 1; i += 2) {
    if (a[i+1] - a[i] > mx1) {
      mx3 = mx2;
      mx2 = mx1;
      mx1 = a[i+1] - a[i];
    } else if (a[i+1] - a[i] > mx2) {
      mx3 = mx2;
      mx2 = a[i+1] - a[i];
    } else if (a[i+1] - a[i] > mx3) {
      mx3 = a[i+1] - a[i];
    }
  }
  if (n & 1) {

  }
  cout << mx2;
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

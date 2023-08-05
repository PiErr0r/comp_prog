#include <bits/stdc++.h>
#define PB push_back
#define MP make_pair
#define F first
#define S second
#define FILL(arr) for (auto &value : arr) cin >> value;

using namespace std;
using ll = long long;

void solve(void) {
  int n;
  cin >> n;
  vector<int> a(n);
  FILL(a);
  bool sorted = true;
  for (int i = 1; i < n; ++i) {
    if (a[i] < a[i - 1]) {
      sorted = false;
      break;
    }
  }
  if (sorted) {
    cout << 0;
    return;
  }
  int mx = 0;
  for (int i = 1; i < n; ++i) {
    if (a[i - 1] > a[i]) {
      mx = max(mx, a[i - 1]);
    }
  }
  cout << mx;
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

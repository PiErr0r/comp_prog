#include <bits/stdc++.h>
#define PB push_back
#define MP make_pair
#define F first
#define S second
#define FILL(arr) for (auto &value : arr) cin >> value;
#define FOR(i, n) for (int i = 0; i < n; ++i)

using namespace std;
using ll = long long;

void solve(void) {
  int n; cin >> n;
  vector<int> a(n), b(n);
  vector<int> strong;
  FILL(a);
  FILL(b);
  int curr = 0;
  FOR(i, n) {
    if (i == curr) continue;
    if (a[curr] - a[i] < b[curr] - b[i]) {
      curr = i;
      i = -1;
    }
  }
  strong.PB(curr);
  FOR(i, n) {
    if (i == curr) continue;
    if (a[curr] - a[i] == b[curr] - b[i]) strong.PB(i);
  }
  /*
  FOR(i, n) {
    bool is_strong = true;
    FOR(j, n) {
      if (i == j) continue;
      if (a[i] - a[j] < b[i] - b[j]) {
        is_strong = false;
        break;
      }
    }
    if (is_strong) strong.PB(i + 1);
  }
  */
  sort(strong.begin(), strong.end());
  cout << strong.size() << endl;
  for (int i : strong) cout << (i + 1) << " ";
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

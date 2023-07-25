#include <bits/stdc++.h>
#define PB push_back
#define MP make_pair
#define F first
#define S second
#define FILL(arr) for (auto &value : arr) cin >> value;

using namespace std;
using ll = long long;

void solve(void) {
  int n, m, k, H;
  cin >> n >> m >> k >> H;
  vector<int> persons(n);
  FILL(persons);
  int cnt = 0;
  for (auto p : persons) {
    int diff = H > p ? H - p : p - H;
    if (diff != 0 && diff % k == 0 && diff / k < m) {
      ++cnt;
    }
  }
  cout << cnt;
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

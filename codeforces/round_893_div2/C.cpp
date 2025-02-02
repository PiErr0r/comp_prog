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
  int curr = 2;
  vector<int> D(n + 2);
  cout << 1 << " ";
  int cnt = 1;
  D[1] = 1;
  while (cnt <= n) {
    int i = curr;
    while (i <= n) {
      if (D[i] == 0) {
        cout << i << " ";
        D[i] = 1;
        ++cnt;
        if (cnt == n) return;
      }
      i *= 2;
    }
    ++curr;
    while (curr <= n && D[curr] != 0) ++curr;
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

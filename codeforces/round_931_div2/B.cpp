#include <bits/stdc++.h>
#define PB push_back
#define MP make_pair
#define F first
#define S second
#define FILL(arr) for (auto &value : arr) cin >> value;
#define FOR(n) for (int i = 0; i < n; ++i)

using namespace std;
using ll = long long;

map<int, int> memo;

int rec(int n, vector<int> coins) {
  if (memo.find(n) != memo.end()) {
    return memo[n];
  }
  if (n < 0) return 1000000000;
  if (n == 0) {
    return 0;
  }
  int mn = 1000000000;
  for (auto c : coins) {
    int tmp = n / c;
    //cout << tmp << endl;
    if (c != 1 && tmp != 0) {
      mn = min(mn, tmp + rec(n - tmp * c, coins));
      if (tmp != 1)
        mn = min(mn, tmp - 1 + rec(n - (tmp - 1) * c, coins));
    } else if (c == 1) {
      mn = min(mn, n);
    }
  }
  memo[n] = mn;
  return memo[n];
}

void solve(void) {
  memo.clear();
  int n;
  cin >> n;
  vector<int> coins{15, 10, 6, 3, 1};
  cout << rec(n, coins);
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

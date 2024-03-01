#include <bits/stdc++.h>
#define PB push_back
#define MP make_pair
#define F first
#define S second
#define FILL(arr) for (auto &value : arr) cin >> value;
#define FOR(n) for (int i = 0; i < n; ++i)

using namespace std;
using ll = long long;

bool is_pow(ll n) {
  int cnt = 0;
  while (n && cnt < 2) {
    if (n & 1) ++cnt;
    n >>= 1;
  }
  return cnt == 1;
}

int find_one(ll n) {
  int cnt = 0;
  while (n & 1) {
    ++cnt;
    n >>= 1;
  }
  while ((n & 1) == 0) {
    ++cnt;
    n >>= 1;
  }
  return cnt;
}

void solve(void) {
  ll start, goal;
  cin >> start >> goal;
  vector<ll> res{start};
  if (is_pow(start)) {
    cout << -1;
    return;
  }

  FOR(63) {
    if ((start ^ goal) < start) {
      res.push_back(goal);
      break;
    }
    int k = find_one(start);
    ll tmp = (1 << k) | (1 << (k - 1));
    if (tmp >= start) {
      cout << -1;
      return;
    }
    res.push_back(start ^ tmp);
    start = tmp;
  }
  if (res.back() != goal) {
    cout << -1;
    return;
  }
  cout << res.size() << endl;
  for (auto n : res) cout << n << " ";
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

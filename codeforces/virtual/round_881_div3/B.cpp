#include <bits/stdc++.h>

using namespace std;
using ll = long long;

void solve(void) {
  int n;
  cin >> n;
  vector<int> nums(n);
  for (auto &a : nums) cin >> a;
  int i = 0, ops = 0;
  while (i < n) {
    if (nums[i] < 0) {
      ++ops;
      while (i < n && nums[i] <= 0) {
        nums[i] = -nums[i];
        ++i;
      }
    }
    ++i;
  }
  ll res = 0;
  for (i = 0; i < n; ++i) {
    res += nums[i];
  }
  cout << res << " " << ops;
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

#include <bits/stdc++.h>

using namespace std;
using ll = long long;

void solve(void) {
  int n;;
  cin >> n;
  vector<int> nums(n);
  for (auto &i : nums) cin >> i;
  sort(nums.begin(), nums.end());
  ll res = 0;
  for (int i = 0; i < (n / 2); ++i) {
    res += nums[n - i - 1] - nums[i];
  }
  cout << res;
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

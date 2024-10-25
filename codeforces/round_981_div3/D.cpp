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
  vector<int> nums(n);
  FILL(nums);
  unordered_set<int> pref;
  ll sm = 0;
  int cnt = 0;
  FOR(n) {
    sm += nums[i];
    if (pref.find(sm) != pref.end()) {
      ++cnt;
      pref.clear();
      pref.insert(0);
    } else {
      pref.insert(sm);
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

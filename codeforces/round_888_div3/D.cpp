#include <bits/stdc++.h>
#define PB push_back
#define MP make_pair
#define F first
#define S second
#define FILL(arr) for (auto &value : arr) cin >> value;

using namespace std;
using ll = long long;

void solve(void) {
  ll n;
  cin >> n;
  vector<ll> nums(n - 1);
  set<int> orig;
  FILL(nums);

  ll sr = n * (n + 1) / 2;
  ll sp = nums[0];
  int ri = -1;
  if (sp > n) {
    ri = 0;
  } else {
    orig.insert(sp);
  }
  for (int i = n - 2; i > 0; --i) {
    ll diff = nums[i] - nums[i - 1];
    if (diff > n) {
      if (ri != -1) {
        cout << "NO"; return;
      }
      ri = i;
    } else {
      orig.insert((int)diff);
    }
    if (diff >= 2 * n) {
      cout << "NO"; return;
    }
    sp += diff;
  }
  if ((int)orig.size() != n - 2 && (int)orig.size() != n - 1) {
    cout << "NO"; return;
  }

  if (sp == sr || abs(sr - sp) <= n) cout << "YES";
  else cout << "NO";
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

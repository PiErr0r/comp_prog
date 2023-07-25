#include <bits/stdc++.h>
#define PB push_back
#define MP make_pair
#define F first
#define S second
#define FILL(arr) for (auto &value : arr) cin >> value;

using namespace std;
using ll = long long;

void solve_old(void) {
  int n, k;
  cin >> n >> k;
  vector<int> nums(n);
  FILL(nums);
  int H = 1 << k;
  int l = H, li = -1, h = H, hi = -1;
  for (int i = 0; i < n; ++i) {
    if (nums[i] < l) {
      if (li != -1) {
        h = l;
        hi = li;
      }
      l = nums[i];
      li = i;
    } else {
      if (li != -1 && nums[i] < h) {
        h = nums[i];
        hi = i;
      }
    }
  }
  int L = l, cnt = 0;
  while (L) {
    ++cnt;
    L >>= 1;
  }
  int x = H - 1;
  x >>= cnt;
  x <<= cnt;
  cnt = 0;
  while (h && l) {
    if (!(h&1) && !(l&1)) x |= 1 << cnt;
    h >>= 1;
    l >>= 1;
    ++cnt;
  }
  cout << (li + 1) << " " << (hi + 1) << " " << x;
  cout << " " << ((x^nums[li])&(x^nums[hi]));
}

void solve(void) {
  int n, k;
  cin >> n >> k;
  int x = (1 << k) - 1;
  vector<pair<int,int>> nums;
  for (int i = 0; i < n; ++i) {
    int a;
    cin >> a;
    nums.PB(MP(a^x, i));
  }
  sort(nums.begin(), nums.end());
  //for (auto i : nums) cout << i.F << " " << (i.F ^ x) << endl;
  //cout << endl;
  x ^= x ^ (nums[n - 1].F & nums[n - 2].F);
  cout << nums[n - 1].S << " " << nums[n - 2].S << " " << x;
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

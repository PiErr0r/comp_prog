#include <bits/stdc++.h>
#define PB push_back
#define MP make_pair
#define F first
#define S second
#define FILL(arr) for (auto &value : arr) cin >> value;

using namespace std;
using ll = long long;

void solve(void) {
  int n;
  cin >> n;
  vector<int> even, odd, nums(n);
  for (int i = 0; i < n; ++i) {
    int a;
    cin >> a;
    if (a % 2 == 0) {
      even.PB(a);
    } else {
      odd.PB(a);
    }
    nums[i] = a;
  }
  sort(even.begin(), even.end());
  sort(odd.begin(), odd.end());
  int ei = 0, oi = 0;
  for (int i = 0; i < n; ++i) {
    if (nums[i] % 2 == 0) {
      nums[i] = even[ei++];
    } else {
      nums[i] = odd[oi++];
    }
  }
  for (int i = 1; i < n; ++i) {
    if (nums[i] < nums[i - 1]) {
      cout << "NO";
      return;
    }
  }

  cout << "YES";
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

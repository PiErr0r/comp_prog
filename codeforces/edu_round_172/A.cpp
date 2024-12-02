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
  int n, k;
  cin >> n >> k;
  vector<int> arr(n);
  FILL(arr);
  sort(arr.begin(), arr.end());
  int i = arr.size() - 1;
  while (i >= 0) {
    if (k < arr[i]) {
      break;
    }
    k -= arr[i];
    if (k == 0) {
      break;
    }
    --i;
  }
  cout << k;
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

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
  vector<int> arr(n);
  FILL(arr);
  int mx = 0;
  sort(arr.begin(), arr.end());
  int i = n - 1;
  int j = 0;
  //for (int i = 0; i < n; ++i) {
    //for (int j = 0; j < n; ++j) {
      //if (j == i) continue;
      for (int k = 0; k < n; ++k) {
        if (k == j || k == i) continue;
        for (int l = 0; l < n; ++l) {
          if (l == k || l == j || l == i) continue;
          mx = max(mx, abs(arr[i] - arr[j]) + abs(arr[j] - arr[k]) + abs(arr[k] - arr[l]) + abs(arr[l] - arr[i]));
        }
      }
    //}
  //}
  cout << mx;
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

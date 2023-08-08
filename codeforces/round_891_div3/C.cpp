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
  vector<int> A(n*(n-1)/2);
  map<int,int> original;
  FILL(A);
  sort(A.begin(), A.end());
  int l = 0;
  for (int i = 0; i < n*(n-1)/2; ++l) {
    cout << A[i] << " ";
    i += (n - l - 1);
  }
  for (int i = l; i < n; ++i) {
    cout << (A.back());
  }
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

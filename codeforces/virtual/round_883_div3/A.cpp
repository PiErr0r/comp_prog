#include <bits/stdc++.h>

using namespace std;
using ll = long long;

void solve(void) {
  int n;
  cin >> n;
  int cnt = 0;
  for (int i = 0; i < n; ++i) {
    int a, b;
    cin >> a >> b;
    if (a > b) ++cnt;
  }
  cout << cnt;
}

int main(void) {

  int T, i;
  cin >> T;

  for (i = 1; i <= T; ++i) {
    solve();
    cout << endl;
  }

  return 0;
}

#include <bits/stdc++.h>

using namespace std;
using ll = long long;

void solve(void) {
  int n, d, h;
  cin >> n >> d >> h;
  vector<int> heights(n);
  for (auto &i : heights) cin >> i;
  double P = (double)d * h / 2.0;
  double ink = P;
  for (int i = n - 2; i >= 0; ++i) {
    int nh = min(h, heights[i+1] - heights[i - 1]);
    
  }
  cout << ink;
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

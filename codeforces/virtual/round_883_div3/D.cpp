#include <bits/stdc++.h>

using namespace std;
using ll = long long;

void solve(void) {
  int n, d, h;
  cin >> n >> d >> h;
  vector<int> heights(n);
  for (auto &i : heights) cin >> i;
  double ink = 0;
  double P = (double)d * h / 2.0;
  for (int i = 0; i < n; ++i) {
    ink += P;
    int j = i - 1;
    if (j >= 0 && heights[i] < heights[j] + h) {
      int nh = h - (heights[i] - heights[j]);
      double nP = P * (double)((double)nh * nh) / ((double) h * h);
      ink -= nP;
    }
  }
  cout << ink;
}

int main(void) {

  int T, i;
  cin >> T;
  std::cout << std::fixed;
  std::cout << std::setprecision(6);
  for (i = 1; i <= T; ++i) {
    solve();
    cout << endl;
  }

  return 0;
}

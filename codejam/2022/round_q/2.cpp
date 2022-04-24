#include <bits/stdc++.h>

using namespace std;

void solve(void) {
  int colors[3][4];
  for (int i = 0; i < 3; ++i) {
    for (int j = 0; j < 4; ++j) {
      cin >> colors[i][j];
    }
  }
  int start = 1e6;
  int res[4];
  for (int i = 0; i < 4; ++i) {
    res[i] = min(start, min(colors[0][i], min(colors[1][i], colors[2][i])));
    start -= res[i];
  }
  if (start != 0) {
    cout << "IMPOSSIBLE";
  } else {
    for (int i = 0; i < 4; ++i) {
      cout << res[i];
      if (i != 3) {
        cout << " ";
      }
    }
  }

}

int main(void) {

  int T, i;
  cin >> T;

  for (i = 1; i <= T; ++i) {
    cout << "Case #" << (i) << ": ";
    solve();
    cout << endl;
  }

  return 0;
}

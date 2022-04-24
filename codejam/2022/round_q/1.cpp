#include <bits/stdc++.h>

using namespace std;

void solve(void) {
  int r, c;
  cin >> r >> c;
  cout << endl;
  for (int i = 0; i < r * 2 + 1; ++i) {
    for (int j = 0; j < c * 2 + 1; ++j) {
      if (i < 2 && j < 2) {
        cout << ".";
      } else if (i & 1) {
        if (j & 1) cout << ".";
        else cout << "|";
      } else {
        if (j & 1) cout << "-";
        else cout << "+";
      }
    }
    if (i < r * 2)
      cout << endl;
  }

}

int main(void) {

  int T, i;
  cin >> T;

  for (i = 1; i <= T; ++i) {
    cout << "Case #" << (i) << ":";
    solve();
    cout << endl;
  }

  return 0;
}

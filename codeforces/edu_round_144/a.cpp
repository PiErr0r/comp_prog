#include <bits/stdc++.h>

using namespace std;

void solve(void) {
  int n;
  cin >> n;
  string s, S = "FBFFBFFB";
  cin >> s;
  for (int j = 0; j < (int)S.length(); ++j) {
    if (S[j] == s[0]) {
      int jj = j;
      int i = 0;
      for (; i < (int)s.length(); ++i, jj = (jj + 1) % (int)S.length()) {
        if (s[i] != S[jj]) break;
      }
      if (i == (int)s.length()) {
        cout << "YES";
        return;
      }
    }
  }


  cout << "NO";

}

int main(void) {

  int T, i;
  cin >> T;

  for (i = 1; i <= T; ++i) {
    // cout << "Case #" << (i) << ": ";
    solve();
    cout << endl;
  }

  return 0;
}

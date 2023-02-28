#include <bits/stdc++.h>

using namespace std;

void solve(void) {
  string a, b, t = "";
  cin >> a >> b;
  int mn_b = 0;
  for (int i = 0; i < (int)a.length(); ++i) {
    int mx = 0, sa, sb;
    for (int j = 0; j < (int)b.length(); ++j) {
      if (a[i] == b[j]) {
        int curr_mx = 0;
        int ii = i, jj = j;
        while (ii < (int)a.length() && jj < (int)b.length() && a[ii++] == b[jj++]) ++curr_mx;
        if (curr_mx > mx) {
          if (j < mn_b) {
            if (curr_mx >= 2) {
              mx = curr_mx;
              sa = i;
              sb = j;
              break;
            } else {
              continue;
            }
          }
          mx = curr_mx;
          sa = i;
          sb = j;
          j += mx - 1;
        }
      }
    }
    if (mx != 0) {
      if (mx >= 2) {
        t = "*" + a.substr(sa, mx) + "*";
        cout << "YES\n" << t;
        return;
      }
      if ((int)t.length() == 0 && (sa != 0 || sb != 0)) t += "*";
      t += a.substr(sa, mx);
      mn_b = sb + mx;
      i = sa + mx - 1;
      if (i + 1 < (int)a.length() || mn_b < (int)b.length()) {
        t += "*";
      }
    }
  }
  cout << t << endl;
  if ((int)t.length() == 0) t = "*";
  if (a[0] == b[0] && t[0] == '*') if (t[1] != a[0]) t = a[0] + t; else t.erase(0, 1);
  if (a.back() == b.back() && t.back() == '*') if (t[(int)t.length() - 2] != a.back()) t += a.back(); else t.pop_back();
  for (int i = 0; i < (int)t.length() - 1; ++i) {
    if (t[i] == '*' && t[i + 1] == '*') {
      t.erase(i, 1);
      --i;
    }
  }
  int cnt = 0;
  for (char c : t) {
    if (c == '*') ++cnt;
  }
  if (cnt <= (int)t.length() / 2) {
    cout << "YES\n" << t;
  } else {
    cout << "NO";
  }
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

#include <bits/stdc++.h>

using namespace std;

void solve(void) {
  int n;
  cin >> n;
  bitset<100000> b;
  string str;
  cin >> str;
  for (int i = 0; i < n; ++i) {
    b[i] = str[i] == '1' ? 1 : 0;
  }
  int s = -1, e = -1;
  for (int i = 0; i < n / 2; ++i) {
    if (b[i] ^ b[n - i - 1]) {
      if (s == -1) {
        s = i;
      } else if (e != -1) {
        cout << "No";
        return;
      }
    } else {
      if (s != -1 && e == -1) {
        e = i;
      }
    }
  }
  cout << "Yes";
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

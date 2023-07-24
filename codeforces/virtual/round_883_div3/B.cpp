#include <bits/stdc++.h>

using namespace std;
using ll = long long;

enum P {
  o, x, p
};

void solve(void) {
  vector<string> game(3);
  for (auto &s : game) cin >> s;
  vector<vector<int>> res(3, vector<int>(4, 0));
  for (int i = 0; i < 3; ++i) {
    for (int j = 0; j < 3; ++j) {
      switch (game[i][j]) {
        case 'O': res[P::o][0]++; break;
        case 'X': res[P::x][0]++; break;
        case '+': res[P::p][0]++; break;
      }
      switch (game[j][i]) {
        case 'O': res[P::o][1]++; break;
        case 'X': res[P::x][1]++; break;
        case '+': res[P::p][1]++; break;
      }
    }
    for (int ii = 0; ii < 3; ++ii) {
      for (int j = 0; j < 2; ++j) {
        //cout << i << " " << ii << " " << j << " " << res[ii][j] << endl;
        if (res[ii][j] == 3) {
          if (ii == P::x) cout << "X";
          if (ii == P::o) cout << "O";
          if (ii == P::p) cout << "+";
          return;
        }
        res[ii][j] = 0;
      }
    }
    switch (game[i][i]) {
      case 'O': res[P::o][2]++; break;
      case 'X': res[P::x][2]++; break;
      case '+': res[P::p][2]++; break;
    }
    switch (game[i][3 - i - 1]) {
      case 'O': res[P::o][3]++; break;
      case 'X': res[P::x][3]++; break;
      case '+': res[P::p][3]++; break;
    }
  }
  for (int i = 0; i < 3; ++i) {
    for (int j = 2; j < 4; ++j) {
      if (res[i][j] == 3) {
        if (i == P::x) cout << "X";
        if (i == P::o) cout << "O";
        if (i == P::p) cout << "+";
        return;
      }
    }
  }
  cout << "DRAW";
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

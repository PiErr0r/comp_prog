#include <bits/stdc++.h>

using namespace std;
using ll = long long;

void solve(void) {
  int n, m, h;
  cin >> n >> m >> h;
  vector<vector<int>> players(n);
  for (int i = 0; i < n; ++i) {
    for (int j = 0; j < m; ++j) {
      int a;
      cin >> a;
      players[i].push_back(a);
    }
    sort(players[i].begin(), players[i].end());
  }
  vector<pair<int, ll>> res(n, pair<int,ll>(0,0));
  for (int i = 0; i < n; ++i) {
    ll curr = 0;
    ll penalty = 0;
    for (int j = 0; j < m; ++j) {
      curr += (ll)players[i][j];
      if (curr <= h) {
        penalty += curr;
        ++res[i].first;
      } else {
        break;
      }
    }
    res[i].second = penalty;
  }

  int place = 1;
  for (int i = 1; i < n; ++i) {
    if (res[i].first > res[0].first) {
      ++place;
    } else if (res[i].first == res[0].first && res[i].second < res[0].second) {
      ++place;
    }
  }
  cout << place;
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

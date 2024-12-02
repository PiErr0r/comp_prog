#include <bits/stdc++.h>
#define PB push_back
#define MP make_pair
#define F first
#define S second
#define FILL(arr) for (auto &value : arr) cin >> value;
#define FOR(n) for (int i = 0; i < n; ++i)

using namespace std;
using ll = long long;

void solve(void) {
  int n;
  cin >> n;
  vector<int> arr(n);
  FILL(arr);
  map<int, int> count;
  vector<int> cnts;
  FOR(arr.size()) {
    ++count[arr[i]];
  }
  for (auto [f, s] : count) {
    cnts.push_back(s);
  }
  sort(cnts.begin(), cnts.end());
  int res = 0;
  char turn = 'A';
  for(int i = 0; i < cnts.size(); ++i, turn = (turn == 'A' ? 'B' : 'A')) {
    if (turn == 'B' && cnts[i] == 1) continue;
    if (cnts[i] == 1)
      res += 2;
    else
      ++res;
    //turn = turn == 'A' ? 'B' : 'A';
  }
  cout << res;
}

int main(void) {
  ios::sync_with_stdio(0);
  cin.tie(0);
  int T, i;
  cin >> T;
  // uncomment for precision when couting doubles
  // std::cout << std::fixed;
  // std::cout << std::setprecision(6);

  for (i = 1; i <= T; ++i) {
    solve();
    cout << endl;
  }

  return 0;
}

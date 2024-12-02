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
  string s;
  cin >> s;
  int i = 0, j = n - 1;
  ll sm = 0;
  while (i <= j) {
    if (i == j) {
      sm += (i + 1);
      break;
    }
    if (s[j - 1] == '0') {
      ll curr = 0;
      --j;
      while (j > i && s[j] == '0') {
        curr += (j + 1);
        --j;
      }
      sm += curr;
      continue;
    }
    if (s[i] == '0') {
      ll curr = 0;
      while (i < j && s[i] == '0') {
        curr += (i + 1);
        ++i;
      }
      sm += curr;
    }
    assert(i != j && s[i] == '1' && s[j] == '1');
    sm += (i + 1);
    ++i;
    --j;
  }
  cout << sm;
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

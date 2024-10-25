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
  string s;
  cin >> n >> s;
  if (s.length() == 1) {
    cout << (s == "1" ? "yes" : "no");
    return;
  }
  int ones = 0;
  for (int i = 0; i < s.length(); ++i) {
    if (s[i] == '0') {
      int j = i;
      while(j < s.length() && s[j] == '0') ++j;
      if (j != s.length() && ones != 0) --ones;
      i = j - 1;
    } else {
      ones++;
    }
  }
  bool f = s[0] == '0';
  bool l = s[s.length() - 1] == '0';
  if (f && l && ones >= 3) cout << "yes";
  else if ((f ^ l) && ones >= 2) cout << "yes";
  else if (!f && !l) cout << "yes";
  else cout << "no";
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

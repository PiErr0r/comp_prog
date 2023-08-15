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
  int n, m, d;
  cin >> n >> m >> d;
  vector<int> s(m);
  FILL(s);
  int mn = 1000000001, cnt = 0;
  for (int i = 0; i < m; ++i) {
    int eaten = 0;
    bool first = false;
    for (int j = 0; j < m; ++j) {
      if (i == j) continue;
      if (!first) {
        if (s[j] != 1) eaten++;
        eaten += ((s[j] - 1) % d != 0 || s[j] == 1) + (s[j] - 1) / d;
      } else {
        if (j - 1 == i) {
          eaten += ((s[j] - s[j-2]) % d != 0) + (s[j] - s[j - 2]) / d;
        } else {
          eaten += ((s[j] - s[j-1]) % d != 0) + (s[j] - s[j - 1]) / d;
        }
      }
      first = true;
    }
    if (i != m - 1)
      eaten += (n - s.back()) / d;
    else eaten += (n - s[m - 2]) / d;
    if (eaten < mn) {
      mn = eaten;
      cnt = 1;
    } else if (eaten == mn) ++cnt;
  }
  cout << mn << " " << cnt;
}

void solve2(void) {
  int n, m, d;
  cin >> n >> m >> d;
  vector<int> s(m);
  FILL(s);

  int eaten = 0;
  for (int i = 0; i < m; ++i) {
    if (i == 0) {
      if (s[i] != 1) ++eaten;
      eaten += ((s[i] - 1) % d != 0 || s[0] == 1) + (s[i] - 1) / d;
    } else {
      eaten += ((s[i] - s[i-1]) % d != 0) + (s[i] - s[i-1]) / d;
    }
  }
  eaten += (n - s.back()) / d;

  int mn = 1000000001, cnt = 0;
  for (int i = 0; i < m; ++i) {
    int neaten = eaten;
    if (i == 0) {
      int add = 1 + ((s[i + 1] - 1) % d != 0) + (s[i + 1] - 1) / d;
      int sub = (s[0] != 1) + ((s[0] - 1) % d != 0 || s[0] == 1) + (s[0] - 1) / d + ((s[i+1] - s[i]) % d != 0) + (s[i+1] - s[i]) / d;
      neaten += add - sub;
    } else if (i == m - 1) {
      int add = (n - s[m - 2]) / d;
      int sub = ((s[i] - s[i-1]) % d != 0) + (s[i] - s[i-1]) / d + (n - s.back()) / d;
      neaten += add - sub;
    } else {
      int add = ((s[i + 1] - s[i - 1]) % d != 0) + (s[i + 1] - s[i - 1]) / d;
      int sub = ((s[i] - s[i-1]) % d != 0) + (s[i] - s[i-1]) / d + ((s[i + 1] - s[i]) % d != 0) + (s[i + 1] - s[i]) / d;
      neaten += add - sub;
    }
    if (neaten < mn) {
      mn = neaten;
      cnt = 1;
    } else if (neaten == mn) ++cnt;
  }
  cout << mn << " " << cnt;
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
    solve2();
    cout << endl;
  }

  return 0;
}

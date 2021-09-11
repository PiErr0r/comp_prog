/**
 * Shamelessly stolen from Errichto 
 *  https://github.com/Errichto/youtube/blob/master/atcoder-dp/g.cpp
 *  https://www.youtube.com/c/Errichto/featured
  */


#include "bits/stdc++.h"
using namespace std;
#define sim template < class c
#define ris return * this
#define dor > debug & operator <<
#define eni(x) sim > typename \
  enable_if<sizeof dud<c>(0) x 1, debug&>::type operator<<(c i) {
sim > struct rge { c b, e; };
sim > rge<c> range(c i, c j) { return rge<c>{i, j}; }
sim > auto dud(c* x) -> decltype(cerr << *x, 0);
sim > char dud(...);
struct debug {
#ifdef LOCAL
~debug() { cerr << endl; }
eni(!=) cerr << boolalpha << i; ris; }
eni(==) ris << range(begin(i), end(i)); }
sim, class b dor(pair < b, c > d) {
  ris << "(" << d.first << ", " << d.second << ")";
}
sim dor(rge<c> d) {
  *this << "[";
  for (auto it = d.b; it != d.e; ++it)
    *this << ", " + 2 * (it == d.b) << *it;
  ris << "]";
}
#else
sim dor(const c&) { ris; }
#endif
};
#define imie(...) " [" << #__VA_ARGS__ ": " << (__VA_ARGS__) << "] "

using ll = long long;

void solve(void) {

  int n;
  string s;
  cin >> n;
  vector<int> rows_o(n), cols_o(n), rows_x(n), cols_x(n);
  vector<string> G(n);

  for (int i = 0; i < n; ++i) {
    cin >> s;
    G[i] = s;
    for (int j = 0; j < n; ++j) {
      if (s[j] == 'O') {
        rows_o[i] = 1;
        cols_o[j] = 1;
      } else if (s[j] == 'X') {
        rows_x[i]++;
        cols_x[j]++;
      }
    }
  }

  int mn = n * n;
  int cnt = 0;
  for (int i = 0; i < n; ++i) {
    if (rows_o[i]) continue;
    if (n - rows_x[i] < mn) {
      mn = n - rows_x[i];
      cnt = 1;
      if (mn == 1) {
        for (int j = 0; j < n; ++j) {
          if (G[i][j] == '.') {
            cols_x[j] = 0;
            break;
          }
        }
      }
    } else if (n - rows_x[i] == mn){
      ++cnt;
    }
  }
  for (int i = 0; i < n; ++i) {
    if (cols_o[i]) continue;
    if (n - cols_x[i] < mn) {
      mn = n - cols_x[i];
      cnt = 1;
    } else if (n - cols_x[i] == mn) {
      ++cnt;
    }
  }

  if (cnt) {
    cout << mn << " " << cnt;
  } else {
    cout << "Impossible";
  }
}

int main(void) {
  cin.tie(0)->sync_with_stdio(0);

  int T;
  cin >> T;

  for (int i = 1; i <= T; ++i) {
    cout << "Case #" << i << ": ";
    solve();
    cout << endl;
  }

  return 0;
}

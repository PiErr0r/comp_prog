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

void log_map(unordered_map<char, unordered_map<char, int>> M) {
  cout << endl;
  for (char i = 'A'; i <= 'Z'; ++i) {
    if (M.find(i) == M.end()) continue;
    for (char j = 'A'; j <= 'Z'; ++j) {
      if (M[i].find(j) == M[i].end()) continue;
      cout << i << "->" << j << "=" << M[i][j] << "; ";
    }
    cout << endl;
  }
}

void solve(void) {

  string s;
  int n;
  cin >> s >> n;
  unordered_map<char, unordered_map<char, int>> M;
  for (int i = 0; i < n; ++i) {
    char a, b;
    cin >> a >> b;
    if (M.find(a) == M.end()) {
      M[a] = {{b, 1}};
    } else {
      M[a][b] = 1;
    }
    //log_map(M);
    for (char j = 'A'; j <= 'Z'; ++j) {
      if (M.find(j) == M.end()) continue;
      if (M[j].find(a) != M[j].end()) {
        if (M[j].find(b) == M[j].end()) {
          M[j][b] = M[j][a] + 1;
        } else {
          M[j][b] = min(M[j][b], M[j][a] + 1);
        }
        for (char k = 'A'; k <= 'Z'; ++k) {
          if (M[a].find(k) == M[a].end()) continue;
          if (M[j].find(k) == M[j].end()) {
            M[j][k] = M[a][k] + M[j][a];
          } else {
            M[j][k] = min(M[j][k], M[a][k] + M[j][a]);
          }
        }
      }
    }
    if (M.find(b) == M.end()) continue;
    for (char j = 'A'; j <= 'Z'; ++j) {
      if (M[b].find(j) != M[b].end()) {
        if (M[a].find(j) != M[a].end()) {
          M[a][j] = min(M[a][j], M[b][j] + 1);
        } else {
          M[a][j] = M[b][j] + 1;
        }
      }
        for (char k = 'A'; k <= 'Z'; ++k) {
          if (M[a].find(k) == M[a].end() || M[j].find(a) == M[j].end()) continue;
          if (M[j].find(k) == M[j].end()) {
            M[j][k] = M[a][k] + M[j][a];
          } else {
            M[j][k] = min(M[j][k], M[a][k] + M[j][a]);
          }
        }
    }
  }
  //log_map(M);
  int mini = 1000 * (int)s.length();
  bool found = false;
  for (char i = 'A'; i <= 'Z'; ++i) {
    int curr = 0;
    bool cant_find = false;
    for (char c : s) {
      if (c == i) continue;
      if (M.find(c) == M.end() || M[c].find(i) == M[c].end()) {
        cant_find = true;
        break;
      }
      curr += M[c][i];
    }
    if (!cant_find) {
      found = true;
      mini = min(mini, curr);
    }
  }

  cout << (!found ? -1 : mini);
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

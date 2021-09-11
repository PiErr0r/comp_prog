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
  string s;
  unordered_set<char> vowels = {'A', 'E', 'I', 'O', 'U'};
  cin >> s;
  int vow = 0, con = 0, max_v = 0, max_c = 0;
  unordered_map<char, int> cons, vows;

  for (int i = 0; i < (int)s.length(); ++i) {
    if (vowels.find(s[i]) != vowels.end()) {
      ++vow;
      vows[s[i]]++;
      if (vows[s[i]] > max_v) {
        max_v = vows[s[i]];
      }
    } else {
      ++con;
      cons[s[i]]++;
      if (cons[s[i]] > max_c) {
        max_c = cons[s[i]];
      }
    }
  }
  cout << min(con + 2 * (vow - max_v), vow + 2 * (con - max_c));
//  debug() << imie(vow) << imie(con) << imie(max_v) << imie(max_c);
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

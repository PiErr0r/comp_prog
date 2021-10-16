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
const int mod = 1'000'000'007;

void solve(void) {

  int n;
  string s;
  cin >> n >> s;
  int L = 0, R = 0;
  bool isL = s[0] != 'O';
  bool isR = s[0] != 'X';
  L = !isL;
  R = !isR;
  // 0: F, X
  // 1: F, O
  for (int i = 1; i < n; ++i) {
    if (isL && s[i] == 'O') {
      ++L; isL = !isL;
    } else if (!isL && s[i] == 'X') {
      ++L; isL = !isL;
    }
    if (isR && s[i] == 'X') {
      ++R; isR = !isR;
    } else if (!isR && s[i] == 'O') {
      ++R; isR = !isR;
    }
    debug() << imie(L) << imie(R);
  }
  cout << min(L, R);
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

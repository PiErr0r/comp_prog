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
  int A = 0, B = 0, goal = 11;
  cin >> s;
  for (int i = 0; i < (int)s.length(); i += 2) {
    int score = s[i + 1] - '0';
    if (s[i] == 'A') {
      A += score;
    } else {
      B += score;
    }
    if (A == B && A == goal - 1) ++goal;
    if (A >= goal) {
      cout << "A" << endl;
      return;
    }
    if (B >= goal) {
      cout << "B" << endl;
      return;
    }
  }
  cout << "FAIL" << endl;
  return;
}

int main(void) {
  cin.tie(0)->sync_with_stdio(0);

  solve();
  return 0;
}

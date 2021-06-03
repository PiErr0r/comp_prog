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


int main(void) {
  cin.tie(0)->sync_with_stdio(0);
  int n, m;
  cin >> n >> m;
  set<array<int, 2>> s;
  for (int i = 0; i < n; ++i) {
    int tmp;
    cin >> tmp;
    s.insert({tmp, i});
  }

  for (int i = 0; i < m; ++i) {
    int p;
    cin >> p;
    auto it = s.lower_bound({p+1, 0});
    if (it == s.begin()) {
      cout << "-1" << endl;
    } else {
      --it;
      cout << (*it)[0] << endl;
      s.erase(it);
    }
  }

  return 0;
}

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

ll my_pow_10(int n) {
  ll res = 1;
  ll curr = 10;
  while (n) {
    if (n&1)
      res *= curr;
    n >>= 1;
    curr *= curr;
  }
  return res;
}

int my_dlog10(ll n) {
  int cnt = 0;
  while (n) {
    ++cnt;
    n /= 10;
  }
  return cnt;
}

int get_num(ll n) {
  ll curr = 1, inc = 1, tmp;
  int cnt = 1;
  auto next = [](ll a, int b, ll c) -> ll { return a + 9 * (ll)b * c; };
  while ((tmp = next(curr, cnt, inc)) <= n) {
    curr = tmp;
    ++cnt;
    inc *= 10;
  }
  n -= curr;
  curr = inc;
  tmp = n / (ll)cnt;
  curr += tmp;
  n -= tmp * cnt;
  --cnt;

  ll p = my_pow_10(cnt - n);
  return (curr / p) % 10;
}

int main(void) {
  cin.tie(0)->sync_with_stdio(0);

  int q;
  cin >> q;
  while (q--) {
    ll num;
    cin >> num;

    cout << get_num(num) << endl;
  }

  return 0;
}

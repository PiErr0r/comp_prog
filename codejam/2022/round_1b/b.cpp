/**
 * Shamelessly stolen from Errichto 
 *  https://github.com/Errichto/youtube/blob/master/atcoder-dp/g.cpp
 *  https://www.youtube.com/c/Errichto/featured
  */


#include "bits/stdc++.h"
using namespace std;
#define TTT template <typename T>
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
const ll mod = 1'000'000'007;
TTT T m_add(T a, T b){ return (a%mod+b%mod)%mod; }
TTT T m_sub(T a, T b){ return ((a-b)%mod+mod)%mod; }
TTT T m_mul(T a, T b){ return ((a%mod)*(b%mod))%mod; }


void solve(void) {

  int N, P;
  cin >> N >> P;
  vector<pair<int, int>> prod(N);
  for (int i = 0; i < N; ++i) {
    int mn, mx, a;
    for (int j = 0; j < P; ++j) {
      cin >> a;
      if (j == 0) {
        mn = a;
        mx = a;
      } else {
        mx = max(a, mx);
        mn = min(a, mn);
      }
    }
    prod[i] = make_pair(mn, mx);
  }
  ll resl = prod[0].second;
  ll resr = prod[0].second;
  int l = prod[0].second;
  int r = prod[0].second;
  for (int i = 1; i < N; ++i) {
    int mn = prod[i].first, mx = prod[i].second;
    ll _rl = abs(mx - r) + mx - mn;
    ll _rr = abs(r - mn) + mx - mn;
    ll _lr = abs(l - mn) + mx - mn;
    ll _ll = abs(mx - l) + mx - mn;
    ll oldl = resl;
    resl = min(resl + _ll, resr + _rl);
    resr = min(oldl + _lr, resr + _rr);
    l = mn;
    r = mx;
  }
  cout << min(resl, resr);
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

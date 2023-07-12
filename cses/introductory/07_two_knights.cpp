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

const int mod = 1000000007;
template <typename T>
T m_add(T a, T b){ return (a+b)%mod; }
template <typename T>
T m_sub(T a, T b){ return ((a-b)%mod+mod)%mod; }
template <typename T>
T m_mul(T a, T b){ return (a*b)%mod; }

using ll = long long;

void solve(void) {
    int n;
    cin >> n;
    vector<ll> prev = {0, 6, 28, 96, 252, 550};
    for (int i = 7; i <= n; ++i) {
        // both in inner
        ll curr = prev[i - 1 - 2];
        ll grid_in = (i - 2) * (i - 2);
        ll rim = 4 * (i - 1);
        // both on rim - can attack only on corners, each corner has 2 configurations
        curr += rim * (rim - 1) / 2 - 4 * 2;
        // one on rim, other in inner
        // if 3 away from corner then it has 4 attacking positions
        curr += 4 * (i - 3 - 3) * (grid_in - 4);
        // if on corner it has 2 attacking positions
        curr += 4 * (grid_in - 2);
        // if 1 away from corner it can be on the rim (already counted) or it can be in inner in 2 ways
        curr += 8 * (grid_in - 2);
        // if 2 away from corner it can be on the rim (already counted) or it can be in ineer in 3 ways
        curr += 8 * (grid_in - 3);
        prev.push_back(curr);
    }
    for (int i = 0; i < n; ++i) {
        cout << prev[i] << endl;
    }
}

int main(void) {
  cin.tie(0)->sync_with_stdio(0);

  solve();

  return 0;
}


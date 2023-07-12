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
    int n, mx = 0, curr = 0;
    cin >> n;
    vector<int> come(n);
    vector<int> leave(n);
    unordered_set<int> T;
    for (int i = 0; i < n; ++i) {
        int a, b;
        cin >> a >> b;
        come[i] = a;
        leave[i] = b;
        T.insert(a);
        T.insert(b);
    }
    vector<int> t(T.begin(), T.end());
    sort(t.begin(), t.end());
    sort(come.begin(), come.end());
    sort(leave.begin(), leave.end());

    for (int i : t) {
        int a = 0, b = 0;
        auto pc = lower_bound(come.begin(), come.end(), i);
        auto pl = lower_bound(leave.begin(), leave.end(), i);
        while (pc != come.end() && *pc++ == i) ++a;
        while (pl != leave.end() && *pl++ == i) ++b;
        curr += a - b;
        mx = max(mx, curr);
    }

    cout << mx << endl;
}

int main(void) {
  cin.tie(0)->sync_with_stdio(0);

  solve();

  return 0;
}

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
    int m, n, k;
    cin >> m >> n >> k;
    vector<int> apts(n);
    vector<int> apps(m);
    for (int &i : apps) cin >> i;
    for (int &i : apts) cin >> i;

    sort(apts.begin(), apts.end());
    sort(apps.begin(), apps.end());

    int p_apt = 0, p_app = 0, cnt = 0;
    while (p_apt < (int)apts.size() && p_app < (int)apps.size()) {
        if (apts[p_apt] < apps[p_app] - k) {
            ++p_apt;
        } else if (apps[p_app] - k <= apts[p_apt] && apts[p_apt] <= apps[p_app] + k) {
            ++cnt;
            ++p_apt;
            ++p_app;
        } else {
            ++p_app;
        }
    }
    cout << cnt << endl;
}

int main(void) {
  cin.tie(0)->sync_with_stdio(0);

  solve();

  return 0;
}

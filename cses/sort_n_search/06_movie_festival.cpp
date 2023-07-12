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
    vector<int> b(n), e(n);
    vector<pair<int, int>> movs;

    for (int i = 0; i < n; ++i) {
        int c, d;
        cin >> c >> d;
        movs.push_back(make_pair(d, c));
    }
    sort(movs.begin(), movs.end());
    int cnt = 0;
    auto p = movs.begin();
    while (p != movs.end()) {
        ++cnt;
        int ends = p->first;
        int j = p - movs.begin() + 1;
        while (j < n) {
            if (movs[j].second >= ends) {
                p = movs.begin() + j;
                break;
            }
            ++j;
        }
        if (j == n) break;
    }
    cout << cnt << endl;
}

int main(void) {
  cin.tie(0)->sync_with_stdio(0);

  solve();

  return 0;
}

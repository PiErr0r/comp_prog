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
    int n, k;
    cin >> n >> k;
    vector<int> nums(n);
    vector<int> prev(n + 2);
    vector<int> next(n + 2);
    for (int i = 0; i < n; ++i) {
        int m;
        cin >> m;
        prev[m + 1] = i;
        next[m - 1] = i;
        nums[i] = m;
    }
    vector<bool> a(n + 1, false);
    int cnt = 0;
    for (int i = 0; i < n; ++i) {
        int m = nums[i];
        if (!a[m - 1]) ++cnt;
        a[m] = true;
    }
    for (int i = 0; i < k; ++i) {
        int c, d;
        cin >> c >> d;
        --c; --d;
        int nc = nums[c];
        int nd = nums[d];
        int diff = 0;
        // TODO
        if (nc + 1 == nd || nc - 1 == nd) {
            if (nc + 1 == nd) {
                if (c > d) ++diff;
                else --diff;
            } else {
                if (c > d) --diff;
                else ++diff;
            }

            goto exchange;
        }
        cout << imie(c) << imie(nc) << imie(d) << imie(nd) << endl;
        cout << imie(cnt) << imie(diff) << imie(prev[nc]) << imie(prev[nd]) << imie(next[nd]) << imie(next[nc]) << endl;
        if (nc != 1 && c > prev[nc] && d <= prev[nc]) --diff;
        if (nc != 1 && c < prev[nc] && d >= prev[nc]) ++diff;
        cout << imie(cnt) << imie(diff) << imie(prev[nc]) << imie(prev[nd]) << imie(next[nd]) << imie(next[nc]) << endl;
        if (nc != n && c < next[nc] && d >= next[nc]) ++diff;
        if (nc != n && c > next[nc] && d <= next[nc]) --diff;
        cout << imie(cnt) << imie(diff) << imie(prev[nc]) << imie(prev[nd]) << imie(next[nd]) << imie(next[nc]) << endl;
        if (nd != 1 && d > prev[nd] && c <= prev[nd]) --diff;
        if (nd != 1 && d < prev[nd] && c >= prev[nd]) ++diff;
        cout << imie(cnt) << imie(diff) << imie(prev[nc]) << imie(prev[nd]) << imie(next[nd]) << imie(next[nc]) << endl;
        if (nd != n && d < next[nd] && c >= next[nd]) ++diff;
        if (nd != n && d > next[nd] && c <= next[nd]) --diff;
        cout << imie(cnt) << imie(diff) << imie(prev[nc]) << imie(prev[nd]) << imie(next[nd]) << imie(next[nc]) << endl;
exchange:
        int tmp = nums[c];
        next[nc - 1] = d;
        prev[nc + 1] = d;
        next[nd - 1] = c;
        prev[nd + 1] = c;
        nums[c] = nums[d];
        nums[d] = tmp;
        cnt += diff;
        cout << cnt << endl;
    }
}

int main(void) {
  //cin.tie(0)->sync_with_stdio(0);

  solve();

  return 0;
}

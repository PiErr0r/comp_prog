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
const ll mod = 1'000'000'007;

ll ranges(vector<pair<int,int>> &v, int l, int r) {
  int diff = r - l;
  if (diff <= 2) {
    return 0;
  }
  int s = diff - 2;
  ll res = 0;
  if (s == 1) {
    int dd = v[r - 1].first - v[l].first;
    int num = v[l + 1].first;
    int mn = min(num - v[l].first, v[r-1].first - num);
    res = (mn * mn  - mn) % mod;
    res = (res + ((dd - 2 * mn) * mn) % mod) % mod;
    if (dd == 2 * mn) {
      res = (res + mn * (mn - 1) % mod) % mod;
    }
    return res;
  }
  int left = v[l+1].second;
  int right = v[r-2].first;
  int mn = min(left - v[l].first, v[r-1].first - right);
  int mx = max(left - v[l].first, v[r-1].first - right);
  int dd = v[r-1].first - left;

  res = (s * (mn * mn + mn) % mod) % mod;
  debug() << imie(res) << imie(dd) << imie(mn) << imie(v[l]) << imie(v[r-1]) << imie(l) << imie(r-1) << imie(mx);
  res = (res + (s * ((dd - 2 * mn) * mn % mod) % mod) % mod) % mod;
  if (mn == 0) {
    res = (s * mx);
  }
  debug() << imie(res) << imie(dd) << imie(mn) << imie(v[l]) << imie(v[r-1]) << imie(l) << imie(r-1) << imie(mx);
  res = (res + ranges(v, l + 1, r) % mod) % mod;
  debug() << imie(res);
  res = (res + ranges(v, l, r - 1) % mod) % mod;
  debug() << imie(res);
  return res;
}

int find_left(string &s, int i) {
  bool isX = s[i] == 'X';
  bool isO = s[i] == 'O';
  while (isX && i >= 0 && s[i] != 'O') --i;
  while (isO && i >= 0 && s[i] != 'X') --i;

  return max(i, 0);
}

void solve(void) {

  int n;
  string s;
  cin >> n >> s;
  int L = 0, R = 0;
  bool isL = s[0] != 'O';
  bool isR = s[0] != 'X';
  vector<pair<int, int>> li = {make_pair(0, 0)}, ri = {make_pair(0, 0)};
  L = !isL;
  R = !isR;
  // 0: F, X
  // 1: F, O
  for (int i = 1; i < n; ++i) {
    if (isL && s[i] == 'O') {
      ++L; isL = !isL;
      int LI = find_left(s, i);
      li.push_back(make_pair(i, LI));
    } else if (!isL && s[i] == 'X') {
      ++L; isL = !isL;
      int LI = find_left(s, i);
      li.push_back(make_pair(i, LI));
    }
    if (isR && s[i] == 'X') {
      ++R; isR = !isR;
      int LI = find_left(s, i);
      ri.push_back(make_pair(i, LI));
    } else if (!isR && s[i] == 'O') {
      ++R; isR = !isR;
      int LI = find_left(s, i);
      ri.push_back(make_pair(i, LI));
    }
  }
  li.push_back(make_pair(n, -1));
  ri.push_back(make_pair(n, -1));
  if (L < R) {
    cout << ranges(li, 0, li.size());
  } else {
    cout << ranges(ri, 0, ri.size());
  }
}

int main(void) {
  cin.tie(0)->sync_with_stdio(0);

  int T;
  cin >> T;
//  --T;

  for (int i = 1; i <= T; ++i) {
    cout << "Case #" << i << ": ";
    solve();
    cout << endl;
  }

  return 0;
}

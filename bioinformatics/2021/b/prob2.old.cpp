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

pair<int, int> bin_search(double num, vector<pair<double, pair<int, int>>> &sums) {
  int lo = 0, hi = sums.size(), mid;
  pair<int,int> res;
  double mini = DBL_MAX;
  while (lo < hi) {
    mid = lo + (hi - lo) / 2;
    auto tmp = sums[mid];
    double diff = tmp.first - num;
    if (abs(diff) < mini) {
      res = tmp.second;
      mini = abs(diff);
    }
    if (diff == 0) {
      return tmp.second;
    } else if (diff > 0) {
      hi = mid;
    } else {
      lo = mid + 1;
    }
  }
  return res;
}

void solve() {
  int m, n, k;
  cin >> m >> k >> n;
  vector<double> masses(m);
  //vector<double> adducts(k);
  // change this to pair pair
  vector<pair<double,pair<int,int>>> sums;
  for (double &i : masses) {
    cin >> i;
  }
  for (int i = 0; i < k; ++i) {
    double tmp;
    cin >> tmp;
    for (int j = 0; j < m; ++j) {
      //cout << (masses[j] + tmp) << endl;
      sums.push_back(make_pair(, make_pair(j, i)));
      //sums.push_back({masses[j] + tmp, j, i});
    }
  }

  // sort the masses and the binary search to find the smallest delta
  sort(sums.begin(), sums.end());
  for (int i = 0; i < (int)sums.size(); ++i) {
    //cout << sums[i].first << " " << masses[sums[i].second.first] << endl;
  }
  for (int i = 0; i < n; ++i) {
    double tmp;
    cin >> tmp;
    pair<int, int> pp = bin_search(tmp, sums);
    cout << (pp.first + 1) << " " << (pp.second + 1) << endl;
  }
}

int main(void) {
  cin.tie(0)->sync_with_stdio(0);
  int T;
  cin >> T;
  while (T--) {
    solve();
  }
  return 0;
}

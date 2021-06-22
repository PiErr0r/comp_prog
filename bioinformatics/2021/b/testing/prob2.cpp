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

pair<int, int> bin_searchxx(double num, vector<pair<double, pair<int, int>>> &sums) {
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

double bin_search(double num, vector<double> &sums) {
  int lo = 0, hi = sums.size(), mid;
  double mini = DBL_MAX;
  double res;
  while (lo < hi) {
    mid = lo + (hi - lo) / 2;
    auto tmp = sums[mid];
    double diff = tmp - num;
    if (abs(diff) < mini) {
      mini = abs(diff);
      res = tmp;
    }
    if (diff == 0.0) {
      return tmp;
    } else if (diff > 0.0) {
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
  vector<double> adducts(k);
  vector<double> signals(n);
  // change this to pair pair
  // vector<pair<double,pair<int,int>>> sums;
  vector<double> sums;
  unordered_map<double,pair<int,int>> memo;
  unordered_map<int, double> res;
  vector<pair<int,int>> storage (n);
  for (double &i : masses) {
    cin >> i;
  }
  for (double &i : adducts) {
    cin >> i;
  }
  int zz = 0;
  for (double &i : signals) {
    cin >> i;
    res[zz] = DBL_MAX;
    storage[zz] = make_pair(0, 0);
    ++zz;
  }
  int b_size = 10000;
  int curr = 0;
  // masses go to buckets not adducts
  for (int bucket = 0; bucket <= m / b_size; ++bucket) {
    for (int i = 0; i < b_size && curr * b_size + i < m; ++i) {
      for (int j = 0; j < k; ++j) {
        double ans = masses[curr * b_size + i] + adducts[j];
        auto it = memo.find(ans);
        if (it==memo.end()) {
          memo[ans] = make_pair(curr * b_size + i, j);
          sums.push_back(ans);
        }
      }
    }
    sort(sums.begin(), sums.end());
    for (int i = 0; i < n; ++i) {
      double cres = bin_search(signals[i], sums);
      double ddd = abs(cres - signals[i]);
      if (ddd < res[i]) {
        res[i] = ddd;
        storage[i] = make_pair(memo[cres].first, memo[cres].second);
      }
    }
    memo.clear();
    sums.clear();
    //sums.shrink_to_fit();
    ++curr;
  }

  for (int i = 0; i < n; ++i) {
    cout << (storage[i].first + 1) << " " << (storage[i].second + 1) << endl;
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

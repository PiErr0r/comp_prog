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

/* main code to use in useco for io operations
#include <cstdio>
using namespace std;
void setIO(string s) {
  freopen((s + ".in").c_str(), "r", stdin);
  freopen((s + ".out").c_str(), "w", stdout);
}

int main() {
  setIO("templeate");
  solve();
  return;
}
 * */

void erathosten(vector<int> &res) {
  vector<int> sieve(res.size(), 0);
  for (int i = 2; i < (int)sieve.size(); ++i) {
    if (sieve[i] != 0) continue;
    for (int j = i; j < (int)sieve.size(); j += i) {
      sieve[j] = i;
    }
  }
  for (int i = 2; i < (int)sieve.size(); ++i) {
    int j = i;
    while (j != 1) {
      ++res[i];
      j /= sieve[j];
    }
  }
  for (int i = 2; i < (int)sieve.size(); ++i) {
    res[i] += res[i - 1];
  }
}

void solve(int a, int b, vector<int> &sieve) {
  if (a == b) {
    cout << 0 << endl;
    return;
  }
  cout << (sieve[a] - sieve[b]) << endl;
}

int main(void) {
  //cin.tie(0)->sync_with_stdio(0);
  ios::sync_with_stdio(false);
  cin.tie(nullptr);
  vector<int> sieve(5000000 + 1, 0);
  //vector<int> sieve(5000 + 1, 0);
  erathosten(sieve);
  int t;
  cin >> t;
  int a, b;
  for (int i = 0; i < t; ++i) {
    cin >> a >> b;
    cout << (sieve[a] - sieve[b]) << endl;
  }
  return 0;
}

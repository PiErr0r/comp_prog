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


int man_dist(int x, int y, int* obj) {
  int x1 = obj[0], y1 = obj[1], x2 = obj[2], y2 = obj[3];
  int mnx, mny;
  if (x1 <= x && x <= x2) {
    mnx = 0;
  } else {
    mnx = min(abs(x - x1), abs(x - x2));
  }
  if (y1 <= y && y <= y2) {
    mny = 0;
  } else {
    mny = min(abs(y - y1), abs(y - y2));
  }
  return (mnx + mny);
}

void solve(void) {

  int K;
  cin >> K;
  vector<int[4]> obj(K);

  for (int i = 0; i < K; ++i) {
    cin >> obj[i][0] >> obj[i][1] >> obj[i][2] >> obj[i][3];
  }

  pair<int, int> res = {101,101};
  int mn = 2147483647;

  for (int i = -100; i <= 100; ++i) {
    for (int j = -100; j <= 100; ++j) {
      int sum = 0;
      for (int k = 0; k < K; ++k) {
        int curr = man_dist(i, j, obj[k]);
        sum += curr;
      }
      if (sum < mn) {
        mn = sum;
        res = make_pair(i, j);
      } else if (sum == mn) {
        if (i < res.first) {
          res.first = i;
        } else if (i == res.first && j < res.second) {
          res.second = j;
        }
      }
    }
  }
  cout << res.first << " " << res.second;
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

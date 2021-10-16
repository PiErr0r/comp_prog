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


void solve(void) {

  int N, K;
  cin >> N >> K;
  vector<int> B(N);
  for (int& i : B) {
    cin >> i;
  }
  int curr, sum;
  int i, j, k, l;
  int mn = 2147483647;
  for (i = 0; i < N; ++i) {
    for (j = i; j < N; ++j) {
outer:sum = 0;
      if (j >= N) break;
      for (int ii = i; ii <= j; ++ii) {
        sum += B[ii];
      }
      if (sum == K) {
        if (j - i + 1 < mn) {
          mn = j - i + 1;
        }
      } else if (sum > K) {
        continue;
      }
      for (k = j + 1; k < N; ++k) {
        for (l = k; l < N; ++l) {
          curr = 0;
          for (int ii = k; ii <= l; ++ii) {
            curr += B[ii];
          }
          if (curr == K) {
            if (l - k + 1 < mn) {
              mn = l - k + 1;
            } 
          } else if (curr > K) {
            break;
            goto outer;
          } else if (curr + sum == K) {
            int res = j - i + l - k + 2;
            if (res < mn) {
              mn = res;
            }
          }
        }
      }
    }
  }
  cout << (mn == 2147483647 ? -1 : mn);
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

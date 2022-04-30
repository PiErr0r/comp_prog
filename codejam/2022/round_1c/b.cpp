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
  vector<int> nums(N);
  for (auto &a : nums) {
    cin >> a;
  }

  ll sq_sum = 0;
  ll sum_of_sq = 0;
  for (int i = 0; i < N; ++i) {
    sq_sum += nums[i];
    sum_of_sq += nums[i] * nums[i];
  }
  if (sum_of_sq == 0) {
    cout << 0;
    return;
  } else if (sq_sum == 0) {
    cout << "IMPOSSIBLE";
    return;
  }
  if (sum_of_sq == sq_sum * sq_sum) {
    cout << 0;
    return;
  }
  ll total_sum = 0;
  for (int i = 0; i < N; ++i) {
    for (int j = i + 1; j < N; ++j) {
      total_sum += nums[i] * nums[j];
    }
  }
  ll rem = total_sum % sq_sum;
  if (rem) {
    cout << "IMPOSSIBLE";
    return;
  }
  ll x = total_sum / sq_sum;
  ll res = (sq_sum + x) * (sq_sum + x);
  if (res == (sum_of_sq + x*x)) {
    cout << x;
  } else {
    cout << -x;
  }
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

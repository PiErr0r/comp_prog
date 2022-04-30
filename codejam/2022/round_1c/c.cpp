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

// Function for extended Euclidean Algorithm
int gcdExtended(int a, int b, int* x, int* y);

// Function to find modulo inverse of a
int modInverse(int a, int m)
{
    int x, y;
    int g = gcdExtended(a, m, &x, &y);
    if (g != 1)
       return -1;
    else
    {
        // m is added to handle negative x
        int res = (x % m + m) % m;
        return res;
    }
}

// Function for extended Euclidean Algorithm
int gcdExtended(int a, int b, int* x, int* y)
{
    // Base Case
    if (a == 0)
    {
        *x = 0, *y = 1;
        return b;
    }
    // To store results of recursive call
    int x1, y1;
    int gcd = gcdExtended(b % a, a, &x1, &y1);

    // Update x and y using results of recursive
    // call
    *x = y1 - (b / a) * x1;
    *y = x1;

    return gcd;
}

ll fact_m(int n) {
  ll res = 1;
  for (ll i = 1; i <= n; ++i) {
    res = m_mul(res, i);
  }
  return res;
}

ll snock(ll n,ll k)
{
    if(n==0|k>n)return 0;
    if(k==1|k==n)return 1;

    return snock(n-1,k-1)+k*snock(n-1,k);

}

void solve(void) {

  int M, K;
  cin >> M >> K;
  int x, y;
  ll p, q;
  p = 1555200;
  p = snock(M, K); // not sure how to get this number...
  q = fact_m(M * (M-1) / 2);
  cout << p << endl;
  ll gcd = gcdExtended(p, q, &x, &y);
  p /= gcd;
  q /= gcd;
  q = modInverse(q, mod);
  cout << (p * q) % mod;

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

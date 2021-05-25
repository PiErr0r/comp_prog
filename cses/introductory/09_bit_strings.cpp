#include <bits/stdc++.h>

using namespace std;
typedef long long ll;
const int mod = 1e9 + 7;

int main(void) {
  cin.tie(0)->sync_with_stdio(0);

  int n;
  cin >> n;
  ll ans = 1;
  ll tmp = 2;
  while (n) {
    if (n&1)
      ans = ans * (tmp % mod) % mod;
    tmp = (tmp * tmp) % mod;
    n >>= 1;
  }
  cout << ans << endl;

  return 0;
}

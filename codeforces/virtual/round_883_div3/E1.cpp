#include <bits/stdc++.h>
#include <cmath>

using namespace std;
using ll = long long;
/*
S = (r^n - 1) / (r - 1)
S (r - 1) = r^n - 1
 * */
void solve(void) {
  ll n;
  cin >> n;
  if (n < 7) {
    cout << "NO";
    return;
  }
  for (ll r = 2; r*r < n; ++r) {
    /*
    double k = log(n * (r - 1) + 1) / log(r);
//    cout << n << " " << r << " " << k << endl;
    if (k - (ll)k < 0.0001) {
      cout << "YES";
      return;
    }
    */
    ll S = 1 + r + r*r, R = r*r*r;
    while (S > 0 && R > 0 &&  S < n) {
      S += R;
      R *= r;
    }
    if (S == n) {
      cout << "YES";
      return;
    }
    //if (1 + r + r * r > n) break;
  }
  cout << "NO";
}

int main(void) {

  int T, i;
  cin >> T;

  for (i = 1; i <= T; ++i) {
    solve();
    cout << endl;
  }

  return 0;
}

#include <bits/stdc++.h>

using namespace std;
typedef long long ll;

void solve(void) {

}

int main(void) {

  int t;
  cin >> t;
  ll x, y;
  vector<ll> ansurs(t);
  for (int i = 0; i < t; ++i) {
    cin >> y >> x;
    ll mx = max(x, y);
    ll diag = mx * (mx - 1) + 1;
    ll ans;
    /*
    if (x == y) {
      ans = diag;
    } else if (x < y) {
      if (mx&1) {
        ans = diag - y - x;
      } else {
        ans = diag + y - x;
      }
    } else {
      if (mx&1) {
        ans = diag + x - y;
      } else {
        ans = diag - x - y;
      }
    }*/
    if (x == y) {
      ans = diag;
    } else {
      if (mx & 1) {
        ans = diag - (y - x);
      } else {
        ans = diag + (y - x);
      }
    }

    ansurs[i] = ans;
  }
  for (int i = 0; i < t; ++i) {
    cout << ansurs[i] << endl;
  }
  return 0;
}

/**
 *
 *  1 3 7 13 21  31
 *   2 4 6  8  10
 *
  */

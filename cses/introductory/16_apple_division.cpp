#include <bits/stdc++.h>

using namespace std;
typedef long long ll;

void solve(void) {

}

const ll nax = 1e9 + 5;
//const int nax = 20;
//
int main(void) {
  cin.tie(0)->sync_with_stdio(0);
  int n;
  cin >> n;
  vector<int> a(n);
  unordered_set<ll> sums {0};
  ll sum = 0;

  for (int &i : a) {
    cin >> i;
    sum += i;
  }

  for (int i : a) {
    unordered_set<ll> tmp;
    for (ll j : sums) {
      tmp.insert(j+i);
    }
    for (ll j : tmp) {
      sums.insert(j);
    }
  }
  ll mn = LLONG_MAX;
  for (ll i : sums) {
    mn = min(mn, abs(sum - i - i));
  }
  cout << mn << endl;


  return 0;
}


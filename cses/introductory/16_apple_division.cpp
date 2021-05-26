#include <bits/stdc++.h>

using namespace std;
typedef long long ll;

void solve(void) {

}

const ll nax = 1e9 + 5;
//const int nax = 20;
int main(void) {
  cin.tie(0)->sync_with_stdio(0);

  int n;
  cin >> n;
  vector<int> a(n);
  set<ll> sums;
  ll sum = 0;

  for (int &i : a) {
    cin >> i;
    sum += i;
  }

  bitset<nax> b;
  b[0] = 1;

  for (int i : a) {
    int sz = sums.size();
    for (int j = 0; j < sz; ++j) {
      sums.insert((sums.begin()[j]) + i);
    }
  }

  ll mn = INT_MAX;
  for (int i : sums) {
    mn = min(mn, abs(sum - (ll)i - (ll)i));
  }

  cout << mn << endl;

  return 0;
}

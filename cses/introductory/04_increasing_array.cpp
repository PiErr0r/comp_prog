#include <bits/stdc++.h>

using namespace std;
typedef long long ll;

void solve(void) {

}

int main(void) {

  int n;
  cin >> n;
  ll res = 0, prev;
  cin >> prev;
  for (int i = 1; i < n; ++i) {
    ll tmp;
    cin >> tmp;
    if (tmp < prev) {
      res += (prev - tmp);
    } else {
      prev = tmp;
    }
  }
  cout << res << endl;

  return 0;
}

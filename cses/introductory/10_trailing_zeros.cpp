#include <bits/stdc++.h>

using namespace std;
typedef long long ll;

int main(void) {
  cin.tie(0)->sync_with_stdio(0);

  int n;
  cin >> n;
  ll f_pot = 5;
  ll fives = 0;
  while (f_pot <= n) {
    fives += n / f_pot;
    f_pot *= 5;
  }
  cout << fives << endl;

  return 0;
}

#include <bits/stdc++.h>

using namespace std;
typedef long long ll;

void solve(void) {

}

int main(void) {

  int n;
  ll sum = 0;
  cin >> n;
  for (int i = 0; i < n - 1; ++i) {
    int tmp;
    cin >> tmp;
    sum += tmp;
  }
  ll res = ((ll) n * (n+1) / 2) - sum;
  cout << res << endl;
  return 0;
}

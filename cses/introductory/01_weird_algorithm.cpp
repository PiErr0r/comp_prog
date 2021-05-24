#include <bits/stdc++.h>

using namespace std;
typedef long long ll;

void solve(void) {

}

int main(void) {

  ll n;
  cin >> n;

  cout << n;
  while (n != 1) {
    n = (n&1) ? n*3+1 : n >> 1;
    cout << " " << n;
  }
  cout << endl;

  return 0;
}

#include <bits/stdc++.h>
#define PB push_back
#define MP make_pair
#define F first
#define S second
#define FILL(arr) for (auto &value : arr) cin >> value;
#define FOR(n) for (int i = 0; i < n; ++i)

using namespace std;
using ll = long long;

void solve(void) {
  int n, k;
  cin >> n >> k;
  if (n == 1) {
    cout << 0;
    return;
  }
  map<int, int> s;
  s[n] = 1;
  int ones = 0;
  int op = 0;
  cout << "!!!!!! " << n << endl;
  while(ones != n && s.size() >= 1) {
    map<int, int> ns;
    for (auto p : s) {
      auto [a, b] = p;
      if (a == 1) {
        ones += b;
        //op++;
      } else if ((float)a / k <= 1.f) {
        ones += b * a;
        op += b;
      } else {
        if (a % k == 0) {
          if (ns.find(k) != ns.end()) {
            ns[k] += (a/k) * b;
          } else {
            ns[k] = (a/k) * b;
          }
          op += b;
        } else {
          int nn = a / k;
          if (ns.find(nn) != ns.end()) {
            ns[nn] += k - 1;
          } else {
            ns[nn] = k - 1;
          }
          if (ns.find(a - nn * (k - 1)) != ns.end()) {
            ns[a - nn * (k - 1)] += 1;
          } else {
            ns[a - nn * (k - 1)] = 1;
          }
          op += b;
        }
      }
    }
    cout << ns.size() << endl;
    for (auto [a, b] : ns) {
      cout << a << ' ' << b << endl;
    }
    s = ns;
  }
  cout << op;

}

int main(void) {
  ios::sync_with_stdio(0);
  cin.tie(0);
  int T, i;
  cin >> T;
  // uncomment for precision when couting doubles
  // std::cout << std::fixed;
  // std::cout << std::setprecision(6);

  for (i = 1; i <= T; ++i) {
    solve();
    cout << endl;
  }

  return 0;
}

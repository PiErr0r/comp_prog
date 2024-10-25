#include <bits/stdc++.h>
#define PB push_back
#define MP make_pair
#define F first
#define S second
#define FILL(arr) for (auto &value : arr) cin >> value;
#define FOR(n) for (int i = 0; i < n; ++i)

using namespace std;
using ll = long long;

void swp(vector<pair<int, int>> &perm, int i, int curr) {
  int other = (int)perm.size() - i - 1;
  int j;
  if (perm[other].F == i) {
    j = perm[other].S;
  } else {
    j = perm[i].S;
  }
  perm[j].F = curr;
  perm[curr].S = j;
  perm[i].F = other;
  perm[other].S = i;
}

void print(vector<pair<int, int>> &perm) {
  FOR(perm.size()) {
    cout << "F=" << perm[i].F << " S=" << perm[i].S << " ";
  }
  cout << endl;
}
void solve(void) {
  int n;
  cin >> n;
  vector<pair<int, int>> perm(n);
  FOR(n) {
    int a;
    cin >> a;
    --a;
    perm[i].F = a;
    perm[a].S = i;
  }
  int cnt = 0;
  int i = 0;
  print(perm);
  while(i < n) {
    if (perm[i].F == i || perm[i].F == n - i - 1) {
      ++i;
      continue;
    }
    int curr = perm[i].F;
    //cout << i << " " << curr << endl;
    swp(perm, i, curr);
    //print(perm);
    ++cnt;
  }
  cout << cnt;
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

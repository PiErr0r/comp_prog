#include <bits/stdc++.h>
#define PB push_back
#define MP make_pair
#define F first
#define S second
#define FILL(arr) for (auto &value : arr) cin >> value;

using namespace std;
using ll = long long;

int count_children(vector<vector<int>> &tree, int node) {
  int res = 1;
  for (auto a : tree[node]) {
    res += count_children(tree, a);
  }
  return res;
}

ll count_perm(vector<vector<int>> &tree, int node) {
  ll res = 0;
  ll ls = 0, rs = 0;
  vector<int> sz;
  //for (int i = 0; i < (int)tree[node].size(); ++i) {
  for (auto a : tree[node]) {
    sz.PB(count_children(tree, a));
  }
  sort(sz.begin(), sz.end(), [](int a, int b) { return a > b; });
  vector<int> lsz;
  vector<int> rsz;
  int n = (int)sz.size();
  for (int i = 0; i < n; ++i) {
    if (ls + sz[i] <= rs) {
      lsz.PB(sz[i]);
      ls += sz[i];
    } else {
      rsz.PB(sz[i]);
      rs += sz[i];
    }
  }
  /*
  for (int i = 0; i < n - 1; i += 2) {
    lsz.PB(sz[i]);
    ls += sz[i];
    rsz.PB(sz[i + 1]);
    rs += sz[i + 1];
  }
  if (n % 2 == 1 && ls > rs) {
    rsz.PB(sz[n - 1]);
  } else if (n % 2 == 1) {
    lsz.PB(sz[n - 1]);
  }
  */
  for (int a : lsz) {
    for (int b : rsz) {
      res += (ll)a * (ll)b;
    }
  }
  for (int a : tree[node]) {
    res += count_perm(tree, a);
  }
  return res;
}

void solve(void) {
  int n;
  cin >> n;
  vector<vector<int>> children(n, vector<int>());
  for (int i = 0; i < n - 1; ++i) {
    int a;
    cin >> a;
    children[--a].PB(i + 1);
  }
  ll res = count_perm(children, 0);
  cout << res;
}

int main(void) {
  ios::sync_with_stdio(0);
  cin.tie(0);
  //int T, i;
  //cin >> T;
  // uncomment for precision when couting doubles
  // std::cout << std::fixed;
  // std::cout << std::setprecision(6);

  //for (i = 1; i <= T; ++i) {
    solve();
    cout << endl;
  //}

  return 0;
}

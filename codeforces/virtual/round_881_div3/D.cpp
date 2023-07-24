#include <bits/stdc++.h>

using namespace std;
using ll = long long;

ll verts(map<int, vector<int>> &tree, int v) {
  if ((int)tree[v].size() == 0) return 1;
  ll res = 0;
  for (int i = 0; i < (int)tree[v].size(); ++i) {
    res += verts(tree, tree[v][i]);
  }
  return res;
}

ll populate(map<int, pair<int, vector<int>>> &tree, map<int, set<int>> &tmp, int v) {
  if (tmp[v].empty()) {
    tree[v] = make_pair(1, vector<int>(0));
    return 1;
  }
  ll res = 0;
  tree[v] = make_pair(0, vector<int>(0));
  for (int i : tmp[v]) {
    tmp[i].erase(v);
    tree[v].second.push_back(i);
    res += populate(tree, tmp, i);
  }
  tree[v].first = res;
  return res;
}

void solve(void) {
  int n;
  cin >> n;
  map<int, pair<int, vector<int>>> tree;
  map<int, set<int>> tmp;
  for (int i = 0; i < n - 1; ++i) {
    int a, b;
    cin >> a >> b;
    tmp[a].insert(b);
    tmp[b].insert(a);
  }
  populate(tree, tmp, 1);
  int q;
  cin >> q;
  for (int i = 0; i < q; ++i) {
    int a, b;
    cin >> a >> b;
    ll va = tree[a].first;
    ll vb = tree[b].first;
    cout << va * vb << endl;
  }
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
  }

  return 0;
}

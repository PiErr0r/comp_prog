/**
 * Shamelessly stolen from Errichto 
 *  https://github.com/Errichto/youtube/blob/master/atcoder-dp/g.cpp
 *  https://www.youtube.com/c/Errichto/featured
  */


#include "bits/stdc++.h"
using namespace std;
#define sim template < class c
#define ris return * this
#define dor > debug & operator <<
#define eni(x) sim > typename \
  enable_if<sizeof dud<c>(0) x 1, debug&>::type operator<<(c i) {
sim > struct rge { c b, e; };
sim > rge<c> range(c i, c j) { return rge<c>{i, j}; }
sim > auto dud(c* x) -> decltype(cerr << *x, 0);
sim > char dud(...);
struct debug {
#ifdef LOCAL
~debug() { cerr << endl; }
eni(!=) cerr << boolalpha << i; ris; }
eni(==) ris << range(begin(i), end(i)); }
sim, class b dor(pair < b, c > d) {
  ris << "(" << d.first << ", " << d.second << ")";
}
sim dor(rge<c> d) {
  *this << "[";
  for (auto it = d.b; it != d.e; ++it)
    *this << ", " + 2 * (it == d.b) << *it;
  ris << "]";
}
#else
sim dor(const c&) { ris; }
#endif
};
#define imie(...) " [" << #__VA_ARGS__ ": " << (__VA_ARGS__) << "] "

using ll = long long;

typedef struct {
  bool visited;
  int w;
  vector<int> children;
} node;

int bfs(vector<node> &n, int nd) {
  if (n[nd].visited) return 0;
  n[nd].visited = true;
  if (n[nd].children.empty() || (int)n[nd].children.size() == 1) {
    return n[nd].w;
  }
  int mx = 0;
  for (int i = 0; i < (int)n[nd].children.size(); ++i) {
    int curr = n[nd].children[i];
    int tmp = bfs(n, curr);
    mx = max(mx, tmp);
  }
  return mx + n[nd].w;
}

void solve(void) {
  int n;
  cin >> n;
  vector<node> nodes(n);
  for (auto &i : nodes) {
    cin >> i.w;
    i.visited = false;
  }
  for (int i = 0; i < n - 1; ++i) {
    int a, b;
    cin >> a >> b;
    nodes[a - 1].children.push_back(b - 1);
    nodes[b - 1].children.push_back(a - 1);
  }
  nodes[0].visited = true;

  vector<int> leaves;
  for (int i = 0; i < (int)nodes[0].children.size(); ++i) {
    leaves.push_back(bfs(nodes, nodes[0].children[i]));
  }
  sort(leaves.begin(), leaves.end(), [](int a, int b) { return a > b; });

  if (nodes[0].children.empty()) {
    cout << nodes[0].w;
  } else if ((int)nodes[0].children.size() == 1) {
    cout << leaves[0] + nodes[0].w;
  } else {
    cout << (leaves[0] + leaves[1] + nodes[0].w);
  }
}

int main(void) {
  cin.tie(0)->sync_with_stdio(0);

  int T;
  cin >> T;

  for (int i = 1; i <= T; ++i) {
    cout << "Case #" << i << ": ";
    solve();
    cout << endl;
  }

  return 0;
}

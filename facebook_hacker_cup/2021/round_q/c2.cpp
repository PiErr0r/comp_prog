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
  ll w;
  vector<int> children;
} node;

ll bfs(vector<node> &n, int nd, vector<ll> &extra) {
  if (n[nd].visited) return 0;
  n[nd].visited = true;
  if (n[nd].children.empty() || (int)n[nd].children.size() == 1) {
    return n[nd].w;
  }
  ll mx = 0;
  for (int i = 0; i < (int)n[nd].children.size(); ++i) {
    int curr = n[nd].children[i];
    ll tmp = bfs(n, curr, extra);
    if (tmp > mx) {
      mx = tmp;
      extra.push_back(mx);
    } else {
      extra.push_back(tmp);
    }
  }
  return mx + n[nd].w;
}

ll solve_every(vector<node> nodes, int n, int k, bool do_return);
void solve(void) {
  int n, k;
  cin >> n >> k;
  vector<node> nodes(n);
  for (auto &i : nodes) {
    cin >> i.w;
    i.visited = false;
  }
  for (int i = 0; i < n - 1; ++i) {
    int a, b;
    cin >> a >> b;
    --a; --b;
    nodes[a].children.push_back(b);
    nodes[b].children.push_back(a);
  }
  nodes[0].visited = true;

  ll res_original = solve_every(nodes, 0, k, true);
  ll res = 0;
  ll zero = nodes[0].w;
  nodes[0].w = 0;
  nodes[0].visited = false;
  for (int i = 1; i < n; ++i) {
    ll tmp = solve_every(nodes, i, k - 1, false);
    // cout << i << " " << tmp << endl;
    res = max(res, tmp);
  }

  cout << max(res_original, res + zero);
}

ll solve_every(vector<node> nodes, int n, int k, bool do_return) {
  nodes[n].visited = true;
  if (k < 0) return 0;
  vector<ll> leaves, extra;
  for (int i = 0; i < (int)nodes[n].children.size(); ++i) {
    leaves.push_back(bfs(nodes, nodes[n].children[i], extra));
  }
  sort(leaves.begin(), leaves.end(), [](int a, int b) { return a > b; });
  sort(extra.begin(), extra.end(), [](int a, int b) { return a > b; });

  if (nodes[n].children.empty() || k == 0 && !do_return) {
    return nodes[0].w;
  } else if (k == 1 && !do_return) {
    if ((int)nodes[n].children.size() == 1) {
      return leaves[0] + nodes[n].w;
    } else {
      return (leaves[0] + leaves[1] + nodes[n].w);
    }
  } else {
    ll res = nodes[n].w;
    for (int i = 0; k > 0 && i < (int)leaves.size() - 1; i += 2, --k) {
      res += leaves[i] + leaves[i + 1];
    }
    if (k == 0 && !do_return) {
      return res;
    } else {
      if ((int)leaves.size() & 1) {
        res += leaves[(int)leaves.size() - 1];
      }
      int tmp = do_return ? 1 : 0;
      for (int i = 0; k > tmp && i < (int)extra.size(); ++i, --k) {
        res += extra[i];
      }
      return res;
    }
  }
}

int main(void) {
  cin.tie(0)->sync_with_stdio(0);

  int T;
  cin >> T;
  // this was a brave attempt but unfortunately not a correct one
  // the sole idea is fine
  // but implementation fails somewhere...

  for (int i = 1; i <= T; ++i) {
    cout << "Case #" << i << ": ";
    solve();
    cout << endl;
  }

  return 0;
}

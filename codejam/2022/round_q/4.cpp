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

const int mod = 1'000'000'007;

using ll = long long;

struct Node {
  ll fun;
  int num = 0;
  Node* parent;
  vector<Node*> children;
  ll maxi = 0;
};

Node* find_node(Node* root, int num) {
  for (int i = 0; i < (int)root->children.size(); ++i) {
    if (root->children[i]->num == num) {
      return root->children[i];
    } else {
      Node* tmp = find_node(root->children[i], num);
      if (tmp != NULL) {
        return tmp;
      }
    }
  }
  return NULL;
}

void update_maxi(Node* n) {
  ll maxi = n->maxi;
  while (n->num != 0) {
    n->maxi = max(maxi, n->maxi);
    n = n->parent;
  }
}

ll sum_children(Node* n, bool is_min) {
//  cout << "NOW: " << n->num << endl;
  if ((int)n->children.size() == 0) {
    return is_min ? 0 : n->fun;
  } else if ((int)n->children.size() == 1) {
    return sum_children(n->children[0], is_min);
  }

  ll res = 0;
  ll mini = 1e9+1;
  int i_mini = 0;
  for (int i = 0; i < (int)n->children.size(); ++i) {
    if (n->children[i]->maxi < mini) {
      mini = n->children[i]->maxi;
      i_mini = i;
    }
  }

  ll r_mini = 1e18+1;
  for (int i = 0; i < (int)n->children.size(); ++i) {
    if (n->children[i]->maxi == mini) {
      ll tmp = sum_children(n->children[i], true);
      if (tmp < r_mini) {
        r_mini = tmp;
        i_mini = i;
      }
    }
  }
  for (int i = 0; i < (int)n->children.size(); ++i) {
    res += sum_children(n->children[i], i_mini == i);
  }
 // n->maxi = max(n->children[i_mini]->maxi, n->fun);
//  cout << "RES: " << res << " RET:" << (is_min ? 0 : n->maxi) + res << endl;
  ll mx = max(n->fun, n->children[i_mini]->maxi);
  return (is_min ? 0 : mx) + res;
}

void create_maxi(Node* n) {
  if ((int)n->children.size() == 0) {
    n->maxi = n->fun;
    return;
  }
  ll mx = n->fun;
  for (int i = 0; i < (int)n->children.size(); ++i) {
    create_maxi(n->children[i]);
    mx = max(mx, n->children[i]->maxi);
  }
  n->maxi = mx;
}

void solve(void) {
  int n;
  cin >> n;
  vector<ll> F(n);
  for (auto &a : F)
    cin >> a;

  Node* root = new Node();
  Node* tmp;
  int P;
  for (int i = 0; i < n; ++i) {
    Node* newNode = new Node();
    newNode->num = i + 1;
    newNode->fun = F[i];
    newNode->maxi = F[i];
    cin >> P;
    if (P == 0) {
      root->children.push_back(newNode);
      newNode->parent = root;
    } else {
      tmp = find_node(root, P);
      tmp->children.push_back(newNode);
      newNode->parent = tmp;
    }
    //update_maxi(newNode);
  }

  create_maxi(root);

  ll res = 0;
  for (int i = 0; i < (int)root->children.size(); ++i) {
    res += sum_children(root->children[i], false);
  }
  cout << res;
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

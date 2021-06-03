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

struct Node {
  int value;
  int cnt = 0;
  struct Node* L = NULL;
  struct Node* R = NULL;
};

struct Node* new_node(int value) {
  struct Node* node = new struct Node();

  node->value = value;    // Assign data to this node

  // Initialize left and right children as NULL
  node->L = NULL;
  node->R = NULL;
  node->cnt = 1;
  return(node);
}

void insert(Node* t, int value) {
  if (value == t-> value) {
    t->cnt++;
  } else if (value < t->value) {
    if (t->L == NULL) {
      t->L = new_node(value);
    } else {
      insert(t->L, value);
    }
  } else {
    if (t->R == NULL) {
      t->R = new_node(value);
    } else {
      insert(t->R, value);
    }
  }
}

struct Node* get_price(Node* t, int mx_price) {
  if (t == NULL || t->cnt == 0) {
    return NULL;
  }
  if (t->value == mx_price) {
    return t;
  } else if (t->value > mx_price) {
    return get_price(t->L, mx_price);
  } else {
    Node* curr = get_price(t->R, mx_price);
    return curr == NULL || curr->cnt == 0 ? (t->cnt == 0 ? NULL : t) : curr;
  }
  return NULL;
}

void rm_node(Node *t) {
  if (t->cnt > 0) {
    t->cnt--;
  }
  if (t->cnt) {
    return;
  }
  if (t->L == NULL && t->R == NULL) {
    t = NULL;
    delete t;
    return;
  }

  if (t->L != NULL) {
    t->value = t->L->value;
    t->cnt = t->L->cnt;
    rm_node(t->L);
  } else {
    t->value = t->R->value;
    t->cnt = t->R->cnt;
    rm_node(t->R);
  }
}

void print_tree(Node *t) {
  if (t == NULL) {
    return;
  }

  cout << ((t->L == NULL && t->R == NULL) ? "LEAF " : "") << t->value << " cnt: " << t->cnt << endl;
  print_tree(t->L);
  print_tree(t->R);
}

int main(void) {
  cin.tie(0)->sync_with_stdio(0);
  int n, m;
  int tmp;
  cin >> n >> m;
  cin >> tmp;
  struct Node* root = new_node(tmp);
  for (int i = 0; i < n-1; ++i) {
    cin >> tmp;
    insert(root, tmp);
  }
 // print_tree(root);

  int c;
  Node* node;
  for (int i = 0; i < m; ++i) {
    cin >> c;
    node = get_price(root, c);
    if (node == NULL) {
      cout << -1 << endl;
    } else {
      cout << node->value << endl;
      rm_node(node);
    }
//    print_tree(root);
  }

  return 0;
}

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

/*
 *
 *  REWRITE THIS WITH A REAL TREE AND NOT WITH A VECTOR
 *
 *
 */

int find_price(vector<int>& a, int p) {
  int L = 0, R = a.size() - 1;
  int i = -1, mid;
  while (L <= R) {
    mid = L + (R - L) / 2;
    if (a[mid] > p) {
      R = mid - 1;
    } else {
      i = mid;
      L = mid + 1;
    }
  }
  return i;
}

int my_pow2(int n) {
  int res = 1;
  while (n) {
    res <<= 1;
    n >>= 1;
  }
  return res;
}

int left(int n) { return (n << 1) + 1; }
int right(int n) { return (n << 1) + 2; }
int parent(int n) { return n >> 1; }

void insert(vector<int> &t, int i, int n) {
  if (t[i] == 0) {
    t[i] = n;
  } else if (n < t[i]) {
    insert(t, left(i), n);
  } else {
    insert(t, right(i), n);
  }
}

int find_leftmost_leaf(vector<int> &t, int i) {
  while (t[i]) {
    i = left(i);
  }
  return parent(i);
}


void remove(vector<int> &t, int i) {
  int tmp = left(i);
  while (t[tmp]) {
    t[i] = t[tmp];
    i = tmp;
    tmp = left(tmp);
    debug() << imie(tmp);
  }
  t[i] = 0;
}

int get_price(vector<int> &t, int c) {
  int i = 0;
  while (t[i]) {
    if (t[i] <= c) {
      return i;
    } else {
      i = right(i);
    }
  }
  return -1;
}

int main(void) {
  cin.tie(0)->sync_with_stdio(0);
  int n, m;
  cin >> n >> m;
  int p = my_pow2(n);
  vector<int> tree(p);
  int tmp;
  for (int i = 0; i < n; ++i) {
    cin >> tmp;
    insert(tree, 0, tmp);
  }

  int c, index;
  for (int i = 0; i < m; ++i) {
    cin >> c;
    index = get_price(tree, c);
    if (index == -1) {
      cout << -1 << endl;
    } else {
      cout << tree[index] << endl;
      remove(tree, index);
    }
  }

  return 0;
}

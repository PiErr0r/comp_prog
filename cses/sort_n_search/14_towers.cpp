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

const int mod = 1000000007;
template <typename T>
T m_add(T a, T b){ return (a+b)%mod; }
template <typename T>
T m_sub(T a, T b){ return ((a-b)%mod+mod)%mod; }
template <typename T>
T m_mul(T a, T b){ return (a*b)%mod; }

using ll = long long;

typedef struct Node {
    Node* l;
    Node* r;
    int value;
    int size;
} Node;

Node* find_min_diff(Node* T, int m) {
    if (T == NULL) return NULL;
    if (m >= T->value) return find_min_diff(T->r, m);
    Node* child = find_min_diff(T->l, m);
    if (child == NULL) return T;
    //cout << (child->value - m < T->value - m ? child->value : T->value) << " " << child->value - m << " " << T->value - m << endl;
    return child->value - m <= T->value - m ? child : T;
}
bool go_left = true;
void add_new_node(Node* T, int m) {
    if (m > T->value) {
        if (T->r == NULL) {
            T->r = (Node*)malloc(sizeof(Node));
            T->r->l = NULL;
            T->r->r = NULL;
            T->r->value = m;
            T->r->size = 1;
            return;
        }
        add_new_node(T->r, m);
    } else if (m < T->value) {
        if (T->l == NULL) {
            T->l = (Node*)malloc(sizeof(Node));
            T->l->l = NULL;
            T->l->r = NULL;
            T->l->value = m;
            T->l->size = 1;
            return;
        }
        add_new_node(T->l, m);
    } else {
        ++T->size;
    }
}

int tree_size(Node* T) {
    if (T == NULL) return 0;
    return T->size + tree_size(T->l) + tree_size(T->r);
}

void delete_tree(Node* T) {
    if (T == NULL) return;
    delete_tree(T->l);
    delete_tree(T->r);
    free(T);
}

void solve_slow(void) {
    int n;
    cin >> n;
    Node* T = (Node*)malloc(sizeof(Node));
    //T->value = -1;
    T->value = 500000000;
    T->r = NULL;
    T->l = NULL;
    T->size = 0;
    for (int i = 0; i < n; ++i) {
        int m;
        cin >> m;
        if (T->value == -1) {
            T->value = m;
            ++T->size;
            continue;
        }
        Node* t = find_min_diff(T, m);
        //cout << (t == NULL ? "Add new" : "is good") << " " << m << endl;
        if (t == NULL) {
            add_new_node(T, m);
        } else {
            if (t->size > 1) {
                --t->size;
                add_new_node(t, m);
            } else {
                t->value = m;
            }
        }
    }

    cout << tree_size(T) << endl;
    delete_tree(T);
}

void solve(void) {
    int n;
    cin >> n;
    multiset<int> T;
    int m;
    for (int i = 0; i < n; ++i) {
        cin >> m;
        auto p = T.upper_bound(m);
        if (p != T.end()) {
            T.erase(p);
        }
        T.insert(m);
    }
    cout << T.size() << endl;
}

int main(void) {
  cin.tie(0)->sync_with_stdio(0);

  solve();

  return 0;
}

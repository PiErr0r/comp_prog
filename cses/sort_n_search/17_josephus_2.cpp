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

typedef struct List {
    List* next;
    int value;
} List;

List* new_list(int n) {
    List* H = (List*)malloc(sizeof(List));
    H->value = 1;
    List* L = H;
    for (int i = 2; i <= n; ++i) {
        List* N = (List*)malloc(sizeof(List));
        L->next = N;
        L = N;
        L->value = i;
    }
    L->next = H;
    return H;
}

List* delete_node(List* L, int n, int l) {
    if (l == 0)  {
        cout << L->value;
        free(L);
        return NULL;
    }
    for (int i = 0; i < n - 1; ++i) {
        L = L->next;
    }
    List* tmp = L->next->next;
    List* tmp_del = L->next;
    cout << L->next->value << " ";
    L->next = tmp;
    free(tmp_del);
    //cout << "! " << tmp->value << endl;
    return tmp;
}

void solve_old(void) {
    int n, k;
    cin >> n >> k;
    List* L = new_list(n);
    while (n > 1) {
        //cout << "HERE " << n << " " << k << " " << k%n << " " << L->value << endl;
        L = delete_node(L, k > n ? k % n : k, n);
        //L = L->next;
        --n;
    }
    delete_node(L, 0, 0);
    cout << endl;
}

void solve_old2(void) {
    int n, k;
    cin >> n >> k;
    vector<int> nums(n);
    for (int i = 0; i < n; ++i) nums[i] = i + 1;
    int i = 0, cnt = 0;
    while ((int)nums.size() > 0) {
        // cout << cnt % 1000 << endl;
        if (cnt % 1000 == 0) {
            cout << cnt << endl; 
        }
        i = (i + k) % (int)nums.size();
        //cout << nums[i] << " ";
        nums.erase(nums.begin() + i);
        ++cnt;
    }
    cout << endl;
}

void solve(void) {
    int n, k;
    cin >> n >> k;
    int i = 1, ans = 0;
    while (i <= n) {
        ans = (ans + k + 1) % i;
        cout << ans << " ";
        ++i;
    }
    cout << ans << endl;
}

int main(void) {
  cin.tie(0)->sync_with_stdio(0);

  solve();

  return 0;
}

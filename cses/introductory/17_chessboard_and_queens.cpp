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

int gd1(int r, int c) {
    return r + c;
}

int gd2(int r, int c) {
    return (7 - r) + c;
}

bool can_place(int r, int c, vector<bool> &col, vector<bool> &diag1, vector<bool> &diag2, vector<vector<char>> &board) {
    if (board[r][c] == '*') return false;
    if (col[c]) return false;
    if (diag1[gd1(r, c)]) return false;
    if (diag2[gd2(r, c)]) return false;
    return true;
}

void solve(void) {
    vector<vector<char>> board(8, vector<char>(8));
    int num = 0;
    vector<int> row2col(8, -1);
    vector<bool> diag1(15, false), diag2(15, false), col(8, false);
    for (int i = 0; i < 8; ++i) {
        string s;
        cin >> s;
        for (int j = 0; j < 8; ++j) {
            board[i][j] = s[j];
        }
    }
    int r = 0;
    while (true) {
        int c = row2col[r] + 1;
        int cc = row2col[r];
        while (c < 8 && !can_place(r, c, col, diag1, diag2, board))  ++c;
        if (cc != -1) {
            col[cc] = false;
            diag1[gd1(r, cc)] = false;
            diag2[gd2(r, cc)] = false;
            row2col[r] = -1;
        }
        if (c == 8) {
            --r;
        } else {
            col[c] = true;
            diag1[gd1(r, c)] = true;
            diag2[gd2(r, c)] = true;
            row2col[r] = c;
            ++r;
        }

        if (r == 8) {
            ++num;
            --r;
        } else if (r == -1) {
            break;
        }
    }
    cout << num << endl;
}

int main(void) {
  cin.tie(0)->sync_with_stdio(0);
  solve();

  return 0;
}

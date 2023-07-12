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

bool in_bounds(int x, int y) {
    return x >= 0 && x < 7 && y >= 0 && y < 7;
}

int man_dist(int x1, int y1, int x2, int y2) {
    return abs(x2 - x1) + abs(y2 - y1);
}

int calc_paths(int x, int y, int curr, string &path, vector<vector<bool>> &grid) {
    if (y == 6 && x == 0) {
        return curr == (int)path.length() ? 1 : 0;
    }
    if (curr == (int)path.length())
        return 0;
    if (man_dist(x, y, 0, 6) > (int)path.length() - curr)
        return 0;
    int num = 0;
    if (curr < (int)path.length() && (path[curr] == '?' || path[curr] == 'R') && in_bounds(x + 1, y) && !grid[y][x + 1]) {
        grid[y][x + 1] = true;
        num += calc_paths(x + 1, y, curr + 1, path, grid);
        grid[y][x + 1] = false;
    }
    if (curr == 10) cout << "HERE" << endl;
    if (curr < (int)path.length() && (path[curr] == '?' || path[curr] == 'L') && in_bounds(x - 1, y) && !grid[y][x - 1]) {
        grid[y][x - 1] = true;
        num += calc_paths(x - 1, y, curr + 1, path, grid);
        grid[y][x - 1] = false;
    }
    if (curr < (int)path.length() && (path[curr] == '?' || path[curr] == 'U') && in_bounds(x, y - 1) && !grid[y - 1][x]) {
        grid[y - 1][x] = true;
        num += calc_paths(x, y - 1, curr + 1, path, grid);
        grid[y - 1][x] = false;
    }
    if (curr < (int)path.length() && (path[curr] == '?' || path[curr] == 'D') && in_bounds(x, y + 1) && !grid[y + 1][x]) {
        grid[y + 1][x] = true;
        num += calc_paths(x, y + 1, curr + 1, path, grid);
        grid[y + 1][x] = false;
    }

    return num;
}

void solve(void) {
    string path;
    cin >> path;
    vector<vector<bool>> grid(7, vector<bool>(7, false));
    grid[0][0] = true;
    int num = calc_paths(0, 0, 0, path, grid);
    cout << "!"  << num << endl;
}

int main(void) {
  cin.tie(0)->sync_with_stdio(0);

  solve();

  return 0;
}

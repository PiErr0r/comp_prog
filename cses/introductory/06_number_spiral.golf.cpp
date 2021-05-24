#include <bits/stdc++.h>
using namespace std;typedef long long ll;int main(void){cin.tie(0)->sync_with_stdio(0);int t;cin>>t;ll x,y,d,m,f;while(t--){cin>>y>>x;m=max(x,y);f=y-x;d=m*(m-1)+1;d+=(m&1)?-f:f;cout<<d<<endl;}return 0;}


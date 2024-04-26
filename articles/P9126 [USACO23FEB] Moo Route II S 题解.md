你说的对，但是我输入顺序看错了调了好久。

考虑类似最短路处理，用 $D_i$ 表示 $1\rightsquigarrow i$ 的最短路长度估计。

首先有结论，每条边只会松弛一次。下面给出证明：

- 对于一条边 $(u,v)$，若可以松弛则 $D_v>d$，而由于题目的特殊之处，松弛后 $D_v\leftarrow d$，与 $D_u$ 无关，而 $D_u$ 仅会不断变小，因此可以不断松弛，但效果不变，因此只松弛一次即可。

接下来，类似已死的 SPFA，我们用队列维护更新。对于 $k$ 的出边，若可以更新 $(k,d)$，则显然有出发时间不早于最短路长度与停泊时间之和，即 $r>D_k+a_k$，此时松弛入队后删边即可。另外注意特判 $k=1$ 时无需等待停泊时间。

时间复杂度 $O(n\log n+m)$。

---

```cpp
#include <bits/stdc++.h>
using namespace std;
#define int long long
const int N = 2e5 + 5, INF = 1e18;
int n, m, d[N], a[N];
struct Edge {
    int s, e, v;
};
bool operator<(Edge x, Edge y) {
    return x.s < y.s;
}
vector<Edge> g[N];
void search(int s) {
    for(int i = 1; i <= n; i++) d[i] = INF;
    d[1] = 0;
    queue<int> q;
    q.push(s);
    while(!q.empty()) {
        int k = q.front(); q.pop();
        // cout<<"k = "<<k<<endl;
        while(!g[k].empty() && (g[k].back().s >= d[k] + a[k] || k == 1)) {
            auto i = g[k].back();
            g[k].pop_back();
            // cout<<"s = "<<i.s<<", v = "<<i.v<<", e = "<<i.e<<", d = "<<d[i.v]<<endl;
            if(d[i.v] > i.e) {
                d[i.v] = i.e;
                q.push(i.v);
            }
        }
    }
}
signed main() {
    cin>>n>>m;
    for(int i = 1; i <= m; i++) {
        int c, r, d, s; cin>>c>>r>>d>>s;
        g[c].push_back({r, s, d});
    }
    for(int i = 1; i <= n; i++) cin>>a[i];
    for(int i = 1; i <= n; i++) sort(g[i].begin(), g[i].end());
    search(1);
    for(int i = 1; i <= n; i++) 
        if(d[i] != INF) cout<<d[i]<<endl;
        else cout<<-1<<endl;
}
```
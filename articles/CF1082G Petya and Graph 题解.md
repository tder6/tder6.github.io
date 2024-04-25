问题可以转化成：

- 选第 $i$ 个点的贡献为 $-a_i$；
- 同时选第 $u_i$ 和 $v_i$ 个点的贡献为 $w_i$。

由于每个点只有选或不选两种状态，并且可以有贪心结论：若同时选了第 $u_i$ 和 $v_i$ 个点，则必定会选两点之间的边 $w_i$，这是由于数据范围保证 $w_i\ge1$。那么，不难想到最小割模型：

- $s$ 为源点，若 $s$ 与 $i$ 可达，则称 $i$ 被选；
- $t$ 为汇点，若 $t$ 与 $i$ 可达，则称 $i$ 不被选。

对于最小割模型，我们通常需要将贡献转化为代价。在本题中，我们可以先计算出「理想状态」下的最大答案，即为 $\text{ans}_0=\sum w_i-0=\sum w_i$。注意，这里的「理想状态」并不可能真实存在。

那么，问题轻松的转化为了：

- 选第 $i$ 个点的代价为 $a_i$；
- 不同时选第 $u_i$ 和 $v_i$ 个点的代价为 $w_i$。

我们记此时的总代价为 $\text{sum}$，则我们希望 $\text{ans}=\text{ans}_0-\text{sum}$ 尽可能大，即希望 $\text{sum}$ 尽可能小，于是可以用最小割解决。

接下来考虑建图即可。

首先对于第 $i$ 个点，选择它的代价为 $a_i$，那么我们连一条 $i\to t$ 的容量为 $a_i$ 的边。如果要选他，根据定义， $i$ 与 $s$ 可达，而不与 $t$ 可达，因此需要割掉这条边，有代价 $a_i$。

而后较难的是第二种情况，若 $u_i$ 和 $v_i$ 不同时选有三种可能性：

- $u_i$ 与 $s$ 不可达，但 $v_i$ 与 $s$ 可达；
- $v_i$ 与 $s$ 不可达，但 $u_i$ 与 $s$ 可达；
- $u_i$ 和 $v_i$ 均与 $s$ 不可达。

针对上述可能性，我们单纯建 $s\to u_i$ 和 $s\to v_i$ 的容量为 $w_i$ 的边并不可取，因为对于第三种可能性此时的代价变为了 $w_i+w_i=2\times w_i$，与题意不符。我们考虑新建一个点 $d$，连 $d\to u_i$、$d\to v_i$ 和 $s\to d$ 三条边，容量均为 $w_i$。如下图所示，其中 $u_i=1$ 且 $v_i=2$：

![](https://cdn.luogu.com.cn/upload/image_hosting/lq57ut3d.png)

如此一来，三种可能性分别对应着：

- 割 $d\to u_i$ 的边；
- 割 $d\to v_i$ 的边；
- 割 $s\to d$ 的边。

且代价均为 $w_i$。

于是跑最小割模型得出 $\text{sum}$，再计算 $\text{ans}=\text{ans}_0-\text{sum}$ 即可。

---

```cpp
#include <bits/stdc++.h>
using namespace std;
#define int long long
const int N = 1e6 + 5, M = 3e3 + 5, INF = 1e18;
namespace Dinic {
    int n, s, t, cnt = 1, h[N], d[N], v[N], f[N];
    struct Node {
        int v, w, h;
    } e[N];
    void make(int u, int v, int w = 1) {
        e[++cnt] = {v, w, h[u]}; h[u] = cnt;
        e[++cnt] = {u, 0, h[v]}; h[v] = cnt;
    }
    bool bfs() {
        for(int i = 1; i <= n; i++) d[i] = INF;
        queue<int> q;
        q.push(s); d[s] = 0; f[s] = h[s];
        while(!q.empty()) {
            int x = q.front(); q.pop();
            for(int i = h[x]; i; i = e[i].h) {
                int p = e[i].v;
                if(e[i].w > 0 && d[p] == INF) {
                    q.push(p);
                    d[p] = d[x] + 1; f[p] = h[p];
                    if(p == t) return 1;
                }
            }
        }
        return 0;
    }
    int dfs(int x, int l) {
        if(x == t) return l;
        int k, r = 0;
        for(int i = f[x]; i && l; i = e[i].h) {
            f[x] = i;
            int p = e[i].v;
            if(e[i].w > 0 && d[p] == d[x] + 1) {
                k = dfs(p, min(l, e[i].w));
                if(!k) d[p] = INF;
                e[i].w -= k; e[i ^ 1].w += k;
                r += k, l -= k;
            }
        }
        return r;
    }
    void init(int nn, int ss, int tt) {
        n = nn, s = ss, t = tt;
        cnt = 1;
        memset(h, 0, sizeof(h)); memset(d, 0, sizeof(d)); memset(v, 0, sizeof(v)), memset(f, 0, sizeof(f));
    }
    int dinic() {
        int ans = 0;
        while(bfs()) {
            int x;
            while((x = dfs(s, INF))) ans += x;
        }
        return ans;
    }
}
int n, m, ans;
signed main() {
    cin>>n>>m; int cnt = n + 2;
    Dinic::init(n, n + 1, n + 2);
    for(int i = 1; i <= n; i++) {
        int x; cin>>x;
        Dinic::make(i, n + 2, x);
    }
    for(int i = 1; i <= m; i++) {
        int u, v, w; cin>>u>>v>>w;
        cnt++; ans += w;
        Dinic::make(n + 1, cnt, w);
        Dinic::make(cnt, u, w);
        Dinic::make(cnt, v, w);
    }
    // cout<<"cnt = "<<cnt<<endl;
    Dinic::n = cnt; 
    cout<<ans - Dinic::dinic()<<endl;
}
```
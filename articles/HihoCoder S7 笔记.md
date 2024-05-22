## HihoCoder S7 I

**【参考书】**

- 《算法导论》- CLRS
- 《算法竞赛进阶指南》- 李煜东

**【图论】**

图论，即离散数学的分支，称为 Graph Theory。

**【单源最短路】**

单源最短路，又称 SSSP，即 Single Source Shortest Path。

宽搜可以解决的问题类型：

- 各边边权相等；
- 各边边权为 $0$ 或 $1$。

有结论，如果 $p=\{v_0,v_1,\cdots,v_k\}$ 是一条从 $v_0$ 到 $v_k$ 的最短路，那么对于任意 $0\le i\le j\le k$，$p_{i,j}=\{v_i,v_{i+1},\cdots,v_j\}$ 是从 $v_i$  到 $v_j$ 的一条最短路，可以用反证法证明。

我们对于每个顶点 $v$ 维护 $2$ 个属性，其中 $d_v$ 表示当前最短路的长度，而 $p_v$ 表示最短路中 $v$ 的前驱。

```
INIT(G, s):
    For each v in V:
        v.d = INF
        v.p = NIL
    s.d = 0
```

松弛操作会施放在一条边上，设这条边是 $(u,v)$，权值是 $w$。松弛操作会尝试用 $d_u+w$ 更新 $d_v$ 和 $p_v$。具体的，如果 $s\rightsquigarrow u\to v$ 比目前已知 $s\rightsquigarrow v$ 权值更小的话就更新 $d_v$ 和 $p_v$。

```
RELAX(u, v, w):
    If v.d > u.d + w:
        v.d = u.d + w
        v.p = u
```

三角不等式，即对于任意边 $(u,v)$，均有 $\delta(s,v)\le\delta(s,u)+w(u,v)$。

上界性质，即对于所有点 $v$，均有 $v.d\ge\delta(s,v)$。

路径松弛性质，即若 $p=\{v_0=s,v_1,\cdots,v_k=t\}$ 为 $s$ 到 $t$ 的一条最短路，则按顺序松弛 $(v_0,v_1)$、$(v_1,v_2)$、$\cdots$、$(v_{k-1},v_k)$ 后得到的 $d_t$ 一定为 $\delta(s,t)$。 

一旦所有的 $d_v$ 均为 $\delta(s,v)$，则所有的边 $(p_v,v)$ 组成了一棵最短路树。

**【Bellman-Ford 算法】**

Bellman-Ford 算法，即反复对所有边进行松弛操作，直到没有 $d_v$ 更新。时间复杂度 $O(|V|\cdot|E|)$。

```
Bellman-Ford(G, w, s):
    INIT(G, s)
    For i = 1 to |V| - 1:
        For each edge(u, v) in E:
            RELAX(u, v, w)
    For each edge(u, v) in E:
        If v.d > u.d + w(u, v):
            Return FALSE
    Return TRUE
```

```cpp
int n, m, d[N], p[N];
struct Edge {
    int u, v, w;
} e[N];
bool Bellman_Ford(int s) {
    for(int i = 1; i <= n; i++) d[i] = INF, p[i] = -1;
    d[s] = 0;
    for(int i = 1; i < n; i++)
        for(int j = 1; j <= m; j++) {
            int u = e[j].u, v = e[j].v, w = e[j].w;
            if(d[v] > d[u] + w) d[v] = d[u] + w, p[v] = u;
        } 
    for(int j = 1; j <= m; j++) {
        int u = e[j].u, v = e[j].v, w = e[j].w;
        if(d[v] > d[u] + w) return 0;
    }
    return 1;
}
```

特别的，在 DAG 上的最短路仅需按拓扑序对所有边松弛一遍即可。

**【Dijkstra 算法】**

Dijkstra 算法，即维护一个点集 $S$，每次将不在 $S$ 中的当前最短路的长度最小的点加入 $S$，并松弛其所有的出边。但是 Dijkstra 只适用于边权非负的情况。

```cpp
int n, m, d[N], p[N], v[N];
vector<pair<int, int>> g[N];
priority_queue<pair<int, int>, vector<pair<int, int>>, greater<pair<int, int>>> q;
void Dijkstra(int s) {
    for(int i = 1; i <= n; i++) d[i] = INF, p[i] = -1, v[i] = 0;
    d[s] = 0;
    q.push({d[s], s});
    while(!q.empty()) {
        int i = q.top().second;
        q.pop();
        if(v[i]) continue;
        v[i] = 1;
        for(auto j : g[i]) {
            int k = j.first, w = j.second;
            if(d[k] > d[i] + w) {
                d[k] = d[i] + w, p[k] = i;
                q.push({d[k], k});
            }
        }
    }
}
```

**【作业】**

[~~A06~~](http://hihocoder.openjudge.cn/2021falls7problems/A06/) & [~~A07~~](http://hihocoder.openjudge.cn/2021falls7problems/A07/) & [~~A10~~](http://hihocoder.openjudge.cn/2021falls7problems/A10/) & [~~A13~~](http://hihocoder.openjudge.cn/2021falls7problems/A13/)。

---

## HihoCoder S7 II

**【Floyd 算法】**

Floyd 算法基于动态规划思想。用 $D_{k,i,j}$ 表示经过若干个编号不超过 $k$ 的结点，从 $i$ 到 $j$ 的最短路权值。显然有 $D_{0,i,j}=w(i,j)$。

转移可以分为：

- 经过不超过编号 $k-1$ 的结点从 $i$ 到 $j$；
- $i$ 先到 $k$，$k$ 再到 $j$。

于是又转移方程 $D_{k,i,j}=\min(D_{k-1,i,j},D_{k-1,i,k}+D_{k-1,k,j})$。

与 01 背包类似，Floyd 可以忽略 $k$ 这一维，优化空间复杂度，即 $D_{i,j}=\min(D_{i,j},D_{i,k}+D_{k,j})$。

```cpp
int n, m, d[N][N];
vector<pair<int, int>> g[N];
void Floyd() {
    for(int i = 1; i <= n; i++) for(int j = 1; j <= n; j++) d[i][j] = INF;
    for(int i = 1; i <= n; i++) for(auto j : g[i]) d[i][j.first] = min(d[i][j.first], j.second);
    for(int i = 1; i <= n; i++) d[i][i] = 0;
    for(int k = 1; k <= n; k++) for(int i = 1; i <= n; i++) for(int j = 1; j <= n; j++)
        d[i][j] = min(d[i][j], d[i][k] + d[k][j]);
}
```

**【作业】**

[A11](http://hihocoder.openjudge.cn/2021falls7problems/A11/) & [~~A13~~](http://hihocoder.openjudge.cn/2021falls7problems/A13/) & [~~A14~~](http://hihocoder.openjudge.cn/2021falls7problems/A14/) & [A15](http://hihocoder.openjudge.cn/2021falls7problems/A15/)。

---

## HihoCoder S7 III

**【最小生成树】**

最小生成树，即 MST。

**【Prim 算法】**

时间复杂度 $O(n^2)$。

```cpp
int n, m, v[N], p[N], d[N];
vector<pair<int, int>> g[N];
int Prim(int s) {
    int ans = 0;
    for(int i = 1; i <= n; i++) d[i] = INF;
    d[s] = 0, p[s] = -1;
    for(int i = 1; i <= n; i++) {
        int k, mn = INF;
        for(int j = 1; j <= n; j++) if(!v[j] && d[j] < mn) {
            mn = d[j];
            k = j;
        }
        ans += mn;
        v[k] = 1;
        for(auto j : g[k]) if(!v[j.first] && j.second < d[j.first]) {
            d[j.first] = j.second;
            p[j.first] = k;
        }
    }
    return ans;
}
```

**【Kruskal 算法】**

时间复杂度 $O(m)$。

```cpp
int n, m, v[N], d[N], a[N];
vector<pair<pair<int, int>, int>> g, mst;
template<class Tp>
class Ufs {
    private:
        unordered_map<Tp, Tp> f;
        unordered_map<Tp, int> s;
        Tp root(Tp a) {
            if(f[a] == a) return a;
            f[a] = root(f[a]);
            return f[a];
        }
    public:
        void init(Tp *b, Tp *e) {
            int z = 0;
            for(Tp *i = b; i <= e; i++) f[*i] = *i;
        }
        bool same(Tp a, Tp b) {
            Tp p = root(a), q = root(b);
            return p == q;
        }
        void merge(Tp a, Tp b) {
            Tp p = root(a), q = root(b);
            if(p == q) return;
            if(s[p] > s[q]) swap(p, q);
            f[p] = q;
            s[q] += s[p];
        }
};
bool cmp(pair<pair<int, int>, int> x, pair<pair<int, int>, int> y) {
    return x.second < y.second;
}
int Kruskal(int s) {
    int ans = 0;
    Ufs<int> u;
    for(int i = 1; i <= n; i++) a[i] = i;
    u.init(a + 1, a + n + 1);
    sort(g.begin(), g.end(), cmp);
    for(auto i : g) {
        if(u.same(i.first.first, i.first.second)) continue;
        mst.push_back(i);
        ans += i.second;
        u.merge(i.first.first, i.first.second);
    }
    if(mst.size() == n - 1) return ans;
    else return -1;
}
```

**【作业】**

[B02](http://hihocoder.openjudge.cn/2021falls7problems/B02/) & [B03](http://hihocoder.openjudge.cn/2021falls7problems/B03/) & [B04](http://hihocoder.openjudge.cn/2021falls7problems/B04/) & [B06](http://hihocoder.openjudge.cn/2021falls7problems/B06/)。
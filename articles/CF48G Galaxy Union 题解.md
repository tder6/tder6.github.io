前面的题解对于实现讲的较为详细，这里主要补充一下思维层面。

---

约定：

- $\text{dis}(i,j)$ 表示从第 $i$ 个点到第 $j$ 个点的最短距离；
- $\text{LCA}(i,j)$ 表示从第 $i$ 个点和第 $j$ 个点的最近公共祖先；
- $\text{deep}(i)$ 表示第 $i$ 个点的深度，根的深度为 $0$；
- $\text{root}(i)$ 表示第 $i$ 个点所在子树的根；
- $\text{size}(i)$ 表示以第 $i$ 个点为根的子树的大小；
- 基环树的边权为 $1$。

本题我们希望求得每个点到其余所有点的最短距离之和，即对于 $1\le i\le n$，试求 $\sum_{1\le j\ne i\le n}\text{dis}(i,j)$。

题目给定 $n$ 点 $n$ 边的无向图，即一棵基环树，我们将他画成如下图所示的「仙人掌」形状：

![](https://cdn.luogu.com.cn/upload/image_hosting/rud14d0m.png)

一棵基环树的主体由一个环组成，且这个环上的每个点均有一棵子树。

我们先考虑对于在同一子树上的两点 $i,j$ 间的最短距离，一条显然的路径是 $i\rightsquigarrow\text{LCA}(i,j)\rightsquigarrow j$。特别的，一个点 $i$ 到 $\text{root}(i)$ 的最短距离为 $\text{deep}(i)$。

接下来考虑不在同一子树上的两个点的最短距离，如下图所示是从第 $1$ 个点到第 $2$ 个点的一条最短路径。

![](https://cdn.luogu.com.cn/upload/image_hosting/rm0bn8qc.png)

总结起来，第 $i$ 个点到第 $j$ 个点的最短路径为 $i\rightsquigarrow\text{root}(i)\rightsquigarrow\text{root}(j)\rightsquigarrow j$，其长度为 $\text{deep}(i)+\text{dis}(\text{root}(i),\text{root}(j))+\text{deep}(j)$。

那么，一个环上的子树 $t$ 对第 $k$ 个点的答案的贡献为：

$$
\left(\sum_{\text{root}(i)=t}\text{deep}(i)\right)+\text{size}(t)\times\left(\text{dis}(t,\text{root}(k))+\text{deep}(k)\right)
$$

于是，我们得到了本题的大体做法：

1. 找环；
2. 计算 $\text{size}(i)$ 和 $\text{deep}(t)$，以及 $\left(\sum_{\text{root}(i)=t}\text{deep}(i)\right)$；
3. 对于环上的两点 $u,v$，计算 $\text{dis}(u,v)$；
4. 统计答案。
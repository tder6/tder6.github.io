在数轴上有 $n$ 条线段 $[L,R]$，从中选取若干条组成 $c$，试最大化 $\displaystyle\sum_{i=1}^m\left[\left(\sum_{j\in c}\left[L_j\le i\le R_j\right]\right)\bmod2=1\right]$。保证对于 $1\le i\le m$ 都有 $\displaystyle\left(\sum_{j=1}^n\left[L_j\le i\le R_j\right]\right)\le k\le8$。

考虑状压 dp，分开处理左右端点 $\\{p_{n\times2}\\}$，按点的坐标排序。用 $f_{i,\text{msk}}$ 表示到第 $i$ 个端点当前覆盖的线段集为 $\text{msk}$ 的答案。

在转移时，分左右端点两种情况分开考虑，参考 [George1123 的题解](https://www.luogu.com.cn/article/rs5029y4)。

而最终的答案即为选完所有 $n\times2$ 个点且最终没有被任何线段覆盖的答案，即 $f_{n\times2,\varnothing}$。
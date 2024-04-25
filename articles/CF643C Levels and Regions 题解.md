这里主要讲一下思维部分，实现部分请参考 [P3195 [HNOI2008] 玩具装箱](https://www.luogu.com.cn/problem/P3195)。

---

约定：

- $\\text{sumt}\\_i=\\sum\\_{j=1}^it\\_j$；
- $t'\\_i=\\frac1{t'\\_i}$ 且 $\\text{sumt}'\\_i=\\sum\\_{j=1}^i{t'\\_j}$；
- $d\\_i=\\frac{\\text{sumt}\\_i}{t\\_i}=\\text{sumt}\\_i\\times t'\\_i$ 且 $\\text{sumd}\\_i=\\sum\\_{j=1}^id\\_j$。

对于第 $i$ 个关卡，有 $\\dfrac{t\\_i}{\\sum\\_{x=l\\_j}^{i}t\\_x}$ 的概率在 $1$ 小时内通过，即期望需要 $T\\_i=\\dfrac{\\sum\\_{x=l\\_j}^{i}t\\_x}{t\\_i}=\\dfrac{\\text{sumt}\\_i-\\text{sumt}\\_{l\\_j-1}}{t\\_i}$ 个小时通过。

对于第 $i$ 个级别，共需 $\\sum\\_{j=l\\_i}^{r\\_i}T\\_i$ 个小时通过。进行一些变换，有：

$$
\\begin{aligned}
\\sum\\_{j=l\\_i}^{r\\_i}T\\_i&=\\sum\\_{j=l\\_i}^{r\\_i}\\dfrac{\\text{sumt}\\_j-\\text{sumt}\\_{l\\_i-1}}{t\\_j} \\\\
    &=\\sum\\_{j=l\\_i}^{r\\_i}\\left(\\dfrac{\\text{sumt}\\_j}{t\\_j}-\\dfrac{\\text{sumt}\\_{l\\_i-1}}{t\\_j}\\right) \\\\
    &=\\left(\\sum\\_{j=l\\_i}^{r\\_i}\\dfrac{\\text{sumt}\\_j}{t\\_j}\\right)-\\left(\\sum\\_{j=l\\_i}^{r\\_i}\\dfrac{\\text{sumt}\\_{l\\_i-1}}{t\\_j}\\right) \\\\
    &=\\left(\\sum\\_{j=l\\_i}^{r\\_i}\\dfrac{\\text{sumt}\\_j}{t\\_j}\\right)-\\left(\\text{sumt}\\_{l\\_i-1}\\times\\sum\\_{j=l\\_i}^{r\\_i}\\dfrac{1}{t\\_j}\\right) \\\\
    &=\\left(\\sum\\_{j=l\\_i}^{r\\_i}d\\_j\\right)-\\left(\\text{sumt}\\_{l\\_i-1}\\times\\sum\\_{j=l\\_i}^{r\\_i}t'\\_j\\right) \\\\
    &=\\left(\\text{sumd}\\_{r\\_i}-\\text{sumd}\\_{l\\_i-1}\\right)-\\left(\\text{sumt}\\_{l\\_i-1}\\times\\left(\\text{sumt}'\\_{r\\_i}-\\text{sumt}'\\_{l\\_i-1}\\right)\\right)
\\end{aligned}
$$

用 $f\\_{i,j}$ 表示前 $j$ 关分为 $i$ 种难度的答案。那么，有：

$$
\\begin{aligned}
f\\_{i,j}&=\\min\\left(f\\_{i-1,k}+\\sum\\_{p=k+1}^{j}T\\_p\\right) \\\\
&=\\min\\left(f\\_{i-1,k}+\\left(\\text{sumd}\\_j-\\text{sumd}\\_k\\right)-\\left(\\text{sumt}\\_k\\times\\left(\\text{sumt}'\\_j-\\text{sumt}'\\_k\\right)\\right)\\right)
\\end{aligned}
$$

其中 $1\\le k<j$。

我们将其视为一个函数，套用斜率优化即可。
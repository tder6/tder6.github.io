这里是数据人题解。

---

其实本来有形式化题意，但是后来删了。

给定序列 $\{a_n\}$ 和常数 $p$，试求当 $\displaystyle\sum_{i=1}^n2|x-a_i|+p\times x$ 尽可能小时整数 $x$ 可取的最小值。

---

$\bf\textbf{Subtask}~1$

记 $f(x)=\displaystyle\sum_{i=1}^n2|x-a_i|+p\times x$，$g(x)=\displaystyle\sum_{i=1}^n2|x-a_i|$。

不难得出，若 $\{a_n\}$ 严格递增，当 $x<a_1$ 时，则 $f(x-1)-f(x)=2\times n-p$。那么，也就是说，当 $x<a_1$ 时 $\Delta x$ 与 $\Delta f(x)$ 成正比，函数图像为直线。有推论，若 $f(x-1)\le f(x)$，即 $2\times n-p\le0$，显然答案为 $-\infty$。

同理，若 $\{a_n\}$ 严格递增，当 $x>a_n$ 时，则 $f(x+1)-f(x)=2\times n+p$。那么，也就是说，当 $x>a_n$ 时 $\Delta x$ 与 $\Delta f(x)$ 成正比，函数图像为直线。有推论，若 $f(x+1)\le f(x)$，即 $2\times n+p<0$，显然答案为 $+\infty$。

分类讨论即可。

---

$\bf\textbf{Subtask}~3$

另有结论，若存在最小值，则 $x$ 必为 $a_i$ 之一，下面给出证明：

假设 $f(k)$ 为最小值，且 $k$ 不为 $a_i$ 之一，同时 $\min(a_i)<k<\max(a_i)$。此处令 $k<a_{\lfloor\frac{n+1}2\rfloor}$，反之同理。

- 若 $n$ 为奇数，设 $z$ 为区间 $(k,a_{\lfloor\frac n2\rfloor+1}]$ 中的 $a_i$ 的个数，令 $q=2\times z-1$；
- 若 $n$ 为偶数，设 $z$ 为区间 $(k,a_{\frac n2}]$ 中的 $a_i$ 的个数，令 $q=2\times z$。

那么，$f(k-1)=f(k)-p+4\times z$ 而 $f(k+1)=f(k)+p-4\times z$。由于 $f(k)$ 为最小值，$f(k-1)>f(k)$ 且 $f(k+1)\ge f(k)$，即 $f(k)-p+4\times z>f(k)$ 且 $f(k)+p-4\times z\ge f(k)$，故有 $-p+4\times z>0$ 且 $p-4\times z\ge 0$，显然矛盾。

综上便可得证。

于是枚举每个 $f(a_i)$ 取最小值即可。

时间复杂度 $O(T\times n^2)$。

---

$\bf\textbf{Subtask}~4$

同样由绝对值几何意义，令 $\{a_n\}$ 严格递增，有：

- 当 $n$ 为奇数时，$f(a_{\lfloor\frac n2\rfloor+1})$ 最小；
- 当 $n$ 为偶数时，$f(a_{\frac n2})$ 到 $f(a_{\frac n2+1})$ 均相等且为最小值，故 $x$ 最小为 $a_{\frac n2}$。

综上，答案为 $a_{\lfloor\frac{n+1}2\rfloor}$。

---

$\bf\textbf{Subtask}~5$

由上面的结论，观察最小值为 $a_i$ 之一时其函数图像，发现类似开口朝上的函数，于是三分即可，单次计算 $f(x)$ 复杂度为 $O(n)$。

时间复杂度 $O(T\times n\log n)$。

给出另一种做法，试优化 $\text{Subtask}~3$ 中的 $f(x)$ 计算方式，其中 $g(x)$ 的计算可以通过前缀等方式预处理优化至 $O(1)$。

不过需要保证 $\{a_n\}$ 严格递增，于是需要排序。

时间复杂度 $O(T\times(n\log n+n))$。

---

$\bf\textbf{Subtask}~8$

令 $\{a_n\}$ 严格递增，我们可以通过数学方法求出答案为 $a_m$。注意下面所说的 $m$ 是变化的而非固定的。

首先有结论，若 $f(a_m-1)\le f(a_m)$，则 $f(a_{m-1})\le f(a_m)$。特别的，记初始的 $m$ 为 $m_0$。

接下来，我们考虑 $p=0$ 时的答案，即 $m=\lfloor\frac{n+1}2\rfloor$。

当 $p>0$ 且 $n$ 为奇数时，显然左移 $m$，如下图所示为 $g(a_m)$：

![](https://cdn.luogu.com.cn/upload/image_hosting/0i4wt82a.png)

若 $a_m$ 变为 $a_m-1$，则显然 $g(a_m-1)-g(a_m)=2|a_m-(a_m-1)|=2$，如下图所示为 $g(a_m-1)$：

![](https://cdn.luogu.com.cn/upload/image_hosting/2na1unx7.png)

而 $f(a_m-1)-f(a_m)=2-p$，若 $2-p\le0$，即 $f(a_m-1)\le f(a_m)$，那么有 $f(a_{m-1})\le f(a_m)$，左移 $m$ 变为 $m-1$。

接下来，推广到一般，假设我们左移了 $x$ 次，有一般式 $f(a_m-1)-f(a_m)=2(2\times x-1)-p$。我们希望 $f(a_m-1)\le f(a_m)$，即 $2(2\times x-1)-p\le0$，解得 $x\le\frac{p+2}4$，又 $x$ 为整数，则 $x$ 最大可能为 $\lfloor\frac{p+2}4\rfloor$，即最多左移 $\lfloor\frac{p+2}4\rfloor$ 次，答案应为 $a_{m_0-\lfloor\frac{p+2}4\rfloor}$。

下面考虑其它情况，答案同理可得，仅给出结论：

- 当 $p>0$ 且 $n$ 为偶数时，左移，答案应为 $a_{m_0-\lfloor\frac p4\rfloor}$；
- 当 $p<0$ 且 $n$ 为奇数时，右移，答案应为 $a_{m_0-\lfloor\frac{p-1}4\rfloor}$；
- 当 $p<0$ 且 $n$ 为偶数时，右移，答案应为 $a_{m_0-\lfloor\frac{p+1}4\rfloor}$。

综上，现在我们知道答案应为 $a_m$，即原序列中第 $m$ 小值，于是原问题转化为求 $\{a_n\}$ 中的第 $m$ 小值，可用分治解决。

时间复杂度 $O(T\times n)$。
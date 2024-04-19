翻译翻了个啥。

---

对于给定的序列 $\{v_n\}$，可以进行以下操作：

- 选定 $[l,r]$，删除 $v_l$ 至 $v_r$，只能进行一次，且需要保证 $r-l+1<n$；
- 选定 $x$，将 $v_x$ 变为 $v_x+1$ 或 $v_x-1$，对于每个 $x$ 只能进行一次。

第一种操作的代价为 $a\times(r-l+1)$，而第二种操作的代价为 $b$。

求使得 $\gcd(v_i)>1$ 的最小代价。

---

由于我们删除的区间长度小于 $n$，则 $v_1$ 或 $v_n$ 必定有一个未被删除，因此最后的 $\gcd$ 一定是 $v_1$ 或 $v_n$ 进行第二种操作后的值的因数，即在 $S=\text{div}(v_1)\cup\text{div}(v_1-1)\cup\text{div}(v_1+1)\cup\text{div}(v_n)\cup\text{div}(v_n-1)\cup\text{div}(v_n+1)$ 中，其中 $\text{div}(x)$ 表示 $x$ 的所有因数所组成的集合。

另有显然结论：若 $\gcd(x,y)=t\times p$，则 $p$ 一定也是 $x$ 和 $y$ 的一个因数，因此只需考虑质因数即可。

那么，我们不妨枚举 $S$ 中的每个质因数 $k$，计算代价取最小值。

我们用 $c_i$ 表示使得 $v_i$ 变为 $k$ 的倍数时的代价，显然有：

$$
c_i=
\begin{cases}
0,&v_i\equiv 0\pmod k \\
1,&(v_i-1)\equiv 0\pmod k \\
1,&(v_i+1)\equiv 0\pmod k \\
+\infty,&\text{otherwise}. \\
\end{cases}
$$

因此可以计算 $\text{mn}=\displaystyle\min_{c_i=+\infty}i$ 和 $\text{mx}=\displaystyle\max_{c_i=+\infty}i$，则最终我们选择删除的区间 $[l,r]$ 必须满足 $l\le\text{mn}$ 且 $r\ge\text{mx}$。

那么，假设我们删除区间 $[l,r]$ 时，其代价为：

$$
\text{cost}=\sum_{i=1}^{l-1}c_i+a\times(r-l+1)+\sum_{i=r+1}^{n}c_i
$$

显然其中的两个 $\sum c_i$ 均可使用前后缀和预处理。

于是取最小代价即可。
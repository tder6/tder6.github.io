我们先来定义几个函数：

$$
\begin{aligned}
f(i)&=\sum_{x=1}^n\sum_{y=1}^{x-1}~[i\mid\gcd(a_x,a_y)] \\
g(i)&=\sum_{x=1}^n\sum_{y=1}^{x-1}~[\gcd(a_x,a_y)=i]
\end{aligned}
$$

最终所求的答案即为 $\text{ans}=g(1)$。

于是，显然有 $g\*I=f$，于是 $g=f\*\mu$，即：

$$
\begin{aligned}
f(i)&=\sum_{i\mid d}^ng(d) \\
g(i)&=\sum_{i\mid d}^n\left(f(d)\times\mu\left(\frac di\right)\right)
\end{aligned}
$$

我们将 $i=1$ 代入，有：

$$
\begin{aligned}
g(1)&=\sum_{1\mid d}^n\left(f(d)\times\mu\left(\frac d1\right)\right) \\
  &=\sum_{j=1}^n\left(f(j)\times\mu\left(j\right)\right) 
\end{aligned}
$$

我们再定义：

$$
h(i)=\sum_{j=1}^n~[i\mid a_j]
$$

那么，显然的：

$$
f(i)=\frac{h(i)\times\left(h(i)-1\right)}2
$$

到此为止，我们很愉快的结束了推式子环节，接下来考虑加入一个数 $a_x$ 时的贡献。

我们记 $h_i=h(i)$ 且 $f_i=f(i)$。

当加入 $a_x$ 时，有且仅有可能对所有满足 $i\mid a_x$ 的 $h_i$ 产生贡献。于是考虑枚举 $a_x$ 的所有因数 $i$，并将 $h_i\gets h_i+1$，从而计算得出 $f_i$ 的值，最终使用莫比乌斯反演板子求得答案 $\text{ans}=g(1)$。反之删除同理。

形式化的，加入 $a_x$ 时：

$$
\begin{array}{ll}
1&\textbf{for }\text{each }i\mid a_x \\
2&\qquad h_i\gets h_i+1 \\
3&\qquad pre\gets f_i \\
4&\qquad new\gets\dfrac{h_i\times\left(h_i-1\right)}2 \\
5&\qquad f_i\gets new \\
6&\qquad\Delta\gets new-pre \\
7&\qquad ans\gets ans+\Delta\times\mu(i)\\
\end{array}
$$

删除时仅需将第 $2$ 行的 $h_i+1$ 改为 $h_i-1$ 即可。

$\mu$ 函数可以 $O(\max(a_i))$ 预处理，单次操作复杂度 $O(\tau(a_x))$，查询复杂度 $O(1)$，总复杂度 $O(\max(a_i)+q\times\tau(a_x))$。

[]()
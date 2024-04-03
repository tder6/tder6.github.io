令 $f_{i,j}=c_j-i\times a_j$，试对于每个 $1\le i\le n$，在 $m$ 个单价为 $\frac{w_j}{f_{i,j}}$ 且总量为 $w_j$ 的物品中，购买 $c_j$ 份第 $j$ 个物品，使得 $\sum c_j\ge W$ 且 $\sum\frac{w_j}{f_{i,j}}\times c_j$ 最小。 

---

考虑朴素贪心做法，将 $1\le i\le n$ 作为单独的问题分开处理。

尽可能多买 $\frac{w_j}{f_{i,j}}$ 小的物品，显然可以排序，再依题意模拟即可。

时间复杂度 $O(n\times (m+m\log m))$，超时。

考虑优化，参考快排思想与二分，维护二元组序列 $d=\\{(x=\frac{w_j}{f_{i,j}},y=w_j)\\}$。

记当前区间为 $[l,r]$ 且 $p=\dfrac{l+r}2$，每次所有满足 $x_{d_k}<x_{d_p}$ 的元素放在 $d_p$ 左侧，而将所有 $x_{d_k}>x_{d_p}$ 的元素放在 $d_p$ 右侧。那么，若 $\displaystyle\sum_{k=1}^{p}y_{d_k}>W$ 则有 $r\leftarrow p-1$，反之若 $\displaystyle\sum_{k=1}^{p}y_{d_k}<W$ 则 $l\leftarrow p+1$。特别的，若 $\displaystyle\sum_{k=1}^{p}y_{d_k}=W$ 或 $l>r$ 说明找到了答案。可累计答案使得计算 $\displaystyle\sum_{k=1}^{p}y_{d_k}$ 的均摊复杂度为 $O(m)$。

上述过程用 STL 中的 `nth_element()` 函数即可 $O(m)$ 实现。

时间复杂度 $O(n\times m)$。
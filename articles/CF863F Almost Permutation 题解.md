看不懂现有的任何一篇题解，还是我太弱了。

---

由于 $n\le50$，我们不妨用 $O(q\cdot n)$ 的复杂度预处理出 $a_i\in[l_i,r_i]$，若存在一个 $l_i>r_i$ 则无解。具体的：

> 对于每个约束 $\forall~i\in[x,y], a_x\ge v$，我们不妨枚举 $i$，对 $l_i$ 与 $v$ 取较大值作为 $l_i$。反之同理，对于 $\forall~i\in[x,y], a_x\le v$，同样枚举 $i$，对 $r_i$ 与 $v$ 取较小值作为 $r_i$。

接下来考虑建图。观察到 $a_i\in[1,n]$，我们可以用若干个点表示一种取值。由于最终影响答案的是每种取值出现的次数，因此我们希望将这出现 $1\sim n$ 种情况分别表示出来。这里没有 $0$ 是因为没用贡献。具体的：

> 由于 $\text{cnt}$ 个 $s$ 对答案的贡献是 $\text{cnt}^2$，因此考虑差分。我们知道：
> 
> $$
> \begin{aligned}
> 1^2&=1 \\
> 2^2&=1+3 \\
> 3^2&=1+3+5 \\
> n^2&=1+3+5+\cdots+(2n-1) \\
>   &=\sum_{i=1}^{n}(2i-1)
> \end{aligned}
> $$
> 
> 这是显然的，可以通过 $n^2-(n-1)^2=(n+(n-1))\cdot(n-(n-1))=2n-1$ 轻松证明。
> 
> 那么，对于每一种取值 $s$，我们考虑建两个点 $\text{in}_s$ 和 $\text{out}_s$，两点之间连 $n$ 条边，分别为 $\text{in}_s\xrightarrow[c=2i-1]{w=1}\text{out}_s$，此处 $i$ 的取值范围为 $[1,n]$。
> 
> 由此，流前 $k$ 条边表示在序列中共有 $\text{cnt}=\displaystyle\sum_{i=1}^k(2i-1)=k^2$ 个 $s$。

我们已经连好了对应每种取值的边，接下来是确定每个 $a_i$ 的取值：

> 我们已经预处理出 $a_i\in[l_i,r_i]$，因此不妨对每个 $l_i\le j\le r_i$，连一条 $i\xrightarrow[c=0]{w=1}\text{in}_j$ 和 $\text{out}_j\xrightarrow[c=0]{w=1}i$。 
>
> 但是这样我们无法对「每个 $a_i$ 只能取一个值」进行约束，我们不妨考虑拆点套路，将 $i$ 拆成 $\text{iin}_i$ 和 $\text{oout}_i$。连 $s\xrightarrow[c=0]{w=1}\text{iin}_i$ 和 $\text{oout}_i\xrightarrow[c=0]{w=1}t$ 保证流经 $i$ 的流量最多为 $1$。
> 
> 同理，前面的建图方式也应改为：连 $\text{iin}_i\xrightarrow[c=0]{w=1}\text{in}_j$ 和 $\text{out}_j\xrightarrow[c=0]{w=1}\text{oout}_i$。

举个简单的例子便于理解：

> 对于一个长度为 $4$ 的序列 $\{a_4\}$，给定约束分别为：
>
> - $\forall~i\in[1,3],a_i\ge2$；
> - $\forall~i\in[4,4],a_i\le3$；
> - $\forall~i\in[2,3],a_i\le3$。

> 整理一下可以得到下表：
> 
> | $i$ | $1$ | $2$ | $3$ | $4$ |
> | :----------: | :----------: | :----------: | :----------: | :----------: |
> | $[l_i,r_i]$ | $[2,4]$ | $[2,3]$ | $[2,3]$ | $[1,3]$ |
> 
> 这里给出 $a_1$ 的连边方式，注意应当还有 $s\to\text{iin}_1$ 和 $\text{oout}_1\to t$ ：
> 
> ![](https://cdn.luogu.com.cn/upload/image_hosting/32fg7g5o.png)

跑一遍 MCMF 即可解决。
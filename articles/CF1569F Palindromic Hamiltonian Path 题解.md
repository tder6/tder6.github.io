暴搜暴搜！

先来枚举回文串。令其为 $\\{s_n\\}$，根据定义显然有 $s_1=s_{n}$、$s_2=s_{n-1}$ 以此类推直到 $s_{\frac n2}=s_{\frac n2+1}$，最多仅出现 $\frac n2$ 种不同的字符。

对于形如回文串 $\tt abccba$ 和 $\tt abddba$，或是 $\tt aabbaa$ 和 $\tt bbaabb$，我们认为其是本质相同的，因为它们仅是通过变换某些字母得到的。

那么，我们仅需搜索字典序最小的回文串即可，其余与其本质相同的回文串的答案必定与之相同。形式化的，我们搜索的回文串 $s$ 必须满足：

- $s$ 为回文串；
- $s_1=\tt a$；
- 对于 $1<i\le\frac n2$，都存在一个 $j$ 使得 $s_i=s_j$，或是 $s_i=s_{i-1}+1$。

接着考虑优化。不难发现，若 $\tt abccba$ 可取，则 $\tt abbbba$ 必定可取，即存在一条有向边。而所有的回文串必定构成一个 DAG，即有向无环图。如下图所示为一种情况下的部分图：

$$
\begin{aligned}
  {\tt abccba}&\to{\tt abbbba}\to{\tt aaaaaa} \\\\
          &\to{\tt aabbaa}\to{\tt aaaaaa} \\\\
          &\to\cdots
\end{aligned}
$$

在展示的部分中：若 $\tt abccba$ 可取，则 $\tt abbbba$ 和 $\tt aabbaa$ 必定可取；$\tt aaaaaa$ 可取当且仅当 $\tt abbbba$ 或 $\tt aabbaa$ 可取。请注意，这里仅涵盖了展示的部分，例如可能有其他能推导 $\tt aaaaaa$ 的回文串。

那么，这样一来，我们只需计算入度为 $0$ 的回文串能否可取即可，其余均可刷表递推。

PS：刷表指在 dp 中从前往后「推过去」而非一般的「拉过来」，一种极其形象的解释是：

![](https://cdn.luogu.com.cn/upload/image_hosting/20lcxran.png)

接下来我们仅需考虑如何判断是否存在回文哈密顿路径。有一种显然策略，从两边向中间枚举，每次寻找字母相同的点对进行匹配。形式化的，我们用 $f_{i,j,\text{msk}}$ 表示当前匹配的点对为 $(i,j)$，且 $\text{msk}$ 表示已匹配的点集，可用状压处理。转移时，若我们当前匹配的点对为 $(i,j)$，我们可以转移到 $(i',j')$ 当且仅当：

- $\text{msk}\cap\\{i',j'\\}=\varnothing$，即 $i'\notin\text{msk}$ 且 $j'\notin\text{msk}$；
- 存在一条 $i\to i'$ 的边；
- 存在一条 $j\to j'$ 的边；
- 点 $i'$ 和点 $j'$ 上的字母相同。

此时若 $f_{i,j,\text{msk}}=1$，则 $f_{i',j',\text{msk}\cup\\{i',j'\\}}=1$。

于是暴搜即可，注意去重，可用 set 实现。

喜提洛谷[最差解](https://www.luogu.com.cn/record/list?pid=CF1569F&orderBy=1&status=&page=1)。
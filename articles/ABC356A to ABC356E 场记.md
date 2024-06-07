## Problem A. Subsegment Reverse

**【题意】**

对于排列 $\{1,2,\cdots,n\}$，输出将区间 $[l,r]$ 反转后的结果。

**【思路】**

先从小到大输出 $1\sim(l-1)$，再从大到小输出 $l\sim r$，最后从小到大输出 $(r+1)\sim n$ 即可。

时间复杂度 $O(n)$。

**【代码】**

```cpp
#include <bits/stdc++.h>
using namespace std;
#define int long long
#define endl '\n'
const int N = 1e5 + 5;
int n, l, r;
signed main() {
	cin>>n>>l>>r;
	for(int i = 1; i < l; i++) cout<<i<<" ";
	for(int i = r; i >= l; i--) cout<<i<<" ";
	for(int i = r + 1; i <= n; i++) cout<<i<<" ";
}
```

---

## Problem B. Nutrients

**【题意】**

给定对应序列，判断是否对于每个 $1\le i\le m$，都有 $\displaystyle\sum_{j=1}^n X_{j,i}$ 不小于 $A_i$。

**【思路】**

枚举 $i$ 和 $j$，累加和，模拟即可。

时间复杂度 $O(n\cdot m)$。

**【代码】**

```cpp
#include <bits/stdc++.h>
using namespace std;
#define int long long
#define endl '\n'
const int N = 1e5 + 5;
int n, m, x[N], a[N];
signed main() {
	cin>>n>>m;
	for(int i = 1; i <= m; i++) cin>>a[i];
	for(int i = 1; i <= n; i++) for(int j = 1; j <= m; j++) {
		int k; cin>>k;
		x[j] += k;
	}
	for(int i = 1; i <= m; i++) if(a[i] > x[i]) cout<<"No"<<endl, exit(0);
	cout<<"Yes"<<endl;
}
```

---

## Problem C. Keys

**【题意】**

有 $n$ 把钥匙，其中若干真若干假。给定了 $m$ 条信息。每条信息包含一个长度为 $c$ 的编号序列 $\{A_{c}\}$，以及其结果 $\tt o$ 或 $\tt x$，分别表示其中有或没有至少 $k$ 把真钥匙。求符合所有信息的状态数。

**【思路】**

观察到 $n\le15$，不妨枚举 $2^n$ 种状态，扫一遍所有 $m$ 条信息，每条检验复杂度 $O(c)$。于是总复杂度 $O(2^n\cdot nm)$。

**【代码】**

```cpp
#include <bits/stdc++.h>
using namespace std;
#define int long long
#define endl '\n'
const int N = 1e5 + 5;
int n, m, k, cnt, t[N];
vector<int> v[N];
char r[N];
bool check() {
	for(int i = 1; i <= m; i++) {
		int f = 0;
		for(int j : v[i]) f += t[j];
		if((f >= k) != r[i]) return 0; 
	}
	return 1;
}
void dfs(int d) {
	if(d > n) {
		if(check()) cnt++;
		return;
	}
	for(t[d] = 0; t[d] <= 1; t[d]++) dfs(d + 1);
}
signed main() {
	cin>>n>>m>>k;
	for(int i = 1; i <= m; i++) {
		int c; cin>>c;
		while(c--) {
			int p; cin>>p;
			v[i].push_back(p);
		}
		cin>>r[i];
		if(r[i] == 'o') r[i] = 1;
		else r[i] = 0;
	}
	dfs(1);
	cout<<cnt<<endl;
}
```

---

## Problem D. Masked Popcount

**【题意】**

对于给定的 $n,m$，求 $\displaystyle\sum_{i=0}^n\text{popcount}(i\text{ and }m)$ 的值，对 $998244353$ 取模。

**【思路】**

考虑推式子。不妨用 $i_j$ 表示 $i$ 在二进制下从右往左数的第 $j$ 位，从 $0$ 开始记。

$$
\begin{aligned}
\sum_{i=0}^n\text{popcount}(i\text{ and }m)&=\sum_{i=0}^n\sum_{j=0}^{\lfloor\log(i\text{ and } m)\rfloor}[(i\text{ and }m)_j=1] \\
&=\sum_{i=0}^n\sum_{j=0}^{\lfloor\log(i\text{ and } m)\rfloor}[i_j=m_j=1] \\
&=\sum_{k=0}^{\lfloor\log m\rfloor}[m_k=1]\sum_{i=0}^n\sum_{j=0}^{\lfloor\log i\rfloor}[i_j=1] \\
\end{aligned}
$$

稍加解释一下：第一步推理是显然的，第二步推理是显然的，第三步推理是显然的。

于是问题转化为：对于每个满足 $m_k=1$ 的 $k$，求 $1\sim n$ 中有多少个数 $i$ 满足 $i_k=1$。

不妨举个例子，当 $n=6$ 时，每个数在二进制下分别为：

$$
\begin{aligned}
0\to000 \\
1\to001 \\
2\to010 \\
3\to011 \\
4\to100 \\
5\to101 \\
6\to110
\end{aligned}
$$

观察到：

- 当 $k=0$ 时，即上表中从右往左数第 $1$ 列，呈周期变化，循环节为 $01$，长度为 $2$；
- 当 $k=1$ 时，即上表中从右往左数第 $2$ 列，也呈周期变化，循环节为 $0011$，长度为 $4$。

不难总结出一般规律：对于每个 $k$ 均呈周期变化，循环节由 $2^k$ 个 $0$ 和 $2^k$ 个 $1$ 拼接得到，长度为 $2^{k+1}$。

而对于 $0\sim n$ 而言，其必定包括 $\left\lfloor\dfrac{n+1}{2^{k+1}}\right\rfloor$ 个完整的周期，经过简单的分类讨论可以得出，其贡献为：

$$
\left\lfloor\dfrac{n+1}{2^{k+1}}\right\rfloor\times 2^k+\max(((n+1)\bmod 2^{k+1})-2^k,0)
$$

其中 $(n+1)\bmod 2^{k+1}$ 即为不完整的部分，由于具有周期性，可以变为 $1\sim((n+1)\bmod 2^{k+1})$。因为循环节是由 $2^k$ 个 $0$ 和 $2^k$ 个 $1$ 拼接得到，故若 $i$ 介于 $2^k+1$ 到 $(n+1)\bmod 2^{k+1}$ 之间，则会存在贡献。

总结一下，枚举满足条件的 $k$，根据上面的一般式计算贡献，并累加即可。

时间复杂度 $O(\log m)$。

---

## Problem E. Max/Min

**【题意】**

对于给定的序列 $\{a_n\}$，求 $\displaystyle\sum_{i=1}^{n}\sum_{j=i+1}^{n}\left\lfloor\frac{\max(a_i,a_j)}{\min(a_i,a_j)}\right\rfloor$ 的值。

**【思路】**

令值域 $V=\max(a_i)$。

不难发现，元素顺序对答案无影响。故考虑对原序列从小到大排序，有对于 $i<j$ 均有 $a_j\ge a_i$，即 $\min(a_i,a_j)=a_i$ 且 $\max(a_i,a_j)=a_j$。因此：

$$
\begin{aligned}
\sum_{i=1}^{n}\sum_{j=i+1}^{n}\left\lfloor\frac{\max(a_i,a_j)}{\min(a_i,a_j)}\right\rfloor&=\sum_{i=1}^{n}\sum_{j=i+1}^{n}\left\lfloor\frac{a_j}{a_i}\right\rfloor \\
&=\sum_{i=1}^{n}\sum_{a_j\ge a_i,~j>i}\left\lfloor\frac{a_j}{a_i}\right\rfloor \\
&=\sum_{i=1}^{n}\sum_{a_j>a_i}\left\lfloor\frac{a_j}{a_i}\right\rfloor+\sum_{i=1}^{n}\sum_{a_j=a_i,~j>i}\left\lfloor\frac{a_j}{a_i}\right\rfloor \\
&=\sum_{i=1}^{n}\sum_{a_j>a_i}\left\lfloor\frac{a_j}{a_i}\right\rfloor+\sum_{i=1}^{n}\sum_{a_j=a_i,~j>i}1
\end{aligned}
$$

注意到此时对于 $a_j<a_i$，可得 $j<i$，且有 $\left\lfloor\dfrac{a_j}{a_i}\right\rfloor$ 必定为 $0$，故可推得：

$$
\begin{aligned}
\sum_{i=1}^{n}\sum_{j=i+1}^{n}\left\lfloor\frac{\max(a_i,a_j)}{\min(a_i,a_j)}\right\rfloor
&=\sum_{i=1}^{n}\sum_{a_j>a_i}\left\lfloor\frac{a_j}{a_i}\right\rfloor+\sum_{i=1}^{n}\sum_{a_j=a_i,~j>i}1 \\
&=\sum_{i=1}^{n}\sum_{a_j>a_i}\left\lfloor\frac{a_j}{a_i}\right\rfloor+\sum_{i=1}^{n}\sum_{a_j<a_i}\left\lfloor\frac{a_j}{a_i}\right\rfloor+\sum_{i=1}^{n}\sum_{a_j=a_i,~j> i}1 \\
&=\sum_{i=1}^{n}\left(\sum_{a_j>a_i}\left\lfloor\frac{a_j}{a_i}\right\rfloor+\sum_{a_j<a_i}\left\lfloor\frac{a_j}{a_i}\right\rfloor\right)+\sum_{i=1}^{n}\sum_{a_j=a_i,~j> i}1 \\
&=\sum_{i=1}^{n}\sum_{a_j\neq a_i}\left\lfloor\frac{a_j}{a_i}\right\rfloor+\sum_{i=1}^{n}\sum_{a_j=a_i,~j> i}1 \\
&=\sum_{i=1}^{n}\left(\sum_{j=1}^n\left\lfloor\frac{a_j}{a_i}\right\rfloor-\sum_{a_j=a_i}\left\lfloor\frac{a_j}{a_i}\right\rfloor\right)+\sum_{i=1}^{n}\sum_{a_j=a_i,~j> i}1 \\
&=\sum_{i=1}^{n}\left(\sum_{j=1}^n\left\lfloor\frac{a_j}{a_i}\right\rfloor-\sum_{a_j=a_i}1\right)+\sum_{i=1}^{n}\sum_{a_j=a_i,~j> i}1 \\
&=\sum_{i=1}^{n}\sum_{j=1}^n\left\lfloor\frac{a_j}{a_i}\right\rfloor-\sum_{i=1}^{n}\sum_{a_j=a_i}1+\sum_{i=1}^{n}\sum_{a_j=a_i,~j> i}1 \\
&=\sum_{i=1}^{n}\sum_{j=1}^n\left\lfloor\frac{a_j}{a_i}\right\rfloor-\sum_{i=1}^{n}\sum_{a_j=a_i,~j\le i}1
\end{aligned}
$$

不妨用 $c_k$ 表示 $k$ 出现的次数。此处注意到 $a_i\le10^6$，容易想到 $O(n)$ 开桶维护。此时考虑后半部分的意义，对于一段值都相等的区间 $S=[l,r]$，即 $i,j\in S$ 均有 $a_i=a_j=d$，记 $\displaystyle f(i)=\sum_{a_j=a_i,~j\le i}1$，则 $S$ 对答案后半部分的贡献为：

$$
\begin{aligned}
\sum_{i=l}^r f(i)
&=f(l)+f(l+1)+\cdots+f(r) \\
&=1+2+\dots+(r-l+1) \\
&=\binom{r-l+1}2 \\
&=\binom{c_d}2
\end{aligned}
$$

那么：

$$
\begin{aligned}
\sum_{i=1}^{n}\sum_{j=i+1}^{n}\left\lfloor\frac{\max(a_i,a_j)}{\min(a_i,a_j)}\right\rfloor
&=\sum_{i=1}^{n}\sum_{j=1}^n\left\lfloor\frac{a_j}{a_i}\right\rfloor-\sum_{i=1}^{n}\sum_{a_j=a_i,~j\le i}1 \\
&=\sum_{i=1}^{n}\sum_{j=1}^{n}\left\lfloor\frac{a_j}{a_i}\right\rfloor-\sum_{i=1}^{V}\binom{c_i}2 \\
&=\sum_{i=1}^{n}\sum_{j=1}^{n}\left\lfloor\frac{a_i}{a_j}\right\rfloor-\sum_{i=1}^{V}\binom{c_i}2
\end{aligned}
$$

后半部分是简单的，从小学开始我们就知道 $\displaystyle\binom{x}2=\frac{x\cdot(x+1)}2$，因此考虑前半部分的计算。

令 $\displaystyle d_k=\sum_{j=1}^{n}\left\lfloor\frac{k}{a_j}\right\rfloor$，则所求即为 $\displaystyle\sum_{i=1}^{n}d_{a_i}$。考虑差分，即计算 $d_k-d_{k-1}$，容易发现：

$$
\begin{aligned}
d_k-d_{k-1}
&=\sum_{j=1}^{n}\left\lfloor\frac{k}{a_j}\right\rfloor-\sum_{j=1}^{n}\left\lfloor\frac{k-1}{a_j}\right\rfloor \\
&=\sum_{j=1}^{n}\left(\left\lfloor\frac{k}{a_j}\right\rfloor-\left\lfloor\frac{k-1}{a_j}\right\rfloor\right) \\
\end{aligned}
$$

而显然的，当且仅当 $a_j\mid k$ 时 $\displaystyle\left(\left\lfloor\frac{k}{a_j}\right\rfloor-\left\lfloor\frac{k-1}{a_j}\right\rfloor\right)$ 才为 $1$，其余时均为 $0$。故可写成：

$$
d_k-d_{k-1}=\sum_{j=1}^{n}~[a_j\mid k]
$$

即每个 $a_j$ 仅对满足 $a_j\mid k$ 的差分有 $1$ 的贡献。

因此，$d_k-d_{k-1}$ 一定可以推到 $d_{p\cdot k}-d_{p\cdot k-1}$ 的贡献。这是因为对于所有 $a_j\mid k$ 必定有 $a_j\mid p\cdot k$，即对前者有贡献的 $a_j$ 均对后者由贡献。

考虑动态规划，令 $f_i=d_i-d_{i-1}$，则：

- 初始时 $f_i=c_i$；
- 对于每个 $1\le i\le V$，枚举其在值域内的每个倍数 $q=p\cdot i$，令 $c_q\gets c_q+c_i$。此处的 $i$ 应当从大到小枚举。

如此我们可以简单的求出差分序列 $\{f_n\}$，从而得出原序列 $\{d_n\}$，最终计算答案即可。
## 偶遇 BIT

### 题目

考虑一个问题 [P3374](https://www.luogu.com.cn/problem/P3374)，由此引入：

> 请实现一个数据结构，以维护序列 $\{a_n\}$，有以下操作：
> 
> 1. 单点修改，即将第 $x$ 个数加上 $k$，也就是 $a_x\gets a_x+k$；
> 2. 区间查询，即求出区间 $[x,y]$ 内每个数的和，也就是求 $\displaystyle\sum_{i=x}^y a_i$ 的值。
> 
> 其中序列长度和操作次数均不超过 $10^6$。

### 做法 1

考虑朴素模拟。单点修改复杂度 $O(1)$，区间查询复杂度 $O(n)$。

```cpp
namespace Solve {
	int n, a[N];
	void add(int x, int k) {
		a[x] += k;
	}
	int sum(int x, int y) {
		int r = 0;
		for(int i = x; i <= y; i++) r += a[i];
		return r;
	}
	void init(int m, int b[]) {
		n = m;
		for(int i = 1; i <= n; i++) add(i, b[i]);
	}
}
```

### 做法 2

考虑维护前缀和 $\displaystyle c_i=\sum_{j=1}^i a_j$。

单点修改需要更新 $c_x$ 到 $c_n$，复杂度 $O(n)$。区间查询仅需输出 $c_y-c_{x-1}$ 即可，复杂度 $O(1)$。

```cpp
namespace Solve {
	int n, a[N], c[N];
	void add(int x, int k) {
		for(int i = x; i <= n; i++) c[i] += k;
	}
	int sum(int x, int y) {
		return c[y] - c[x - 1];
	}
	void init(int m, int b[]) {
		n = m;
		for(int i = 1; i <= n; i++) add(i, b[i]);
	}
}
```

### 小结

不难发现上面两种做法虽然在某一操作的复杂度是优秀的，但是极限复杂度都是 $O(n^2)$ 的。我们希望寻求一种平衡。

此时，我们的 BIT，即树状数组，便闪亮登场。它可以使得两种操作的复杂度都是 $O(\log n)$ 的，总复杂度就是 $O(n\log n)$ 的。

---

## 初识 BIT

### 前置

在正式开始介绍之前，我们先来说一下 lowbit。

令 $n$ 在二进制下末尾 $0$ 的个数为 $k$，则我们定义其 lowbit 值为 $2^k$。形式化来说：

$$
\text{lowbit}(n)=\max_{\substack{n~\mid~2^k\\ n~\nmid~2^{k+1}}}2^k
$$

例如：

- 当 $n=3=(11)_2$ 时，其末尾没有 $0$，故 $\text{lowbit}(3)=2^0=1$；
- 同理，当 $n=10=(1010)_2$ 时，其末尾仅有 $1$ 个 $0$，故 $\text{lowbit}(10)=2^1=2$；
- 而当 $n=16=(10000)_2$ 时，其末尾有 $4$ 个 $0$，故 $\text{lowbit}(16)=2^4=16$。

那么，如何快速求出 $\text{lowbit}(n)$ 的值是必须要解决的。

不难得出，一般式为 $\text{lowbit}(n)=n\text{ and }(-n)$。此处涉及普及组初赛部分中的补码反码等内容，请读者自行证明或查阅资料。

如此，求任意数的 lowbit 的复杂度降为了 $O(1)$。

```cpp
int lowbit(int x) {
	return (-x) & x;
}
```

### 思想

BIT 的思想是预处理出若干区间的和，在区间查询时，仅需将大区间拆成若干小区间累加即可。具体的，单点修改仅需更新不多于 $\log n$ 个区间的答案，区间查询仅需分成不多于 $\log n$ 个小区间。

具体的，用 $t_i$ 维护以 $i$ 为结尾的长度为 $\text{lowbit}(i)$ 的区间中每个数的和，即 $[i-\text{lowbit}(i)+1,i]$。如下图所示。

![](https://cdn.luogu.com.cn/upload/image_hosting/6r70znxo.png)

那么，根据定义，有：

$$
\begin{aligned}
t_1&=a_1 \\
t_2&=a_1+a_2 \\
t_3&=a_3 \\
t_4&=a_1+a_2+a_3+a_4 \\
t_5&=a_5 \\
t_6&=a_5+a_6 \\
t_7&=a_7 \\
t_8&=a_1+a_2+a_3+a_4+a_5+a_6+a_7+a_8 \\
t_9&=a_9
\end{aligned}
$$

以此类推。

接下来考虑能否满足上面的约束，即两种操作复杂度均不超过 $O(\log n)$。

首先来看区间查询。参考做法 2，我们知道，无论用什么样的数据结构维护，总是可以通过前缀和的转化来求得区间和，即区间 $[l,r]$ 中每个数的和，等于 $r$ 的前缀和减去 $l-1$ 的前缀和。形式化的：

$$
\sum_{i=l}^r a_i=\left(\sum_{i=1}^r a_i\right)-\left(\sum_{i=1}^{l-1}a_i\right)
$$

故此，我们仅需用 $O(\log n)$ 的复杂度求出任意 $k$ 的前缀和即可。也就是说，我们需要将区间 $[1,k]$ 分为不超过 $\log n$ 个已计算的子区间，即 $t_i$，并通过累加得到整个区间 $[1,k]$ 的和。

不妨找规律，令 $\displaystyle c_k=\sum_{i=1}^k a_i$，通过简单观察发现：

$$
\begin{aligned}
c_1&=t_1 \\
c_2&=t_2 \\
c_3&=t_2+t_3 \\
c_4&=t_4 \\
c_5&=t_4+t_5 \\
c_6&=t_4+t_6 \\
c_7&=t_4+t_6+t_7 \\
c_8&=t_8 \\
c_9&=t_8+t_9
\end{aligned}
$$

因此，在计算 $c_k$ 时，考虑将其先累加上 $t_k$，之后不断将 $k$ 减去 $\text{lowbit}(k)$ 直至为 $0$，在此操作中不断累加 $t_k$ 即可。

下面证明其正确性。

举个例子，若 $k=6=(110)_2$，我们依次执行：

- $c_k\gets c_k+t_k$，此时 $k=6$ 故 $c_k=t_6$；
- $k\gets k-\text{lowbit}(k)$，原先的 $k$ 为 $(110)_2$，其 lowbit 值为 $(10)_2$，故减去后为 $(100)_2=4$；
- $c_k\gets c_k+t_k$，此时 $k=4$ 故 $c_k=t_4+t_6$；
- $k\gets k-\text{lowbit}(k)$，原先的 $k$ 为 $(100)_2$，其 lowbit 值为 $(100)_2$，故减去后为 $0$，结束。

观察到从第 $3$ 步开始实际上就开始计算 $c_4$ 的值了，故 $c_6$ 即为 $t_6+c_{6-\text{lowbit}(6)}$。推广到更一般，有 $c_k=t_k+c_{k-\text{lowbit}(k)}$。根据定义：

$$
\begin{aligned}
c_k&=t_k+c_{k-\text{lowbit}(k)} \\
&=\left(\sum_{i=k-\text{lowbit}(k)+1}^k a_i\right)+\left(\sum_{i=1}^{k-\text{lowbit}(k)}a_i\right) \\
&=\sum_{i=1}^k a_i
\end{aligned}
$$

这是符合定义的，而执行上述操作的次数实际上就等于 $k$ 在二进制下 $1$ 的个数，即其 popcount。我们又知道，一个数 $n$ 的 popcount 必定不超过其在二进制下的位数，即 $\log n$。

故此，区间查询仅需拆成不超过 $\log n$ 个小区间即可。

```cpp
int sum(int x) {
	int r = 0;
	for(int i = x; i; i -= lowbit(i)) r += t[i];
	return r;
}
int sum(int l, int r) {
	return sum(r) - sum(l - 1);
}
```

接下来来看单点修改。不难发现，与区间查询相反，每次仅需将 $x$ 加上 $\text{lowbit}(x)$ 并更新 $t_x$ 即可。这一点可以由上面的图直接得到。

```cpp
void add(int x, int k) {
	for(int i = x; i <= n; i += lowbit(i)) t[i] += k;
}
```

经过上述的分析，我们已经成功掌握到了 BIT 的精髓。接下来，请完成引入中的 [P3374](https://www.luogu.com.cn/problem/P3374)。

附参考代码。时间复杂度 $O(n\log n)$。建议前几遍写 BIT 的时候先纯手打，尽量不要复制粘贴。

```cpp
#include <bits/stdc++.h>
using namespace std;
#define int long long
#define endl '\n'
const int N = 1e6 + 5;
namespace BIT {
	int n, t[N];
	int lowbit(int x) {
		return (-x) & x;
	}
	void add(int x, int k) {
		for(int i = x; i <= n; i += lowbit(i)) t[i] += k;
	}
	int sum(int x) {
		int r = 0;
		for(int i = x; i; i -= lowbit(i)) r += t[i];
		return r;
	}
	int sum(int l, int r) {
		return sum(r) - sum(l - 1);
	}
	void init(int m, int b[]) {
		n = m;
		for(int i = 1; i <= n; i++) add(i, b[i]);
	}
};
int n, m, a[N];
signed main() {
	cin>>n>>m;
	for(int i = 1; i <= n; i++) cin>>a[i];
	BIT::init(n, a);
	while(m--) {
		int t, x, y; cin>>t>>x>>y;
		if(t == 1) BIT::add(x, y);
		else cout<<BIT::sum(x, y)<<endl;
	}
}
```

---

## 深入 BIT

引入中的题目可以归纳为「单点修改，区间查询」，接下来来看一些别的题目。

### 练习 1

区间修改，单点查询。见 [P3368](https://www.luogu.com.cn/problem/P3368)。

> 请实现一个数据结构，以维护序列 $\{a_n\}$，有以下操作：
> 
> 1. 区间修改，即将区间 $[x,y]$ 内的每个数加上 $k$，也就是对于所有 $x\le i\le y$，$a_i\gets a_i+k$；
> 2. 单点查询，即求出第 $x$ 个数的值，也就是求 $a_x$ 的值。
> 
> 其中序列长度和操作次数均不超过 $10^6$。

考虑维护差分序列 $\{d_n\}$，则单点查询时的答案即为 $\displaystyle a_x+\left(\sum_{i=1}^x d_i\right)$。

再思考区间修改的操作，此时不妨将 $a_x$ 加上 $k$，并让 $a_{y+1}$ 减去 $k$ 即可。

于是问题又转化成了「单点修改，区间查询」，用 BIT 维护序列 $\{d_n\}$ 即可。

附参考代码，时间复杂度 $O(n\log n)$。

```cpp
#include <bits/stdc++.h>
using namespace std;
#define int long long
#define endl '\n'
const int N = 1e6 + 5;
namespace BIT {
	int n, t[N];
	int lowbit(int x) {
		return (-x) & x;
	}
	void add(int x, int k) {
		for(int i = x; i <= n; i += lowbit(i)) t[i] += k;
	}
	int sum(int x) {
		int r = 0;
		for(int i = x; i; i -= lowbit(i)) r += t[i];
		return r;
	}
	int sum(int l, int r) {
		return sum(r) - sum(l - 1);
	}
	void init(int m, int b[]) {
		n = m;
		for(int i = 1; i <= n; i++) add(i, b[i]);
	}
};
int n, m, a[N], b[N];
signed main() {
	cin>>n>>m;
	for(int i = 1; i <= n; i++) cin>>a[i];
	BIT::init(n, b);
	while(m--) {
		int t; cin>>t;
		if(t == 1) {
			int x, y, k; cin>>x>>y>>k;
			BIT::add(x, k), BIT::add(y + 1, -k);
		} else {
			int x; cin>>x;
			cout<<BIT::sum(x) + a[x]<<endl;
		}
	}
}
```

### 问题 2

咕着。
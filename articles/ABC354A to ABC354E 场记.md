### Problem A. Exponential Plant

**【题意】**

维护一 $h$ 值，初始时为 $0$，其在第 $i$ 天增加 $2^{i-1}$。求最小的 $k$ 使得第 $k$ 天时的 $h$ 大于 $H$。

**【思路】**

模拟即可。注意部分写法可能需要对最后的结果进行 $+1$ 或 $-1$ 等处理。

时间复杂度 $O(\log H)$。

**【代码】**

```cpp
#include <bits/stdc++.h>
using namespace std;
#define int long long
#define endl '\n'
const int N = 1e5 + 5;
int n, h, ans;
signed main() {
	cin>>h;
	while(n < h) n += (1 << (++ans));
	cout<<ans + 1<<endl;
}
```

---

### Problem B. Exponential Plant

**【题意】**

输出 $s$ 序列中字典序第 $T\bmod\left(\sum\limits_{i=1}^n c_i\right)$ 小的。

**【思路】**

模拟即可。累加 $c_i$ 并将 $s$ 序列排序即可。

时间复杂度 $O(n\log n)$。

**【代码】**

```cpp
#include <bits/stdc++.h>
using namespace std;
#define int long long
#define endl '\n'
const int N = 1e5 + 5;
string s[N]; int n, c[N], t;
signed main() {
	cin>>n;
	for(int i = 1; i <= n; i++) cin>>s[i]>>c[i];
	for(int i = 1; i <= n; i++) t += c[i];
	sort(s + 1, s + n + 1);
	cout<<s[t % n + 1]<<endl;
}
```

---

### Problem C. AtCoder Magics

**【题意】**

对于二元组序列 $(A_i,C_i)$，若存在 $x,y$ 满足 $A_x>A_y$ 且 $C_x<C_y$，则删去第 $y$ 个。求最终能留下来的编号所组成的序列。

**【思路】**

仿佛是做过的最难的 C 题？

不妨将序列按 $A_i$ 降序排序，则此时对于任意 $x<y$ 仅需 $C_x<C_y$ 即可删去第 $y$ 个。也就是说，有且仅有第 $1$ 至 $i-1$ 个有可能能删去第 $i$ 个。那么，仅需存在一个 $C_k<C_i$ 即可，其中 $1\le k<i$。

因此考虑维护 $\min\{C_i\}$ 的前缀，记为 $c$，若 $c<C_i$ 则删去第 $i$ 个。从左向右更新，即 $c\gets\min(C_i,c)$。

时间复杂度 $O(n)$。

**【代码】**

```cpp
#include <bits/stdc++.h>
using namespace std;
#define int long long
#define endl '\n'
const int N = 2e5 + 5, INF = 1e18;
int n, c = INF, m[N], cnt;
struct Node {
	int a, b, i;
} p[N];
int operator<(Node x, Node y) {
	return x.a > y.a;
}
signed main() {
	cin>>n; cnt = n;
	for(int i = 1; i <= n; i++) cin>>p[i].a>>p[i].b, p[i].i = i;
	for(int i = 1; i <= n; i++) m[i] = 1;
	sort(p + 1, p + n + 1);
	for(int i = 1; i <= n; i++) {
		if(p[i].b > c) m[p[i].i] = 0, cnt--;
		c = min(c, p[i].b);
	}
	cout<<cnt<<endl;
	for(int i = 1; i <= n; i++) if(m[i]) cout<<i<<" "; cout<<endl;
}
```

---

### Problem D. AtCoder Wallpaper

**【题意】**

给定如图所示的网格图，求指定的矩形 $ABCD$ 中所包含的黑色部分面积的二倍。

**【思路】**

下文用形如「矩形是 $x\times y$ 的」语句表示这个矩形的横向长度为 $x$，而纵向长度为 $y$。

观察得到：

> 结论：任意横向连续 $4$ 个单位正方形中黑白各半。
>
> 证明：显然的。可找规律验证，如下图所示。
> 
> ![](https://cdn.luogu.com.cn/upload/image_hosting/ankeyfhh.png)

利用这个结论，我们不妨将原来的四边形分为两部分：横向长为 $4$ 的倍数的一部分，以及其余部分。

即对于如下图所示的 $10\times8$ 的矩形，可以分为右边 $8\times8$ 的矩形和左边是 $2\times8$ 的矩形：

![](https://cdn.luogu.com.cn/upload/image_hosting/kyhz3241.png)

因此，右边的贡献为 $2\times\dfrac{8\times8}2=64$。

不妨推广到一般，即 $A(a,b)$ 和 $C(c,d)$：

> 结论：右边的贡献为 $(d-b)\cdot\left(\left\lfloor\dfrac{(c-a)}4\right\rfloor\cdot4\right)$。
> 
> 证明：原矩形是 $(c-a)\times(d-b)$ 的。为使横向长度为 $4$ 的倍数，最大为 $h=\left\lfloor\dfrac{(c-a)}4\right\rfloor\cdot4$，故贡献为 $2\times\dfrac{(d-b)\cdot h}2=(d-b)\cdot h$。得证。

此后左边部分的右上点 $C'$ 的横坐标即为 $c'=c-\left\lfloor\dfrac{(c-a)}4\right\rfloor\cdot4$。故此，其是 $\left(c'-a\right)\times(d-b)$ 的。

那么考虑如何求出左边的贡献，此时便需要分类讨论四种不同的列。如下图所示：

![](https://cdn.luogu.com.cn/upload/image_hosting/lr3zn6qw.png)

下面用列或单位正方形的左下角坐标表示其坐标。

先看红色的列，即 $x\bmod4=0$ 时，每连续两个单位正方形的贡献为 $3$。对于单个偶数单位正方形，即 $y\bmod2=0$ 时，其贡献为 $2$。反之同理，单个奇数单位正方形的贡献为 $1$。

依次类推，用 $p_k$ 表示对于所有 $x\bmod 4=k$ 的列，其每连续两个单位正方形的贡献。而 $q_{f,k}$ 表示该列中，单个满足 $y\bmod2=f$ 的单位正方形的贡献。

容易得到：

| $k$ | $0$ | $1$ | $2$ | $3$ |
| :----------: | :----------: | :----------: | :----------: | :----------: |
| $p_k$ | $3$ | $3$ | $1$ | $1$ |
| $q_{0,k}$ | $2$ | $1$ | $0$ | $1$ |
| $q_{1,k}$ | $1$ | $2$ | $1$ | $0$ |

不妨用 $p'_{k}$ 表示 $p_{(k\bmod4)}$ 且 $q'_{f,k}$ 表示 $q_{(f\bmod2),(k\bmod4)}$。

综上，则有：

> 结论：左边的贡献为 $\displaystyle\left(\sum_{x=a}^{c'}\left(\left\lfloor\dfrac{d-b}2\right\rfloor\cdot p'_x\right)\right)+[(d-b)\bmod2=1]\cdot\left(\sum_{x=a}^{c'}q'_{b,x}\right)$。
> 
> 证明：对于每个 $x$ 都能分成 $\left\lfloor\dfrac{d-b}2\right\rfloor$ 个连续两个单位正方形。特别的，当 $d-b$ 为奇数时会多出一个单独的单位正方形，此时需要加上 $q'_{b,x}$ 的贡献。得证。

另附赛时草稿：

![](https://cdn.luogu.com.cn/upload/image_hosting/eqm9z1js.png)

**【代码】**

```cpp
#include <bits/stdc++.h>
using namespace std;
#define int long long
#define endl '\n'
const int N = 1e5 + 5, INF = 1e18;
int a, b, c, d, ans;
const int p[4] = {3, 3, 1, 1};
const int q[2][4] = {
	{2, 1, 0, 1},
	{1, 2, 1, 0}
};
signed main() {
	cin>>a>>b>>c>>d;
	ans = (d - b) * ((c - a) / 4 * 4);
	c -= ((c - a) / 4 * 4);
	// cout<<ans<<" "<<c<<endl;
	for(int i = a; i < c; i++) ans += ((d - b) / 2) * p[(i + INF) % 4];
	if((d - b) % 2) for(int i = a; i < c; i++) ans += q[(b + INF) % 2][(i + INF) % 4];
	cout<<ans<<endl;
}
```

---

### Problem E. Remove Pairs

**【题意】**

对于二元组序列 $(A_i,B_i)$，每次可以选择任意 $i,j$ 满足 $A_i=A_j$ 或 $B_i=B_j$，并删除 $i,j$。Alice 和 Bob 轮流操作，前者先手，若一方不能操作为负，求谁能胜。

**【思路】**

观察到 $n\le18$，考虑状压 dp。

用 $f_{\text{msk}}=1$ 表示状态为 $\text{msk}$ 时先手必败，反之为 $2$ 则先手必胜。其中，若 $i\in\text{msk}$ 表示 $i$ 未被删除。

首先考虑边界，所有都删除后，由于先手需要操作，但显然无法操作，故先手必败，即 $f_0=1$。

转移时，枚举每种 $\text{msk}$ 状态，若存在一个 $x,y$ 使得 $x,y$ 均未被删除且满足操作条件，即 $x,y\in\text{msk}$ 且满足 $A_x=A_y$ 或 $B_x=B_y$，并且在删除 $x,y$ 后为先手必败，则此时对于 $\text{msk}$ 状态先手必胜，即 $f_\text{msk}=1$，反之同理。

最后的结果即为 $f_{2^n-1}$。

时间复杂度 $O(2^n\times n^2)$。

**【代码】**

```cpp
#include <bits/stdc++.h>
using namespace std;
#define int long long
#define endl '\n'
const int N = 18 + 5;
int n, a[N], b[N], f[1 << (N - 5)];
signed main() {
	cin>>n;
	for(int i = 1; i <= n; i++) cin>>a[i]>>b[i];
	f[0] = 1;
	for(int i = 1; i < (1 << n); i++) {
		f[i] = 1;
		for(int j = 1; j <= n; j++) for(int k = j + 1; k <= n; k++)
			if(((i >> (j - 1)) & 1) && ((i >> (k - 1)) & 1))
				if((a[j] == a[k] || b[j] == b[k]) && f[i ^ (1 << (j - 1)) ^ (1 << (k - 1))] == 1) f[i] = 2;
	}
	if(f[(1 << n) - 1] == 1) cout<<"Aoki"<<endl;
	else cout<<"Takahashi"<<endl;
}
```
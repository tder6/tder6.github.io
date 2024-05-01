什么唐诗出题人 NOIP 模拟赛 T1 放蓝题。

---

我们不妨定义 $f(i,j)$ 表示将一根长度为 $i$ 的萝卜切成 $j$ 段的最小答案，即对于所有满足 $\displaystyle\left(\sum_{k=1}^ja_k\right)=i$ 的序列 $\{a_j\}$，取 $f(i,j)=\displaystyle\min\left\{\sum_{k=1}^ja_k^2\right\}$。

那么，有显然的贪心结论：

> 当序列 $\{a_j\}$ 中有 $j-(i\bmod j)$ 个 $\left\lfloor\dfrac ij\right\rfloor$ 和 $i\bmod j$ 个 $\left\lfloor\dfrac ij\right\rfloor+1$ 时，此时 $f(i,j)$ 取到最小值，为：
> $$
>   f(i,j)=\left(j-(i\bmod j)\right)\times\left\lfloor\dfrac ij\right\rfloor+(i\bmod j)\left(\left\lfloor\dfrac ij\right\rfloor+1\right)
> $$

这个很好证明，类似「和一定差小积大」的思考方式即可。

我们不妨先计算出 $\text{ans}_0=\sum f(a_i,1)$，即一刀不切时的答案。

接下来，考虑试图缩小这个答案。显然的，对于长分别为 $x,y$ 的两个萝卜，若 $\Delta x=f(x,p)-f(x,p+1)>\Delta y=f(y,q)-f(y,q+1)$，即把 $x$ 多切一刀的贡献比把 $y$ 多切一刀更大，则切 $x$ 更优。此处感性理解一下，我们需要最终的 $\text{ans}=\text{ans}_0-\sum\Delta$ 尽可能小，即减少的 $\Delta$ 尽可能大，因此我们优先选择贡献较大的切。

因此可以用优先队列维护，再记录一下每个萝卜当且被切了几刀，在代码中是 $\{d_n\}$ 序列。记 $n,k$ 同阶，时间复杂度 $O(n\log n)$。

---

代码中的取模可以全部删去，模拟赛的题是带取模的，懒得删了。

```cpp
#include <bits/stdc++.h>
using namespace std;
#define int long long
#define endl '\n'
const int N = 1e6 + 5, M = 1e18;
int n, m, c[N], cnt, d[N], ans;
priority_queue<pair<int, int>> q;
int f(int i, int j) {
	return (i / j) * (i / j) * (j - i % j) + (i / j + 1) * (i / j + 1) * (i % j);
}
signed main() {
	cin>>n>>m;
	for(int i = 1; i <= n; i++) cin>>c[i], cnt += (bool)c[i];
	if(cnt > m) {
		cout<<-1<<endl;
		return 0;
	}
	m -= cnt;
	for(int i = 1; i <= n; i++) if(c[i]) {
		ans += f(c[i], 1) % M, ans %= M; d[i] = 1;
		q.push({f(c[i], 1) - f(c[i], 2), i});
	}
	while(m-- && !q.empty()) {
		auto t = q.top(); q.pop(); 
		int i = t.first, j = t.second;
        ans -= i % M, ans += M, ans %= M;
		d[j]++;
        q.push({f(c[j], d[j]) - f(c[j], d[j] + 1), j});
    }
	cout<<ans<<endl;
}
```
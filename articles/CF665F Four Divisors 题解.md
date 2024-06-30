定义 $\displaystyle\pi(n)=\sum_{i=1}^n~[i\in\mathbb{P}]$。求法是 Min25，参见 [1](https://www.cnblogs.com/dysyn1314/p/13449083.html) [2](https://www.luogu.com.cn/article/vo3q2nq7)。

追加定义区间 $\pi(l,r)=\pi(r)-\pi(l-1)$。

正整数 $x$ 恰有 $4$ 个因数，当且仅当：

- $x=p^3$，其中 $p\in\mathbb{P}$；
- $x=p\cdot q$，其中 $p,q\in\mathbb{P}$ 且 $p<q$。

对于前者，满足条件的 $x$ 的个数即为 $\text{ans}_1=\pi(\sqrt[3]{n})$。

对于后者，考虑每个 $p$，满足的个数为 $\pi(\lfloor\frac np\rfloor)$。但是这样将 $p\cdot q$ 和 $q\cdot p$ 的情况算两次，以及不符合要求的形如 $p\cdot p$。减去多算的后面一种情况的 $\pi(\sqrt n)$ 个，再根据组合意义将答案除上 $2$ 即可。也就是说：

$$
\text{ans}_2=\frac{\sum_{i\in\mathbb{P}}\pi(\lfloor\tfrac np\rfloor)-\pi(\sqrt n)}2
$$

答案是 $\text{ans}_1+\text{ans}_2$。

这样做是 $O(\pi(n))$ 的，不计 Min25 的预处理复杂度。

容易观察到其中有个很显眼的 $\lfloor\frac np\rfloor$，于是考虑数论分块。将 $[1,n]$ 拆为若干段 $[l_i,r_i]$，使得每段内的 $\lfloor\frac np\rfloor$ 均相同，于是这一段的贡献为 $\pi(l_i,r_i)\cdot\pi(\lfloor\tfrac np\rfloor)$。

可以证明分块个数为 $\sqrt n$，故时间复杂度 $O(\sqrt n)$。

---

```cpp
#include <bits/stdc++.h>
using namespace std;
#define int long long
#define endl '\n'
const int N = 1e11 + 5, M = sqrt(N) + 5;
namespace Getpi {
	int n, b[M], d[M * 2], f[M], g[M], cnt, s, h[M * 2];
	vector<int> v;
	int& work(int x) {
		if(x <= s) return f[x];
		else return g[n / x];
	}
	void init() {
		s = sqrt(n);
		for(int i = 2; i <= s; i++) {
			if(!b[i]) v.push_back(i);
			for(int j = 0; j < v.size(); j++) {
				int p = v[j];
				if(p * i > s) break;
				b[p * i] = 1;
				if(!(i % p)) break;
			}
		}
		cnt = 0;
		for(int l = 1, r; l <= n; l = r + 1) {
			r = n / (n / l);
			d[work(n / l) = ++cnt] = n / l, h[cnt] = n / l - 1;
		}
		for(int i = 0; i < v.size(); i++) for(int j = 1; d[j] >= v[i] * v[i]; j++) h[j] -= h[work(d[j] / v[i])] - i;
	}
	int getpi(int x) {
		if(!x) return 0;
		return h[work(x)];
	}
	int getpi(int l, int r) {
		return getpi(r) - getpi(l - 1);
	}
};
int n, ans;
signed main() {
	cin>>n; Getpi::n = n; Getpi::init();
	int k = 0;
	for(int l = 1, r; l <= n; l = r + 1) {
		r = n / (n / l);
		// cout<<"l r = "<<l<<" "<<r<<endl;
		ans += Getpi::getpi(l, r) * Getpi::getpi(n / l);
		// cout<<ans<<endl;
	}
	ans -= Getpi::getpi(sqrt(n));
	ans /= 2;
	ans += Getpi::getpi(pow(n, 1.0 / 3));
	cout<<ans<<endl;
	return 0;
}
/*
2 2 = 4
2 3 = 6
2 5 = 10
3 2 = 6
3 3 = 9
5 2 = 10
*/
```
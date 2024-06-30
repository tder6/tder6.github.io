妙妙题。

定义倒置就是 $\tt S\leftrightarrow N$ 且 $\tt W\leftrightarrow E$，用 $f(c)$ 表示。而逆序就是 $\{s_1,s_2,\cdots,s_n\}\leftrightarrow\{s_n,s_{n-1},\cdots,s_1\}$。

首先看样例猜想是：

> 若最后一次操作互为倒置则无解，反之有解。

但是可以被 $\tt ES$ 和 $\tt NW$ 卡掉。这样相当于两个路径是互为逆序且倒置的。实际上就是某一个点到达终点后，为了使另一个点也到，就会让这个点回退。推广到有两个后缀即可。

因此，结论是：

> 若存在 $a$ 的后缀 $a'$ 和 $b$ 的后缀 $b'$，满足 $a'$ 和 $b'$ 互为逆序且倒置，则无解，反之有解。

倒置很好处理，可以先把其中一个倒置，于是转化为逆序且相等。而找逆序后缀是困难的，不妨将其中一个逆序，并将另一个拼接上，若得到的新字符串的 border 非零则相当于找到了满足的后缀。形式化的讲，新字符串是：

$$
s=\{f(a_1),f(a_2),\cdots,f(a_n),b_n,b_{n-1},\cdots,b_1\}
$$

新字符串的 border 值用 kmp 处理是简单的。

时间复杂度 $O(n)$。

---

```cpp
#include <bits/stdc++.h>
using namespace std;
#define int long long
#define endl '\n'
const int N = 2e6 + 5;
namespace Kmp {
	int p[N]; string s;
	void init(string t) {
		s = t;
		for(int i = 1, j = 0; i < s.length(); i++, p[i] = j) {
			while(j && s[i] != s[j]) j = p[j];
			if(s[i] == s[j]) j++;
		}
	}
	int border() {
		return p[s.length()];
	}
};
int n;
string a, b, s;
char change(char c) {
	if(c == 'N') return 'S';
	if(c == 'S') return 'N';
	if(c == 'E') return 'W';
	if(c == 'W') return 'E';
}
signed main() {
	cin>>n>>a>>b;
	for(auto &c : a) c = change(c);
	// cout<<a<<endl;
	for(int i = 0, j = a.length() - 1; i < j; i++, j--) swap(a[i], a[j]);
	s = a + b;
	Kmp::init(s);
	if(Kmp::border()) cout<<"NO"<<endl;
	else cout<<"YES"<<endl;
}
```
### Problem A. Who Ate the Cake?

**【题意】**

有 $3$ 个嫌疑人，知道 $a$ 和 $b$ 不是凶手，判断能否知道谁是凶手。

**【思路】**

当 $a=b$ 时，只知道一个人不是凶手，无法确定，故为 $-1$。

反之，当 $a\neq b$ 时，另一人必定为凶手，即 $6-a-b$。

时间复杂度 $O(1)$。

**【代码】**

```cpp
#include <bits/stdc++.h>
using namespace std;
#define int long long
#define endl '\n'
const int N = 1e5 + 5;
int a, b;
signed main() {
	cin>>a>>b;
	if(a == b) cout<<-1<<endl;
	else cout<<(6 - a - b)<<endl;
}
```

---

### Problem B. Piano 2

**【题意】**

给定序列 $\{A_n\}$ 和 $\{B_m\}$，令 $\{C_{n+m}\}$ 为将两序列拼接并升序排序后得到的序列。判断是否存在序列 $\{A_n\}$ 中的两元素，在序列 $\{C_{n+m}\}$ 中相邻。

**【思路】**

笑点解析：

![](https://cdn.luogu.com.cn/upload/image_hosting/3c3gt2pb.png)

模拟即可。对于本在序列 $\{A_n\}$ 中的元素，在序列 $\{C_{n+m}\}$ 中另外存储一个 $\text{id}$ 表示其编号。排序后，可以 $O(n+m)$ 处理出 $p_i$ 表示原序列 $\{A_n\}$ 中的第 $i$ 个元素在序列 $\{C_{n+m}\}$ 中的第 $p_i$ 个。再枚举原序列 $\{A_n\}$ 中的每个下标 $i$，判断 $|p_i-p_{i+1}|$ 是否为 $1$ 即可。

令 $s=n+m$，时间复杂度 $O(s\log s)$。

**【代码】**

```cpp
#include <bits/stdc++.h>
using namespace std;
#define int long long
#define endl '\n'
const int N = 1e5 + 5;
int n, m, a[N], b[N], p[N];
struct Node {
	int k, id;
} c[N];
bool operator<(Node a, Node b) {
	return a.k < b.k;
}
signed main() {
	cin>>n>>m;
	for(int i = 1; i <= n; i++) cin>>a[i], c[i] = {a[i], i};
	for(int i = 1; i <= m; i++) cin>>b[i], c[i + n] = {b[i], 0};
	sort(c + 1, c + n + m + 1);
	for(int i = 1; i <= n + m; i++) if(c[i].id) p[c[i].id] = i; 
	for(int i = 1; i <= n; i++) for(int j = i + 1; j <= n; j++) if(abs(p[i] - p[j]) == 1) cout<<"Yes"<<endl, exit(0);
	cout<<"No"<<endl;
}
```

---

### Problem C. Bingo 2

**【题意】**

在 $n\times n$ 的棋盘上，位于 $(i,j)$ 的格子上写有 $(i-1)\times n+j$。依次翻开写有 $a_i$ 的格子，求第几次操作可以达成 Bingo。

**【思路】**

达成 Bingo 的充要条件是存在某行、某列、某对角线上所有 $n$ 个格子均被翻开。

考虑用 $a_i$ 表示第 $i$ 行现被翻开了的格子的个数，用 $b_j$ 表示第 $j$ 列现被翻开了的格子的个数，用 $c_k$ 表示对角线现被翻开了的格子的个数。由此，达成 Bingo 的充要条件即为存在 $q$ 使得 $a_q=n$ 或 $b_q=n$ 或 $c_q=n$。

那么，对于一个写有 $p$ 的格子，考虑其贡献。容易得到其坐标为 $(x,y)=\left(\left\lfloor\dfrac{p-1}n\right\rfloor+1,((p-1)\bmod n)+1\right)$，且当且仅当 $x=y$ 时在左上—右下对角线、当且仅当 $x+y=n+1$ 时在右上—左下对角线。

于是，其仅能对 $a_x$ 和 $b_y$ 产生贡献，若满足对应条件则可能对 $c_k$ 产生贡献。对于可以产生贡献的，判断其是否等于 $n$ 并输出操作数即可。

时间复杂度 $O(T)$，有一定的常数。

**【代码】**

```cpp
#include <bits/stdc++.h>
using namespace std;
#define int long long
#define endl '\n'
const int N = 2e3 + 5;
int n, t, a[N], b[N], c[N];
signed main() {
	cin>>n>>t;
	for(int i = 1; i <= t; i++) {
		int x; cin>>x;
		a[(x - 1) / n + 1]++, b[(x - 1) % n + 1]++;
		if(((x - 1) / n + 1) == ((x - 1) % n + 1)) c[1]++;
		if(((x - 1) / n + 1) + ((x - 1) % n + 1) == n + 1) c[2]++;
		if(a[(x - 1) / n + 1] == n) cout<<i<<endl, exit(0);
		if(b[(x - 1) % n + 1] == n) cout<<i<<endl, exit(0);
		if(c[1] == n) cout<<i<<endl, exit(0);
		if(c[2] == n) cout<<i<<endl, exit(0);
	}
	cout<<-1<<endl;
}
```

---

### Problem D. Intersecting Intervals

**【题意】**

给定 $n$ 个闭区间 $[L_i,R_i]$，求其中相交的对数。

**【思路】**

赛后听说有很多人拿二分过的？

考虑扫描线。

![](https://cdn.luogu.com.cn/upload/image_hosting/rgnd3a2z.png)

如上图所示，将每个区间拆成左右端点 $L_i$ 和 $R_i$，并排序。

想象有一条扫描线，从左到右扫，用 $c$ 表示当前其所在的区间个数：

- 当扫到左端点 $L_i$，第 $i$ 个区间在此处开始，所在区间个数增加 $1$，即 $c\gets c+1$。如上图红线所示；
- 当扫到右端点 $R_i$，第 $i$ 个区间在此处终止，所在区间个数减少 $1$，即 $c\gets c-1$。同时，将答案累加 $c$，即 $\text{ans}\gets\text{ans}+c$。如上图蓝线所示。

下面证明其正确性。

我们知道，若两个区间 $x,y$ 相交，其中 $L_x<L_y$，可分为：

- $x$ 不完全包含 $y$，即先扫到 $x$ 的左端点，再扫到 $y$ 的左端点，再扫到 $x$ 的左端点，最后扫到 $y$ 的右端点。如上图的第 $1$ 个和第 $2$ 个区间；
- $x$ 完全包含 $y$，即先扫到 $x$ 的左端点，再扫到 $y$ 的左端点，再扫到 $y$ 的左端点，最后扫到 $x$ 的右端点。如上图的第 $2$ 个和第 $3$ 个区间。

也就是说：

- 若 $x$ 不完全包含 $y$，则在扫到 $x$ 的右端点时，扫描线一定在 $y$ 上，即 $c$ 中有 $y$ 的贡献；
- 若 $x$ 完全包含 $y$，则在扫到 $y$ 的右端点时，扫描线一定在 $x$ 上，即 $c$ 中有 $x$ 的贡献。

故每个右端点处的 $c$ 之和即为答案。

特别的，对于如图所示的紫线，即同时在某区间左端点又在另一区间右端点，应先处理左端点。这是因为本题中给定的是闭区间，这两个线段是相交的，先处理左端点才能对 $c$ 产生贡献。

时间复杂度 $O(n\log n)$。

**【代码】**

```cpp
#include <bits/stdc++.h>
using namespace std;
#define int long long
#define endl '\n'
const int N = 2e3 + 5;
int n, c, ans;
struct Node {
	int t, p;
};
bool operator<(Node x, Node y) {
	if(x.p != y.p) return x.p < y.p;
	else return x.t < y.t;
}
vector<Node> d;
signed main() {
	cin>>n;
	for(int i = 1; i <= n; i++) {
		int l, r; cin>>l>>r;
		d.push_back({0, l}); d.push_back({1, r});
	}
	sort(d.begin(), d.end());
	for(auto i : d) {
		if(!i.t) c++;
		else ans += (--c);
	}
	cout<<ans<<endl;
}
```

---

### Problem E. Guess the Sum

咕着。
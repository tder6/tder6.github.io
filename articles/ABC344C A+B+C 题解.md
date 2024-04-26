暴力 $O(NMLQ)$ 肯定会死。

于是考虑预处理出 $m_p=1$ 表示 $p$ 有解，即可以表示为 $A_i+B_j+C_k$ 的形式，反之亦然。此处可以用 map 或 set 实现，枚举 $i,j,k$ 即可。

同时注意数据范围，查询的 $p$ 可能达到 $10^8$ 量级，于是无法使用普通数组，但 map 仅会占用已赋值元素的空间。

预处理复杂度 $O(NML)$，单次查询复杂度 $O(1)$，总复杂度 $O(NML+Q)$。

---

```cpp
#include <bits/stdc++.h>
using namespace std;
#define int long long
const int N = 1e5 + 5;
int n, m, l, q, a[N], b[N], c[N];
map<int, bool> t;
signed main() {
    cin>>n; for(int i = 1; i <= n; i++) cin>>a[i];
    cin>>m; for(int i = 1; i <= m; i++) cin>>b[i];
    cin>>l; for(int i = 1; i <= l; i++) cin>>c[i];
    for(int i = 1; i <= n; i++) for(int j = 1; j <= m; j++) for(int k = 1; k <= l; k++) t[a[i] + b[j] + c[k]] = 1;
    cin>>q;
    while(q--) {
        int x; cin>>x;
        if(t[x]) cout<<"Yes"<<endl;
        else cout<<"No"<<endl;
    }
}
```
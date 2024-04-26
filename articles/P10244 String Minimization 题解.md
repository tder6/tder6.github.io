依次枚举 $a_i$ 与 $c_i$，为了使 $a$ 的字典序尽可能小，即 $a_i$ 的字典序尽可能小，则最终的 $a_i$ 应为 $\min(a_i,c_i)$，也就是说：

- 当 $a_i>c_i$ 时，交换；
- 当 $a_i<c_i$ 时，不交换；
- 当 $a_i=c_i$ 时，此时考虑使 $b_i$ 尽可能小，于是同理若 $b_i>d_i$ 则交换，反之不交换。

模拟即可。

时间复杂度 $O(n)$。

---

```cpp
#include <bits/stdc++.h>
using namespace std;
#define int long long
const int N = 1e5 + 5;
int n; string a, b, c, d;
signed main() {
    cin>>n>>a>>b>>c>>d;
    for(int i = 0; i < n; i++) 
        if(a[i] > c[i] || (a[i] == c[i] && b[i] > d[i])) swap(b[i], d[i]);
    cout<<b<<endl;
}
```
给定序列 $\{a_n\}$，试将其分为若干组，使得每组内的数两两的二进制位各不相同。

---

要求两两的二进制位各不相同，即 $a_i~\text{and}~a_j=0$。但注意是第 $1\sim32$ 位各不相同，因此需要 $a_i+a_j=2^{32}-1$，那么显然每组只能 $2$ 个数。

因此，我们考虑用 $s_i$ 表示 $i$ 在序列中出现的次数。

对于每一个 $a_i$，若 $s_{(2^{32}-1)-a_i}>0$，即序列中存在 $(2^{32}-1)-a_i$，那么考虑将每个 $a_i$ 和每个 $(2^{32}-1)-a_i$ 组成一组，共 $\min(s_{a_i},s_{(2^{32}-1)-a_i})$ 组。

统计答案即可。

时间复杂度 $O(\sum n\log n)$。

---

```cpp
#include <bits/stdc++.h>
using namespace std;
#define int long long
const int N = 2e5 + 5, M = 2147483647;
int t, n, a[N];
signed main() {
    cin>>t;
    while(t--) {
        cin>>n;
        int ans = n;
        map<int, int> s;
        for(int i = 1; i <= n; i++) {
            cin>>a[i];
            s[a[i]]++;
        }
        sort(a + 1, a + n + 1);
        int k = unique(a + 1, a + n + 1) - a - 1;
        for(int i = 1; i <= k && a[i] <= M / 2; i++) if(s[M - a[i]]) ans -= min(s[a[i]], s[M - a[i]]);
        cout<<ans<<endl;
    }
}
```
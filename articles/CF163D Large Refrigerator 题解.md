给定 $V=a\\times b\\times c$，试求 $S=2\\times(ab+ac+bc)$ 的最小值。

暴搜暴搜！

推式子。由 $V=a\\times b\\times c$ 有 $a=\\dfrac V{bc}$，即 $bc=\\dfrac aV$。

而就有 $S=2\\times(ab+ac+bc)=2\\times(a(b+c)+bc)$。

由基本不等式，有 $b+c\\ge2\\sqrt{bc}$，所以 $a(b+c)+bc\\ge2a\\sqrt{bc}$，而 $2\\times(a(b+c)+bc)\\ge4a\\sqrt{bc}$，即 $S\\ge4a\\sqrt{bc}$。

有了上面的结论，我们令 $a\\le b\\le c$，则显然有 $a\\le\\sqrt[3]{V}$，且 $b\\le\\sqrt{\\dfrac Va}$，于是暴搜即可。

另外注意极大值的赋值，若为 $10^{18}$ 可能不够。

---

```cpp
#include <bits/stdc++.h>
using namespace std;
#define int long long
const int N = 1e5 + 5, INF = 0x3f3f3f3f3f3f3f3f; const double EPS = 1e-8;
int v, k, p[N], q[N], mxa, mxb, a, b, c, ansa, ansb, ansc, ans = INF;
inline int read() {
    int r = 0, f = 1;
    char c = getchar();
    while(c != '-' && (c < '0' || c > '9')) c = getchar();
    if(c == '-') {
        f = -1;
        c = getchar();
    }
    while(c >= '0' && c <= '9') {
        r *= 10; r += c - '0';
        c = getchar();
    }
    return r * f;
}
inline void write(int x) {
    if(x < 0) {
        putchar('-');
        x = -x;
    }
    if(x > 9) write(x / 10);
    putchar(x % 10 + '0');
}
void dfs2(int t, int s) {
    if(s > mxb) return;
    if(t == k + 1) {
        b = s, c = v / (a * b);
        if(a <= b && 2 * (a * b + b * c + a * c) < ans) {
            ans = 2 * (a * b + b * c + a * c);
            ansa = a, ansb = b, ansc = c;
        }
        return;
    }
    if(q[t]) {
        q[t]--;
        dfs2(t, s * p[t]);
        q[t]++;
    }
    dfs2(t + 1, s);
    // int u = 0, uu = uq[t];
    // for(int i = 1; i <= q[t] - uu && s * p[t] <= mxb; i++) {
    //     if(s * p[t] > mxb) break;
    //     s *= p[t], uq[t]++, u++;
    //     dfs2(t + 1, s);
    // }
    // while(u--) uq[t]--;
}
void dfs1(int t, int s) {
    if(s > mxa) return;
    if(t == k + 1) {
        a = s;
        b = (sqrt(v / a) + EPS);
        c = v / a / b;
        if(2 * (a * b + a * c + b * c) >= ans) return;
        if(4 * a * b + 2 * v / a < ans) {
            mxb = b;
            dfs2(1, 1);
        }
        return;
    }
    if(q[t]) {
        q[t]--;
        dfs1(t, s * p[t]);
        q[t]++;
    }
    dfs1(t + 1, s);
    // int u = 0, uu = uq[t];
    // for(int i = 1; i <= q[t] - uu && s * p[t] <= mxa; i++) {
    //     s *= p[t], uq[t]++, u++;
    //     dfs1(t + 1, s);
    // }
    // while(u--) uq[t]--;
}
void solve() {
    v = 1, a = b = c = 0, ans = INF;
    k = read();
    for(int i = 1; i <= k; i++) {
        p[i] = read(), q[i] = read();
        for(int j = 1; j <= q[i]; j++) v *= p[i];
    }
    mxa = pow(v, 1.0 / 3) + EPS;
    dfs1(1, 1);
    write(ans); putchar(' ');
    write(ansa); putchar(' ');
    write(ansb); putchar(' ');
    write(ansc); putchar('\n');
}
signed main() {
    int T = read();
    while(T--) solve();    
}
```
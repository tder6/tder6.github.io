水黑，人类智慧题。配合代码食用效果更佳。

首先，若原棋盘中有满足条件的子矩阵，则显然无解。称作「Type 1」。

接下来，我们考虑有否能确定的点。例如 $\begin{bmatrix}\tt{W}&\tt{B}\\\tt{B}&?\end{bmatrix}$ 的，我们应当将 $?$ 处改为 $\tt{B}$。我们不妨枚举每个 $?$ 处，再枚举至多四个包含该 $?$ 的子矩阵，如果该子矩阵满足：

- 只有一个 $?$；
- 不含 $?$ 的对角线相等；
- 除 $?$ 外，相邻两个不等。

那么显然应当将 $?$ 替换为与其相邻的字母。特别的，若多个子矩阵得出的答案不一样，则无解。

上述过程需要正反各重复一遍，以确保所有能确定的都被确定。称作「Type 2」。

最后还有一些不能确定的点，我们不妨暴力枚举，使用随机化，同时每次也可以使用上面的方法进行剪枝。称作「Type 3」。

---

```cpp
#include <bits/stdc++.h>
using namespace std;
#define int long long
const int N = 1e2 + 5;
int t, n, m; char a[N][N], r[N][N];
const int dx[4] = {-1, -1, 0, 0};
const int dy[4] = {-1, 0, -1, 0};
bool same(int x1, int y1, int x2, int y2) {
	return (a[x1][y1] == a[x2][y2]);
}
bool equal(int x1, int y1, int x2, int y2) {
	return (a[x1][y1] == a[x2][y2] || a[x1][y1] == '?' || a[x2][y2] == '?');
}
bool work(int x1, int y1, int x2, int y2) {
	return equal(x1, y1, x2, y2) && equal(x1, y2, x2, y1) && (!equal(x1, y1, x1, y2) || !equal(x1, y1, x2, y1) || !equal(x2, y1, x2, y2) || !equal(x1, y2, x2, y2));
}
char near(int x, int y, int x1, int y1, int x2, int y2) {
	int xx = x, yy = (y == y1 ? y2 : y1);
	return a[xx][yy];
}
bool certain(int x, int y) {
	return a[x][y] != '?';
}
bool run(int x1, int y1, int x2, int y2) {
	return certain(x1, y1) && certain(x1, y2) && certain(x2, y1) && certain(x2, y2) && same(x1, y1, x2, y2) && same(x1, y2, x2, y1) && !same(x1, y1, x1, y2);
}
int check(int x, int y) {
	if(x + 1 <= n && y + 1 <= m && run(x, y, x + 1, y + 1)) return 0; // Type 1
	if(a[x][y] != '?') return 1;
	for(int i = 0; i < 4; i++) {
		int nx = x + dx[i], ny = y + dy[i];
		if(nx < 1 || nx + 1 > n || ny < 1 || ny + 1 > m) continue;
		int b = 1;
		for(int xx = 0; xx < 2 && b; xx++) for(int yy = 0; yy < 2 && b; yy++) {
			int tx = nx + xx, ty = ny + yy;
			if((x != tx || y != ty) && a[tx][ty] == '?') b = 0;
		}
		if(!b) continue;
		if(work(nx, ny, nx + 1, ny + 1))
			if(a[x][y] != '?' && a[x][y] != near(x, y, nx, ny, nx + 1, ny + 1)) return 0;
			else a[x][y] = near(x, y, nx, ny, nx + 1, ny + 1);
	}
	return 1;
}
void solve() {
	cin>>n>>m;
	for(int i = 1; i <= n; i++) for(int j = 1; j <= m; j++) cin>>a[i][j];
	int b = 1;
	for(int i = 1; i <= n && b; i++) for(int j = 1; j <= m && b; j++) b = min(b, check(i, j)); // Type 2
	for(int i = n; i >= 1 && b; i--) for(int j = m; j >= 1 && b; j--) b = min(b, check(i, j));
	if(!b) {
		cout<<"NO"<<endl;
		return;
	}
	cout<<"YES"<<endl;
	while(1) { // Type 3
		memcpy(r, a, sizeof(r));
		b = 1;
		for(int i = 1; i <= n && b; i++) for(int j = 1; j <= m && b; j++) {
			b = min(b, check(i, j));
			if(a[i][j] == '?') a[i][j] = ((rand() % 2) ? 'B' : 'W');
		}
		for(int i = 1; i <= n && b; i++) for(int j = 1; j <= m && b; j++) b = min(b, check(i, j));
		if(b) break;
		memcpy(a, r, sizeof(a));
	}
	for(int i = 1; i <= n; i++) {
		for(int j = 1; j <= m; j++) cout<<a[i][j];
		cout<<endl;
	}
}
signed main() {
	srand(time(0));
	cin>>t;
	while(t--) solve();
}
```
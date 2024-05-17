---
title: nowcoder
date: 2023-10-25 13:30:37
tags:
---
先搞c输入输出（速度快），学java或者python的大数
## 高精度
### 加法
```
//基本的加减法
//数倒着写，然后用函数再反过来，倒着写的好处是进位可以直接加在后面

#include<bits/stdc++.h>
using namespace std;
string s1,s2;//竞赛多追求速度，写成全局变量不写含参函数可以提高代码运行速度
int a[1000],b[1000],c[1000];
/*void fanzhuan(string s1){
    int l = s1.length();
    for(int i = 0,j = l-1; i < j;i++,j--){
        swap(s[i],s[j]);
    }
}*/ //手动反转可以被reverse代替
void jiafa(){
    memset(a,0,sizeof(a));//给数组赋初值，这样严谨。不是只能0，-1，主要是这B 8 位一赋值，转成32位可能不一样，有的时候会赋0x7f（0111111101111111111111，很接近int的最大值，不用0xff是因为1111111111111111111是负数，但是0x7f在进行加法的时候容易变成负数，所以最常用的是0x3f 00111111100111111111111，这是个很大的值。
    memset(b,0,sizeof(b));
    memset(c,0,sizeof(c));
    int l1 = s1.length();
    int l2 = s2.length();
    //int l = max(s1,s2);//如果l1,l2长度不一致就GG了，所以就不传参了，直接三个数组存。
    for(int i = 0;i <l1;i++)
        a[i] = s1[i] -'0';//这样可以直接用减去0的asccl码的办法把S1从string 变成int.
    for(int i =0; i<l2;i++)
        b[i] = s2[i] - '0';
    int l = max(l1,l2);
    for(int i = 0; i<l;i++){
        c[i] += a[i]+b[i];
        if(c[i] >= 10){
            c[i+1] = c[i]/10;   //进位
            c[i] %= 10;
        }
    }
    if(c[l]!= 0)
        l++;           //进位后数组变长
    for(int i = 0;i<l;i++)
        cout<<c[i];
}
int main(void){
    cin>>s1>>s2;//检测空格
    //getline();//可以存在空格
    reverse(s1.begin(), s1.end());
    reverse(s2.begin(), s2.end());
    jiafa();
 return 0;
}
```
### 减法
```
//基本的减法
#include<bits/stdc++.h>
using namespace std;
string s1,s2;
int a[1000],b[1000],c[1000];
bool judge(string s1, string s2){
    int l1 = s1.length();
    int l2 = s2.length();
    if(l1>l2) return 1;
    if(l1<l2) return 0;
    for(int i = l1 -1;i>=0;i--){
        if(s1[i] > s2[i]) return 1;
        if(s1[i] < s2[i]) return 0;
    }return 1;
}
void jian(string s1,string s2){
    memset(a,0,sizeof(a));//给数组赋初值，这样严谨
    memset(b,0,sizeof(b));
    memset(c,0,sizeof(c));
    int l1 = s1.length();
    int l2 = s2.length();
    for(int i=0;i<l1;i++)
        a[i] = s1[i] - '0';
    for(int i =0;i<l2;i++)
        b[i] = s2[i] - '0';
    int l =max(l1,l2);
    for(int i =0;i<l;i++){
        c[i] += a[i] - b[i];
        if(c[i] < 0){
            c[i]+= 10;
            c[i+1]-=1;//减不够，借一位。
        }
    }
    while(l>1 && c[l-1] == 0)l--; //去掉前面的0，减成0可能有很多，用while,而且不能减没了
    for(int i = l-1; i>=0;i--){
        cout<<c[i];
    }
}
int main(){
    cin >>s1>>s2;
    reverse(s1.begin(), s1.end());
    reverse(s2.begin(), s2.end());
    if(judge(s1,s2) == 1) jian(s1,s2);
    else{
        cout<<"-";
        jian(s2,s1);
    }
return 0;
}
```
### 乘法
```
void cheng(string s1,string s2){
    memset(a,0,sizeof(a));
    memset(b,0,sizeof(b));
    memset(c,0,sizeof(c));
    int l1 = s1.length();
    int l2 = s2.length();
    for(int i=0;i<l1;i++)
        a[i] = s1[i] - '0';
    for(int i =0;i<l2;i++)
        b[i] = s2[i] - '0';
    int l = l1+l2-1;
    for(int i = 0;i <l1; i++)
    for(int j =0;j<l2;j++){
        c[i+j] +=a[i] * b[j];
    }
    for(int i =0;i <l;i++){
        if(c[i] >= 10)
        {
            c[i+1] += c[i] /10;//进位
            c[i]  %=10;
        }
    }
    while(c[l] >0){
        l++;
        if(c[l] >= 10){
            c[l+1] += c[l]/10;//可能l不够了
            c[l] %=10;
        }
    }
    for(int i = l-1; i>=0;i--){
        cout<<c[i];
    }

}
```
### 高精度除以低精度
```
void chu1(string s1,int x){
    memset(a,0,sizeof(a));
    memset(c,0,sizeof(c));
    int l1 = s1.length();
    for(int i=0;i<l1;i++)
        a[i] = s1[i] - '0';
        int yu =0;
    for(int i=0;i<l1;i++){
        int b =yu*10 +a[i];//b:被除数
        c[i] = b/x;
        yu =b % x;
    }
    int i =0;
    while(c[i] ==0)i++;
    for(;i< l1;i++)
        cout<<c[i];
    cout<<endl<<yu;

}
int main(){
    int x;
    cin >>s1>>x;
    chu1(s1,x);
return 0;
}
```
##1ku
###鸡兔同笼
```
#include<stdio.h>//塞瓦维斯特定理(不定方程)
//若两数a,b均大于1，且gcd(a,b)等于1（也就是a,b互为素数）。
//要满足ax+by=c无整数解的最大的c的值为a*b-a-b。
int main()
{
    long long int n, m,k;
    scanf("%lld%lld",&n,&m);
    k= n * m - n - m ;
    printf("%lld\n",k);
    return 0;
}
```
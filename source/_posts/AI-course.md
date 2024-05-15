---
title: AI_course
date: 2023-09-22 16:11:52
cover: OIP.jpeg
tags:
---

#lab 01
##1 
```
int main()
{
    //array of vectors
    int arr[5][2];
   //result vector
    int result[2]={0,0};
   for (int i=0;i<5;i++){
        cin>>arr[i][0];//x
        result[0]+= arr[i][0];
        cin>>arr[i][1];//y
        result[1]+=arr[i][1];
    }
    cout<< " The sum  vector is ("<< result[0]<< ", "<<result[1]<<')'<<endl;
}
```
##2 
![](OIP.jpeg)
```
// number of element in a vector
    int N=4;
int norm_L1(int arr[])
{
    long result = 0;
    for(int i=0;i<N;i++){
        result+=abs(arr[i]);
    }
    return  result;
}
double norm_L2(int arr[])
{
    double sqrSum=0;
    for(int i=0;i<N;i++){
        sqrSum+=arr[i]*arr[i];
    }
    return sqrt(sqrSum);
}
int main()
{
    int arr[N];
    for( int i=0;i<N;i++){
        cout<<"arr["<<i<<"]= ";
        cin>>arr[i];
    }
   cout<< "Vector's norm L1 = "<< norm_L1(arr)<<'\n';
    cout<< "Vecotr's norm L2 = "<< norm_L2(arr)<< '\n';
   return 0;
```


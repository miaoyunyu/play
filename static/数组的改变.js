//改变原数组的方法
// pop push unshift shift  splice reverse sort
//
// 不改变
// indexof  lastindexof concat  slice  filter

//forEach ; for in ; for of;
// filter   过滤
// map      映射
// some
// every
// reduce
// includes （es6）
// find     (es6)




var arry=['1','2','3'];
arry.b='name';
arry.forEach(function (item,index) {
    //有return
    console.log(item)
});

for(let key in arry){
    //key是字符串类型  包括私有属性但是字符串
    console.log(key)
}

for(let value of arry){
    console.log(value)
    //有return  不能对象
}


//filter 可用于 册除

//原数组不改变
//返回:true 放新数组中
//返回:false 不放



let oldArry=['1','2','3','4','5']
let arry0=oldArry.filter(function (item) {
    return item>2
});
console.log(oldArry);
console.log(arry0);

//map  可用于更新

//原数组不改变
//返回新数组, return 什么就是什么

//es6模板字符串 遇到变量用 ${}
//'<li>${item}<li>'



let ary=[1,2,3].map(function (item) {
    return'<li>${item}<li>'

});

console.log('-------map');
console.log(ary);


//includes  找到当前项。
//返回是 true/false 布尔


let arry1=['2','333','4'];


console.log('-------includes');
console.log(arry1.includes(3));


//find
// 原数组不改变
// 返回 找到具体一项是谁 找到true 找不到undefined

let arry2=['2','3333','4'];
let result=arry2.find(function (item,index) {
    return item.toString().indexOf(3)>-1
});

console.log('-------find');
console.log(result);


//some  找true   找到true才停止  返回 true  找不到返回false
//every 找false   s找到false才停止  返回 false


//reduce(4个参数,第一次)
//原数组不改变
//prev,next,index,item
//上一次 下一次 索引 当前项目

//循环返回的结果就会被当作 第二次的上一次


let arry3=[1,2,3];

let sum=arry3.reduce(function (prev,next,index,item) {
   //return arguments
    return prev+next;
});
console.log('________求合');

console.log(sum);


let arry4=[{price:30,count:2},{price:10,count:3}]

let sum2=arry4.reduce(function (prev,next) {
    return prev+next.price*next.count
},0);
console.log('________求多个参数合');

console.log(sum2);

//二维数组转 一维数组

let flat=[[1,3,4],[2,4,5],[3,4,5]].reduce(function (prev,next) {

   return prev.concat(next)
});

 console.log(flat);
//

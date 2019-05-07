

//没有 this 没有  arguments

function a(b) {
    return b+1
}


// 1.箭头函数没有function  把它当作一个字义去定

// function a(){}
// let a=

// 2.一定参数可以去掉（）

// function a(b){}
// let a=b

//3.(){} 变成=>
// function a(b){}
// let a=b=>

//4.不加大口号代表 return 结果

// function a(b){return bb+1 }
// let a=b=>{return bb+1 }
// let a=b=> bb+1



function aa(b){
    return function (c) {
        return b+c
    }
}


// let aa=b=> c=>b+c;

console.log(aa(1)(2));

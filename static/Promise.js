
// promise.resolve 成功

// promise.reject  失败

// promise.race 多个任务执行返回结果

// promise.all 多任务同时执行，全成功返回数组，有失败，只返回失败

//天生自带的方法

// promise.prototype.then

// onFulfilled 是用来接收promise成功的值
// onRejected 是用来接收promise失败的原因
//promise.then(onFulfilled, onRejected);

// promise.prototype.catch


//都是函数所有执行的也是函数


//原理----------------------------------------------------------------------------------------------------


        let a=new Promise((resolve,reject)=>{
            setTimeout(()=>{
                if(Math.random()>1){
                    resolve("no")
                }else{
                    reject("yes")
                }
            },1000)

        })

        a.then((data)=>{console.log(data)},(data)=>{console.log(data)})

//成功状态----------------------------------------------------------------------------------------------------

        function aa(){
            setTimeout(()=>{
                    console.log("resolve")
            },1000)
        }
        let aatest=new Promise(aa);

        console.log(aatest)



//all的使用------------------------------------------------------------------------------------------------------------------

        let Promise1 = new Promise(function(resolve, reject){})
        let Promise2 = new Promise(function(resolve, reject){})
        let Promise3 = new Promise(function(resolve, reject){})

        let p = Promise.all([Promise1, Promise2, Promise3])

        p.then(funciton(){
        // 三个都成功则成功  
        }, function(){
        // 只要有失败，则失败 
        })

//链式写法----------------------------------------------------------------------------------------------------

            let p = new Promise(function(resolve, reject){
                setTimeout(function(){
                    let num = Math.random()
                    if (num > 0.5) {
                        resolve(num)
                    }else{
                        reject(num)
                    }
                }, 1000)
            })

            p.then(function(num){
                
                return num
            },function(num){
                return num
            }).then(function(num){
                console.log('大于0.5的数字：', num)
            },function(num){
                console.log('小于等于0.5的数字', num)
            })

//------------------------------------------------------------------------------------------------------------------

        let readFile = require('fs').readFile; // 加载node内置模块fs 利用readFile方法异步访问文件
        function getFile(url){  // 创建一个读取文件方法
            return new Promise(function(resolve, reject){  // 返回一个Promise对象
                readFile(url, 'utf8', function(err,data){  // 读取文件  
                    resolve(data)  // 调用成功的方法
                })
            })
        }
        getFile('1.txt').then(function(data){  // then方法进行链式调用
            console.log(data)  // 2.txt
            return getFile(data)    //拿到了第一次的内容用来请求第二次
        }).then(function(data){
            console.log(data)  // 3.txt
            return getFile(data)  //拿到了第二次的内容用来请求第三次
        }).then(function(data){
            console.log(data)  // 完成
        })

//------------------------------------------------------------------------------------------------------

        // 捕获错误的方法，在原型上有catch方法，返回一个没有resolve的then结果即可
        Promise.prototype.catch = function (callback) {
            return this.then(null, callback)
        }
        // 解析全部方法，接收一个Promise数组promises,返回新的Promise，遍历数组，都完成再resolve
        Promise.all = function (promises) {
            //promises是一个promise的数组
            return new Promise(function (resolve, reject) {
                let arr = []; //arr是最终返回值的结果
                let i = 0; // 表示成功了多少次
                function processData(index, y) {
                    arr[index] = y;
                    if (++i === promises.length) {
                        resolve(arr);
                    }
                }
                for (let i = 0; i < promises.length; i++) {
                    promises[i].then(function (y) {
                        processData(i, y)
                    }, reject)
                }
            })
        }
        // 只要有一个promise成功了 就算成功。如果第一个失败了就失败了
        Promise.race = function (promises) {
            return new Promise(function (resolve, reject) {
                for (var i = 0; i < promises.length; i++) {
                    promises[i].then(resolve,reject)
                }
            })
        }
        // 生成一个成功的promise
        Promise.resolve = function(value){
            return new Promise(function(resolve,reject){
                resolve(value);
            })
        }
        // 生成一个失败的promise
        Promise.reject = function(reason){
            return new Promise(function(resolve,reject){
                reject(reason);
            })
        }






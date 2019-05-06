原理：H5  history.pushState(‘ '',’ ',’/aaa’),   

路由默认 hash 哈西模式  不支持 seo

路由是基于VUE  所以一定要先引 vue 再引 vue-router

npm install --save vue-router
______________________________________________________________________


使用方式1：
            <router-link to="/GanttIndex">进入甘特图</router-link>

使用方式2：
            const userId = '123';

            this.$router.push({path:`/user/${userId}`}); //->/user/123

            this.$router.push({name:'user', params:{userId}}); //->/user/123

            //这里的 params 不生效
            this.$router.push({path:'/user', params:{userId}}); //->/user

            this.$router.push({
                path: '/statisticsDetail',
                query: {
                        type: type,
                        title: title,
                        id:this.$route.params.id
                        }
                })//query是带的参数
                

            this.$router.replace()

            this.$router.go(n)  相对于当前页面向前或向后跳转多少个页面

 路由传参的方式：

            1、手写完整的 path:

                this.$router.push({path: `/user/${userId}`});

                获取参数：this.$route.params.userId

            2、用 params 传递： 相当于 post 请求，参数不在地址栏中显示。

                this.$router.push({name:'user', params:{userId: '123'}});

                获取参数：this.$route.params.userId

                url 形式：url 不带参数，http:localhost:8080/#/user

            3、用 query 传递： 相当于 get 请求，页面跳转的时候可以在地址栏看到请求参数

                this.$router.push({path:'/user', query:{userId: '123'}});

                获取参数：this.$route.query.userId

                url 形式：url 带参数，http:localhost:8080/#/user?userId=123


注：

router跳转到不同的url，但这个方法会向history栈添加一个记录，点击后退会返回到上一个页面。

replace 描述：同样是跳转到指定的url，但是这个方法不会向history里面添加新的记


监听

watch: {
    '$route' (to, from) {}
}

//-------------------------------------------------------------------------------------------------------------------


配置 router  3.0 版本


页面：App.vue 

    <template>
        <div>
        <router-view></router-view>
        </div>
    </template>

    <script>
        export default {
        }
    </script>



单页引router的方法：

                页面：main.js

                import Router from 'vue-router';
                import index from './components/index.vue';
                import GanttIndex from './components/GanttIndex.vue';
                import Gantt from './components/Gantt.vue';

                Vue.use(Router);

                const router = new Router({
                        routes: [
                                    {
                                    path: '/',
                                    component: GanttIndex
                                    },
                                    {
                                    path: '/index',
                                    component: index
                                    },
                                    {
                                    path: '/GanttIndex',
                                    component: GanttIndex
                                    },
                                    {
                                    path: '/Gantt',
                                    component: Gantt
                                    },
                        ]
                });

//-------------------------------------------------------------------------------------------------------------------


多页引router的方法： (首先要在src/ 建一个router /index.js )

                页面：main.js

                   首先要在src/ 建一个router /index.js 

                    import router from './router/index.js'

                    new Vue({
                            router,
                            render: h => h(App),
                            }).$mount('#app')


                页面：router/index.js 


                    import Vue from "vue"; //用哪个模板要先引进来 
                    import Router from "vue-router";//用哪个模板要先引进来 
                    import index from '../components/index.vue';//用哪个模板要先引进来 
                    import GanttIndex from '../components/GanttIndex.vue';//用哪个模板要先引进来 
                    import Gantt from '../components/Gantt.vue';//用哪个模板要先引进来 
                    
                    Vue.use(Router);  //在vue上调路由方法

                    export default new Router({
                            mode: 'history',  //处理模式
                            routes: [
                                {
                                path: '/',   //url地址
                                component: index   //对应的模板
                                },
                                {
                                path: '/index',
                                component: index
                                },
                                {
                                path: '/GanttIndex',
                                component: GanttIndex
                                },
                                {
                                path: '/Gantt',
                                component: Gantt
                                },
                                { path: '/user/:id',
                                 component: User 
                                }
                            ]
                    });

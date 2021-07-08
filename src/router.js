import Vue from 'vue'
import Router from 'vue-router'

const store = require('./store').default

Vue.use(Router)

const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [{
            path: '/auth',
            component: () =>
                import ('@/views/pages/Index'),
            name: 'Auth',
            children: [{
                    name: 'Login',
                    path: 'login',
                    component: () =>
                        import ('@/views/pages/Login')
                },
                {
                    name: 'Register',
                    path: 'register',
                    component: () =>
                        import ('@/views/pages/Register')
                }
            ]
        },
        {
            path: '/pages',
            component: () =>
                import ('@/views/pages/Index'),
            children: [{
                    name: 'Login',
                    path: 'login',
                    component: () =>
                        import ('@/views/pages/Login')
                },
                {
                    name: 'Register',
                    path: 'register',
                    component: () =>
                        import ('@/views/pages/Register')
                }
            ]
        },
        {
            path: '/',
            component: () =>
                import ('@/views/dashboard/Index'),
            children: [
                // User
                {
                    name: 'UserList',
                    path: 'users/listuser',
                    component: () =>
                        import ('@/views/dashboard/users/listuser')
                },
                {
                    name: 'User Add',
                    path: 'users/adduser',
                    component: () =>
                        import ('@/views/dashboard/users/adduser')
                },
                {
                    name: 'UserUpdate',
                    path: 'users/updateuser/:userId',
                    component: () =>
                        import ('@/views/dashboard/users/updateuser')
                },

            ]
        },
        {
            path: '/',
            component: () =>
                import ('@/views/dashboard/Index'),
            children: [
                // Category
                {
                    name: 'Category List',
                    path: 'category/listcate',
                    component: () =>
                        import ('@/views/dashboard/category/listcate')
                },
                {
                    name: 'Category Add',
                    path: 'category/addcate',
                    component: () =>
                        import ('@/views/dashboard/category/addcate')
                },
                {
                    name: 'Category Update',
                    path: 'category/updatecate/:cateId',
                    component: () =>
                        import ('@/views/dashboard/category/updatecate')
                },

            ]
        },
        {
            path: '/',
            component: () =>
                import ('@/views/dashboard/Index'),
            children: [
                // Book
                {
                    name: 'Book List',
                    path: 'book/listbook',
                    component: () =>
                        import ('@/views/dashboard/book/listbook')

                },
                {
                    name: 'Book Add',
                    path: 'book/addbook',
                    component: () =>
                        import ('@/views/dashboard/book/addbook')
                },
                {
                    name: 'Book Update',
                    path: 'book/updatebook/:bookId',
                    component: () =>
                        import ('@/views/dashboard/book/updatebook')
                },

            ]
        },
        {
            path: '/home',
            component: () =>
                import ('@/views/dashboard/homepage/Index2'),
            name: 'Home',
            children: [{
                    name: 'Index',
                    path: 'index',
                    component: () =>
                        import ('@/views/dashboard/homepage/Home')
                },
                {
                    name: 'Test',
                    path: 'test',
                    component: () =>
                        import ('@/views/dashboard/Charts')
                }
            ]
        },
        {
            path: '/admin',
            component: () =>
                import ('@/views/dashboard/Index'),
        },
        {
            path: '*',
            component: () =>
                import ('@/views/pages/Index'),
            children: [{
                name: '404 Error',
                path: '',
                component: () =>
                    import ('@/views/pages/Error')
            }]
        }
    ]
})

router.beforeEach((to, from, next) => {
    const token = store.getters.GET_TOKEN;
    if (to.name === 'Register' && !token) {
        return next();
    }

    if (to.name !== 'Login' && !token) {
        next({ name: 'Login' })
    } else if (to.name === 'Login' && token) {
        next({ name: 'Dashboard' })
    } else next()
})

export default router;
import { createWebHistory, createRouter, Router } from 'vue-router'
import Books from '../components/Books.vue'
import AddBook from '../components/AddBook.vue'
import EditBook from '../components/EditBook.vue'
import Wishlist from '../components/Wishlist.vue'
import Login from '../components/Login.vue'
import { firebase } from '../firebase/init'

const router: Router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Books',
      component: Books
    },
    {
      path: '/wishlist',
      name: 'Wishlist',
      component: Wishlist
    },
    {
      path: '/add',
      name: 'AddBook',
      component: AddBook,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/edit/:id',
      name: 'EditBook',
      component: EditBook,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    }
  ]
})

router.beforeEach((to, from, next) => {
  // check if route requires auth
  if (to.matched.some(rec => rec.meta.requiresAuth)) {
    // check auth state of user
    let user = firebase.auth().currentUser
    if (user) {
      //user signed in, proceed to route
      next()
    } else {
      //no way
      next({ name: 'Login' })
    }
  } else {
    next()
  }
})

export default router

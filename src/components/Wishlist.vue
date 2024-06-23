<template>
  <section class="container">
    <transition
      appear
      appear-class="title-hidden"
      appear-to-class="title-shown"
      appear-active-class="title-shown-active"
    >
      <h1 class="center-align">Хочу прочитать</h1>
    </transition>
    <transition
      appear
      appear-class="list-hidden"
      appear-to-class="list-shown"
      appear-active-class="list-shown-active"
    >
      <div>
        <form class="add" @submit.prevent="addToWishlist">
          <div class="add__field">
            <label for="add__author">Автор</label>
            <input id="add__author" type="text" v-model="book.author">
          </div>
          <div class="add__field">
            <label for="add__title">Название</label>
            <input id="add__title" type="text" v-model="book.title">
          </div>
          <p v-if="error" class="feedback center">Заполни хотя бы название, камон</p>
          <button type="submit" class="btn deep-purple darken-1 add__btn">Добавить</button>
        </form>
        <!-- TODO: search the books -->
        <ul class="collection">
          <li v-for="book in list" :key="book.id" class="collection-item">
            <div class="collection-item__title">
              <span class="material-icons deep-purple-text">book</span>
              <span>{{ book.author }}{{'&nbsp;–&nbsp;'}}{{ book.title }}</span>
            </div>
            <button class="done deep-purple lighten-1 btn-small" @click="markBookAsRead(book)">Прочитано</button>
          </li>
        </ul>
      </div>
    </transition>
  </section>
</template>

<script setup>
import { db } from '../firebase/init'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const list = ref([]);
const book = ref({
  author: null,
  title: null
});
const error = ref(false)
const router = useRouter()

onMounted(() => {
  db.collection('wanna-read').get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        let book = doc.data();
        book.id = doc.id;
        list.value.push(book);
      })
    })
})

const addToWishlist = (event) => {
  if (book.value.title) {
    db.collection('wanna-read').add({
      author: book.value.author,
      title: book.value.title,
    }).then(() => {
      list.value.push({
        author: book.value.author,
        title: book.value.title,
      })
      book.value.author = '';
      book.value.title = '';
    }).catch(err => console.log(err))
    error.value = false
  } else {
    error.value = true;
  }
}

const markBookAsRead = (book) => {
  sessionStorage.setItem('book-author', book.author);
  sessionStorage.setItem('book-title', book.title);
  sessionStorage.setItem('book-id', book.id);
  router.push({ name: 'AddBook' });
}
</script>

<style scoped>
  .list-hidden,
  .title-hidden {
    opacity: 0;
  }
  .list-shown,
  .title-shown {
    opacity: 1;
  }
  .list-shown-active,
  .title-shown-active {
    transition: all 0.3s ease;
  }
  .container {
    margin-bottom: 40px;
  }
  .collection {
    margin-top: 40px;
    container-type: inline-size;
  }
  .collection-item {
    display: flex;
    align-items: center;
    font-size: 17px;
  }
  .collection-item__title {
    display: flex;
    align-items: center;
    gap: 15px;
  }
  .done {
    margin-left: auto;
  }

  .add {
    margin-top: 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 20px;
    position: relative;
  }
  .add input {
    font-size: 18px;
  }
  .add input[type=text]:focus:not([readonly]) {
    border-bottom: 1px solid #4527a0;
    box-shadow: 0 1px 0 0 #4527a0;
  }

  .add__btn {
    display: block;
    flex: 1;
  }
  .add__field {
    flex: 3;
  }

  .feedback {
    position: absolute;
    top: -50%;
  }

  @container (max-width: 480px) {
    .collection .collection-item {
      flex-direction: column;
      gap: 10px;
      align-items: flex-start;
      padding: 15px;
    }

    .collection-item__title {
      gap: 10px;
    }
  }

  @media (width < 700px) {
    .add {
      display: block;
    }

    .add__btn {
      margin: 20px auto 0;
    }

    .feedback {
      position: static;
    }
  }
</style>

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
      <ul class="collection">
        <li v-for="book in list" :key="book.id" class="collection-item">
          <div class="collection-item__title">
            <span class="material-icons deep-purple-text">book</span>
            <span>{{ book.author }}{{'&nbsp;–&nbsp;'}}{{ book.title }}</span>
          </div>

          <!-- // TODO: on click:
          // remember current author and title (store or just sessionStorage?)
          // remove book from this list
          // go to the form of adding new book and paste author and title of the book
          // clear sessionStorage -->
          <button class="done deep-purple lighten-1 btn-small">Прочитано</button>
        </li>
      </ul>
      <!-- // TODO: form "author + title" to add a new wanna-read -->
    </transition>
  </section>
</template>

<script setup>
const list = [
  { id: 1, author: 'Стивен Кинг', title: 'Тёмная башня'},
  { id: 2, author: 'Джо Хилл', title: 'Рога'},
  { id: 3, author: 'Уильям Голдинг', title: 'Повелитель мух'},
  { id: 4, author: 'Стивен Кинг', title: 'Сияние'},
  { id: 5, author: 'Салли Руни', title: 'Разговоры с друзьями'},
  { id: 6, author: 'Мария Корелли', title: 'Скорбь сатаны'},
  { id: 7, author: 'Ева Меркачёва', title: 'Град обречённых'},
  { id: 8, author: 'Ричард Матесон', title: 'Я – легенда'},
]
</script>

<style>
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
</style>

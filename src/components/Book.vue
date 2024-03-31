<template>
    <transition
        appear
        appear-class="book-hidden"
        appear-to-class="book-shown"
        appear-active-class="book-shown-active"
    >
        <article class="book col xl4 m6 s12">
            <div class="card deep-purple lighten-4">
                <button class="material-icons deep-purple-text right book__delete" @click.prevent="deleteBook(book.id)">delete</button>
                <div class="card-content">
                    <h3 class="card-title book__title">{{ book.title }}</h3>
                    <p class="book__description">{{ book.description }}</p>
                </div>
                <div class="card-action">
                    <p v-if="book.author" class="book__author">Автор: {{ book.author }}</p>
                    <p v-if="book.year" class="book__year">Год выпуска: {{ book.year }}</p>
                    <p class="book__read-year deep-purple-text">Прочитано в {{ book.readYear }}</p>
                </div>
                <span class="btn-floating btn white">
                    <router-link :to="{ name: 'EditBook', params: {id: book.id} }"><i class="material-icons deep-purple-text">edit</i></router-link>
                </span>
            </div>
        </article>
    </transition>
</template>

<script>
export default {
    name: 'Book',
    props: ['book'],
    methods: {
        deleteBook(id) {
            this.$emit('delete', {
                id: this.book.id
            })
        }
    }
}
</script>

<style>
    .book-hidden {
        opacity: 0;
    }
    .book-shown {
        opacity: 1;
    }
    .book-shown-active {
        transition: all 0.7s ease;
    }
    .book {
        margin-bottom: 25px;
    }
    .book.col.xl4 {
        margin-left: 0;
    }
    .book .book__title {
        margin-top: 0;
        font-weight: 500;
    }

    .book__description {
        font-size: 17px;
    }

    .book__author {
        margin: 0;
    }

    .book__year {
        margin: 0;
    }
    .book__delete {
        padding: 0;
        background-color: transparent;
        border: none;
        padding: 10px;
        transition: all 0.2s ease-in-out;
        position: absolute;
        right: 0;
    }
    .book__delete:hover,
    .book__delete:focus {
        background-color: transparent;
        opacity: 0.7;
    }
    .book__read-year {
        margin: 5px 0 0;
        font-size: 13px;
    }

    .btn-floating {
      position: absolute;
      right: 10px;
      bottom: 10px;
    }

    .card {
      height: 100%;
      display: flex;
      flex-direction: column;
    }

    .card .card-content {
      flex-grow: 1;
    }
</style>

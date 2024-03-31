<template>
    <section class="container">
        <transition
            appear
            appear-class="title-hidden"
            appear-to-class="title-shown"
            appear-active-class="title-shown-active"
        >
            <h1 class="center">Добавить книгу</h1>
        </transition>
        <transition
            appear
            appear-class="form-hidden"
            appear-to-class="form-shown"
            appear-active-class="form-shown-active"
        >
            <form class="add" @submit.prevent="addBook">
                <div class="add__field">
                    <label for="add__title">Название</label>
                    <input id="add__title" type="text" v-model="title">
                </div>
                <div class="add__field">
                    <label for="add__descr">Описание</label>
                    <textarea id="add__descr" class="materialize-textarea" v-model="description" />
                </div>
                <div class="add__field">
                    <label for="add__author">Автор</label>
                    <input id="add__author" type="text" v-model="author">
                </div>
                <div class="add__field">
                    <label for="add__year">Год выпуска</label>
                    <input id="add__year" type="text" v-model="year">
                </div>
                <div class="add__field">
                    <label for="add__year">Прочитано в</label>
                    <input id="add__year" type="text" v-model="readYear">
                </div>
                <p v-if="feedback" class="feedback center">Заполни хотя бы название, камон</p>
                <button type="submit" class="btn-large deep-purple darken-3 add__btn">Добавить</button>
            </form>
        </transition>
    </section>
</template>

<script>
import { db } from '../firebase/init'

export default {
    name: 'AddBook',
    data() {
        return {
            title: null,
            description: null,
            author: null,
            year: null,
            readYear: null,
            feedback: false
        }
    },
    methods: {
        addBook() {
            if (this.title) {
                db.collection('books').add({
                    title: this.title,
                    description: this.description,
                    author: this.author,
                    year: this.year,
                    readYear: this.readYear
                }).then(() => {
                    this.$router.push({ name: 'Books' })
                }).catch(err => console.log(err))
                this.feedback = false
            } else {
                this.feedback = true;
            }
        }
    }
}
</script>

<style>
.add {
    margin-top: 40px;
}
.add input, .add textarea {
    font-size: 18px;
}
.add input[type=text]:focus:not([readonly]), .add textarea:focus:not([readonly]) {
    border-bottom: 1px solid #4527a0;
    box-shadow: 0 1px 0 0 #4527a0;
}
.add__btn {
    display: block;
    margin: 40px auto 0;
}
.form-hidden,
.title-hidden {
    opacity: 0;
}
.form-shown,
.title-shown {
    opacity: 1;
}
.title-shown-active {
    transition: all 0.3s ease;
}
.form-shown-active {
    transition: all 0.7s ease;
}
</style>

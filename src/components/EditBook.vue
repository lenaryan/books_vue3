<template>
    <section class="container">
        <transition
            appear
            appear-class="title-hidden"
            appear-to-class="title-shown"
            appear-active-class="title-shown-active"
        >
            <h1 class="center">Редактировать книгу</h1>
        </transition>
        <transition
            appear
            appear-class="form-hidden"
            appear-to-class="form-shown"
            appear-active-class="form-shown-active"
        >
            <form class="edit" @submit.prevent="editBook">
                <div class="edit__field">
                    <label for="edit__title">Название</label>
                    <input id="edit__title" type="text" v-model="book.title">
                </div>
                <div class="edit__field">
                    <label for="edit__descr">Описание</label>
                    <textarea id="edit__descr" class="materialize-textarea" v-model="book.description" />
                </div>
                <div class="edit__field">
                    <label for="edit__author">Автор</label>
                    <input id="edit__author" type="text" v-model="book.author">
                </div>
                <div class="edit__field">
                    <label for="edit__year">Год выпуска</label>
                    <input id="edit__year" type="text" v-model="book.year">
                </div>
                <div class="add__field">
                    <label for="add__year">Прочитано в</label>
                    <input id="add__year" type="text" v-model="book.readYear">
                </div>
                <p v-if="feedback" class="feedback center">Заполни хотя бы название, камон</p>
                <button class="btn-large deep-purple darken-3 edit__btn">Изменить</button>
            </form>
        </transition>
    </section>
</template>

<script>
import { db } from '../firebase/init'

export default {
    name: 'EditBook',
    data() {
        return {
            book: null,
            feedback: false
        }
    },
    created() {
        let ref = db.collection('books').doc(this.$route.params.id)
        ref.get().then(doc => {
            this.book = doc.data()
            this.book.id = doc.id
        })
    },
    methods: {
        editBook() {
            if (this.book.title) {
                db.collection('books').doc(this.book.id).update({
                    title: this.book.title,
                    description: this.book.description,
                    author: this.book.author,
                    year: this.book.year,
                    readYear: this.book.readYear
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
.edit {
    margin-top: 40px;
}
.edit input, .edit textarea {
    font-size: 18px;
}
.edit input[type=text]:focus:not([readonly]), .edit textarea:focus:not([readonly]) {
    border-bottom: 1px solid #4527a0;
    box-shadow: 0 1px 0 0 #4527a0;
}
.edit__btn {
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
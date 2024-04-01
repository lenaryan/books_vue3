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
                    <label for="add__readYear">Прочитано в</label>
                    <input id="add__readYear" type="text" v-model="readYear">
                </div>
                <p v-if="error" class="feedback center">Заполни хотя бы название, камон</p>
                <button type="submit" class="btn-large deep-purple darken-3 add__btn">Добавить</button>
            </form>
        </transition>
    </section>
</template>

<script>
import { db } from '../firebase/init'
import { ref } from 'vue'

export default {
    name: 'AddBook',
    setup() {
        let error = ref(false)
        // const book = ref({
        //     title: null,
        //     description: null,
        //     author: null,
        //     year: null,
        //     readYear: null,
        // })
        const title = ref(null);
        const description = ref(null);
        const author = ref(null);
        const year = ref(null);
        const readYear = ref(null);

        const addBook = () => {
            if (title.value) {
                console.log('before add');
                db.collection('books').add({
                    title: title.value,
                    description: description.value,
                    author: author.value,
                    year: year.value,
                    readYear: readYear.value
                }).then(() => {
                    console.log('then');
                    this.$router.push({ name: 'Books' })
                }).catch(err => console.log(err))
                error.value = false
            } else {
                error.value = true;
            }
        }

        return { error, addBook, title, description, author, year, readYear }
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

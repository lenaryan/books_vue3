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
                <p v-if="error" class="feedback center">Заполни хотя бы название, камон</p>
                <button class="btn-large deep-purple darken-3 edit__btn">Изменить</button>
            </form>
        </transition>
    </section>
</template>

<script>
import { onMounted, ref } from 'vue';
import { db } from '../firebase/init'

export default {
    name: 'EditBook',
    setup() {
        let book = ref({
            title: null,
            description: null,
            author: null,
            year: null,
            readYear: null
        });
        let error = ref(false);

        onMounted(() => {
            let ref = db.collection('books').doc(this.$route.params.id)
            ref.get().then(doc => {
                book.value = doc.data()
                book.value.id = doc.id
            })
        })

        const editBook = () => {
            if (book.value.title) {
                db.collection('books').doc(book.value.id).update({
                    title: book.value.title,
                    description: book.value.description,
                    author: book.value.author,
                    year: book.value.year,
                    readYear: book.value.readYear
                }).then(() => {
                    this.$router.push({ name: 'Books' })
                }).catch(err => console.log(err))
                error.value = false
            } else {
                error.value = true;
            }
        }

        return { error, book, editBook }
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
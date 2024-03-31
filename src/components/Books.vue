<template>
    <section class="all-books container">
        <transition
            appear
            appear-class="title-hidden"
            appear-to-class="title-shown"
            appear-active-class="title-shown-active"
        >
            <h1>Все книги</h1>
        </transition>
        <transition
            appear
            appear-class="yr-hidden"
            appear-to-class="yr-shown"
            appear-active-class="yr-shown-active"
        >
          <!-- // TODO: split to components -->
            <div class="row switch">
                <button class="deep-purple lighten-1 btn switch__btn" @click="filterBooks">Все</button>
                <button v-for="(rYear, index) in readYearsArr" :key="index" class="deep-purple lighten-1 btn switch__btn" @click="filterBooks">{{ rYear }}</button>
            </div>
        </transition>
        <div class="row books-row">
            <Book v-for="book in filteredBooks" :key="book.id" :book="book" @delete="deleteBook" />
        </div>
    </section>
</template>

<script>
import Book from './Book.vue'
import { db } from '../firebase/init'

export default {
    name: 'Books',
    components: {
        Book
    },
    data() {
        return {
            books: [],
            filteredBooks: [],
            readYearsArr: []
        }
    },
    created() {
        let readYears = new Set();

        db.collection('books').get()
            .then(snapshot => {
                snapshot.forEach(doc => {
                    let book = doc.data();
                    book.id = doc.id;
                    this.books.push(book);
                    readYears.add(book.readYear);
                })
            }).then(() => {
                    this.readYearsArr = Array.from(readYears).sort((a,b) => (b - a));
                }
            )
        this.filteredBooks = this.books
    },
    methods: {
        deleteBook(data) {
            db.collection('books').doc(data.id).delete()
                .then(() => {
                    this.books  = this.books.filter(book => book.id != data.id)
                })
        },
        filterBooks(e) {
            //changing classes in switcher
            document.querySelectorAll('.darken-1').forEach(item => item.className = item.className.replace('darken', 'lighten'))
            e.target.className = e.target.className.replace('lighten', 'darken');

            if (Number.parseInt(e.target.innerText)) {
                this.filteredBooks = this.books.filter(book => book.readYear == e.target.innerText)
            }
            else {
                this.filteredBooks = this.books
            }
        }
    }
}
</script>

<style>
    .switch {
        display: flex;
        align-items: center;
        margin: 40px 0 20px;
        flex-wrap: wrap;
    }
    .switch__btn {
        margin-right: 10px;
        margin-bottom: 10px;
        width: 70px;
        flex-shrink: 0;
    }
    .books-row {
        margin-right: -0.75rem;
        margin-left: -0.75rem;
        display: flex;
        flex-wrap: wrap;
    }
    .yr-hidden,
    .title-hidden {
        opacity: 0;
    }
    .yr-shown,
    .title-shown {
        opacity: 1;
    }
    .yr-shown-active,
    .title-shown-active {
        transition: all 0.3s ease;
    }
</style>

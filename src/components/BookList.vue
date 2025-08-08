<script>
import { ref, onMounted } from 'vue';
import db from '../Firebase/init.js';
import {
  collection,
  query,
  where,
  orderBy,
  limit,
  getDocs,
  deleteDoc,
  doc,
  updateDoc
} from 'firebase/firestore';

export default {
  setup() {
    const books = ref([]);
    const editId = ref(null);
    const editName = ref('');
    // 查询方式
    const fetchType = ref('where');
    // Add message for feedback
    const message = ref('');

    // 查询函数
    const fetchBooks = async () => {
      try {
        let q;
        if (fetchType.value === 'where') {
          q = query(collection(db, 'books'), where('isbn', '>', 1000));
        } else if (fetchType.value === 'orderby') {
          q = query(collection(db, 'books'), orderBy('isbn', 'desc'));
        } else if (fetchType.value === 'limit') {
          q = query(collection(db, 'books'), limit(2));
        } else {
          q = query(collection(db, 'books'));
        }
        const querySnapshot = await getDocs(q);
        const booksArray = [];
        querySnapshot.forEach((docSnap) => {
          booksArray.push({ id: docSnap.id, ...docSnap.data() });
        });
        books.value = booksArray;
        message.value = ''; // 查询时清空消息
      } catch (error) {
        console.error('Error fetching books: ', error);
        message.value = '获取书籍时出错';
      }
    };

    // 删除
    const deleteBook = async (id) => {
      try {
        await deleteDoc(doc(db, 'books', id));
        message.value = '删除成功';
        await fetchBooks();
      } catch (error) {
        console.error('Error deleting book: ', error);
        message.value = '删除失败';
      }
    };

    // 编辑
    const startEdit = (book) => {
      editId.value = book.id;
      editName.value = book.name;
    };

    const cancelEdit = () => {
      editId.value = null;
      editName.value = '';
    };

    const saveEdit = async (book) => {
      try {
        await updateDoc(doc(db, 'books', book.id), { name: editName.value });
        editId.value = null;
        editName.value = '';
        message.value = '更新成功';
        await fetchBooks();
      } catch (error) {
        console.error('Error updating book: ', error);
        message.value = '更新失败';
      }
    };

    // 切换查询方式
    const setFetchType = (type) => {
      fetchType.value = type;
      fetchBooks();
    };

    onMounted(() => {
      fetchBooks();
    });

    return {
      books,
      editId,
      editName,
      fetchType,
      message,
      fetchBooks,
      deleteBook,
      startEdit,
      cancelEdit,
      saveEdit,
      setFetchType
    };
  }
};
</script>

<template>
  <div>
    <h1>Books List</h1>
    <!-- 调试输出 -->
    <div>books: {{ books }}</div>
    <div style="margin-bottom: 1em;">
      <button @click="setFetchType('where')">where: ISBN &gt; 1000</button>
      <button @click="setFetchType('orderby')">orderBy: ISBN desc</button>
      <button @click="setFetchType('limit')">limit: 2</button>
      <button @click="setFetchType('all')">All</button>
      <!-- Optional: Refresh button -->
      <button @click="fetchBooks">Refresh</button>
    </div>
    <!-- 显示当前查询方式 -->
    <div style="margin-bottom: 1em;">
      当前查询方式:
      <span v-if="fetchType === 'where'">where (ISBN &gt; 1000)</span>
      <span v-else-if="fetchType === 'orderby'">orderBy (ISBN desc)</span>
      <span v-else-if="fetchType === 'limit'">limit (2)</span>
      <span v-else>All</span>
    </div>
    <!-- 显示操作反馈 -->
    <div v-if="message" style="color: green; margin-bottom: 1em;">{{ message }}</div>
    <ul>
      <li v-for="book in books" :key="book.id">
        <template v-if="editId === book.id">
          <input v-model="editName" />
          <button @click="saveEdit(book)">保存</button>
          <button @click="cancelEdit">取消</button>
        </template>
        <template v-else>
          {{ book.name }} - ISBN: {{ book.isbn }}
          <button @click="startEdit(book)">编辑</button>
          <button @click="deleteBook(book.id)">删除</button>
        </template>
      </li>
    </ul>
  </div>
</template>
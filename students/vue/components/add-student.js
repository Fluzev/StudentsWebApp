// Add Student Full Page Component
const addStudentComponent = {
  data() {
    return {
      student: {
        name: ''
      },
      sending: false,
      errorMessage: '',
      successMessage: ''
    };
  },
  template: `
    <div class="container">
      <h2 class="title is-3 mb-6">✏️ Добавить нового студента</h2>
      
      <section class="section">
        <form @submit.prevent="submitForm" class="box">
          <div class="field">
            <label class="label">Имя студента:</label>
            <div class="control">
              <input
                type="text"
                v-model="student.name"
                required
                :disabled="sending"
                class="input is-rounded"
                placeholder="Введите имя студента"
                :class="{ 'is-danger': !student.name }"
              />
            </div>
          </div>

          <div class="notification has-background-info" v-if="successMessage">
            ✅ {{ successMessage }}
          </div>

          <div class="notification has-background-danger" v-if="errorMessage">
            ❌ {{ errorMessage }}
          </div>

          <footer class="modal-card-foot mt-4">
            <router-link to="/students" 
                         :disabled="sending" 
                         class="button is-danger is-rounded">
              ← Отмена
            </router-link>
            
            <button 
              type="submit"
              class="button is-primary is-rounded"
              :disabled="sending">
              {{ sending ? 'Сохранение...' : 'Сохранить' }}
            </button>
          </footer>
        </form>
      </section>
    </div>
  `,
  methods: {
    submitForm() {
      if (!this.student.name.trim()) {
        this.errorMessage = 'Имя студента обязательно';
        return;
      }

      this.sending = true;
      this.errorMessage = '';

      axios.post('http://localhost:8080/students', {
        name: this.student.name.trim()
      }, {
        headers: { 'Content-Type': 'application/json' }
      })
      .then(response => {
        console.log('Student added:', response.data);
        this.successMessage = `Студент "${this.student.name}" успешно добавлен!`;
        setTimeout(() => {
          if (!this.sending) {
            this.resetForm();
          }
        }, 2000);
      })
      .catch(error => {
        console.error('Error adding student:', error);
        const message = error.response?.data?.message || 
                        error.message || 
                        'Ошибка при добавлении студента';
        this.errorMessage = message;
      })
      .finally(() => {
        this.sending = false;
      });
    },
    resetForm() {
      this.student.name = '';
      this.successMessage = '';
      this.errorMessage = '';
    }
  }
};

export default addStudentComponent;
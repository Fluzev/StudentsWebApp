// Students List Component
const studentsListComponent = {
  template: `
    <div class="container">
      <h2 class="title is-3 mb-6">📋 Управление студентами</h2>
      
      <section class="section">
        <div class="columns">
          <div class="column is-12">
            <div class="box">
              <div class="content has-text-centered py-4 mb-3">
                <router-link to="/add-student" class="button is-primary is-rounded is-medium">
                  ➕ Добавить нового студента
                </router-link>
              </div>

              <div v-if="loading" class="py-4">
                <span class="loader is-medium is-success"></span>
                <p class="has-text-muted mt-3">⏳ Загрузка данных...</p>
              </div>
              
              <div v-else-if="error" class="message is-danger has-background-light">
                <header class="message-header">
                  <span class="icon"><i class="mdi mdi-alert-circle"></i></span>
                  <p>Ошибка</p>
                </header>
                <div class="message-body">{{ error.message }}</div>
              </div>

              <div v-else-if="students && students.length > 0" class="p-3">
                <table class="table is-fullwidth is-striped is-hoverable">
                  <thead class="has-background-info has-text-white">
                    <tr>
                      <th>ID</th>
                      <th>Имя</th>
                      <th v-if="students[0].email">Email</th>
                      <th class="is-narrow">Действия</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="student in students" :key="student.id">
                      <td><strong>{{ student.id }}</strong></td>
                      <td>
                        <span class="tag is-info is-rounded">{{ student.name }}</span>
                      </td>
                      <td v-if="student.email">
                        <span class="has-text-primary"><i class="mdi mdi-email mr-1"></i>{{ student.email }}</span>
                      </td>
                      <td class="is-narrow">
                        <button class="delete-button is-rounded" 
                                @click="deleteStudent(student.id)"
                                title="Удалить студента">
                          <span class="icon"><i class="mdi mdi-delete"></i></span>
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div v-else class="py-5">
                <div class="columns is-vcentered">
                  <div class="column is-narrow">
                    <span class="icon is-large has-text-info">
                      <i class="mdi mdi-users is-large"></i>
                    </span>
                  </div>
                  <div class="column">
                    <p class="has-text-grey-light mb-2">📭 Список пуст</p>
                    <p class="has-text-muted">Нажмите кнопку выше, чтобы добавить первого студента</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <footer class="level mt-4 has-background-light box">
          <div class="level-left">
            <p class="has-text-grey-light is-size-7">Обновлено автоматически</p>
          </div>
        </footer>
      </section>
    </div>
  `,
  data() {
    return {
      loading: true,
      students: null,
      error: null
    };
  },

  methods: {
    deleteStudent(id) {
      if (confirm('⚠️ Вы уверены, что хотите удалить этого студента?\n\nЭто действие необратимо.')) {
        axios.delete(`http://localhost:8080/students/${id}`)
          .then(() => {
            alert('✅ Студент успешно удален!');
            this.loadStudents();
          })
          .catch(err => {
            let message = '❌ Ошибка при удалении студента:\n';
            if (err.response && err.response.data) {
              message += `\n${String(err.response.data)}\n`;
            } else if (err.message) {
              message += `\n${String(err.message)}\n`;
            }
            alert(message);
          });
      }
    },
    loadStudents() {
      axios.get('http://localhost:8080/students')
        .then(response => {
          this.students = response.data;
          console.log('📚 Студенты загружены:', this.students.length, 'записей');
        })
        .catch(err => {
          if (err.code === 'ERR_NETWORK' || err.code === 'ECONNREFUSED') {
            this.error = new Error('❌ Не удалось подключиться к серверу.\n\nУбедитесь, что Spring Boot приложение запущено на http://localhost:8080');
          } else {
            this.error = new Error(String(err.message));
          }
          console.error('⚠️ Ошибка при загрузке студентов:', err);
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },
  mounted() {
    this.loadStudents();
  }
};

export default studentsListComponent;
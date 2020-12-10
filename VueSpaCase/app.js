Vue.component('header-component', {
  template: '#header-template'
});

Vue.component('pagination-control', {
  template: '#pagination',
  props: {
    currentPage: {
      default: 1,
      required: true,
    },
    maxPages: {
      type: Number,
      default: 1,
      required: true,
    },
  },
});

const Home = Vue.component('Home', {
  template: '<div> <h1>Home page</h1> </div>' 
});

const Users = Vue.component('Users', {
  data() {
    return {
      add: {
        id: '',
        edit: false,
        name: '',
        surname: '',
        email: '',
        status: 'Active'
      },
      page: 1,
      perPage: 10,
      totalPages: 0,
      users: [],
      usersSearch: [],
      usersPagination: [],
      lastFilter: '',
      search: ''
    }
  },

  methods: {
    filterUsersBy(name) {
      if (this.lastFilter == name) {
        this.users = this.users.reverse();
      } else {
        this.lastFilter = name;
        this.users = this.users.sort((a, b) => {
          let inputA, inputB;
          switch (name) {
            case 'name':
              inputA = a.name;
              inputB = b.name;
              break;
  
            case 'email':
              inputA = a.email;
              inputB = b.email;
              break;
              
            case 'status':
              inputA = a.status;
              inputB = b.status;
              break;
          }
  
          if (name == 'status') {
            if (inputA == false) return 1;
            if (inputA == true) return -1;
            return 0;
          } else {
            if (inputA.charAt(0) > inputB.charAt(0)) return 1;
            if (inputA.charAt(0) < inputB.charAt(0)) return -1;
            return 0;
          }
        });
      }
      this.page = 1;
      this.updateData();
    },

    changePage(page) {
      this.page = page;
      this.updateData();
    },

    updateData() {
      this.totalPages = Math.ceil(this.usersSearch.length / this.perPage);
      let from = (this.page - 1) * this.perPage;
      let to = from + this.perPage;
      this.usersPagination = this.usersSearch.slice(from, to);
    },
    
    searchItems() {
      this.usersSearch = this.users.filter((e) => e.name.toLowerCase().search(this.search.toLowerCase()) != -1 || e.surname.toLowerCase().search(this.search.toLowerCase()) != -1 || e.email.toLowerCase().search(this.search.toLowerCase()) != -1);
      this.changePage(1);
      this.updateData();
    },

    addNew() {
      let newItem = this.add;
      newItem.status = this.add.status == 'Active' ? true : false;
      newItem.id = `f${(~~(Math.random()*1e8)).toString(16)}`;
      this.users.push(newItem);

      this.usersSearch = this.users;
      this.page = 1;
      this.search = '';
      this.updateData();
      this.add = {
        id: '',
        name: '',
        surname: '',
        email: '',
        status: 'Active'
      }
      this.saveToLocalStorage();
    },

    deleteItem(id) {
      this.users = this.users.filter((e) => e.id !== id);
      this.usersSearch = this.usersSearch.filter((e) => e.id !== id);
      this.usersPagination = this.usersPagination.filter((e) => e.id !== id);
      this.page = 1;
      this.search = '';
      this.updateData();
      this.saveToLocalStorage();
    },

    saveToLocalStorage() {
      let result = JSON.stringify(Array.from(new Set(this.usersPagination.concat(this.users))));
      console.log(result);
      
      localStorage.setItem('users', result)
    }
  },

  created() {
    this.users = JSON.parse(localStorage.getItem('users'));
  },

  mounted() {
    this.users = this.users.map((e) => {
      let newId = `f${(~~(Math.random()*1e8)).toString(16)}`;
      return {
        id: newId,
        edit: false,
        name: e.name,
        surname: e.surname,
        email: e.email,
        status: e.status
      }
    });
    this.usersSearch = this.users;
    this.updateData();
  },

  template: '#users-template'
});

const Courses = Vue.component('Courses', {
  data() {
    return {
      add: {
        id: '',
        _id: '',
        name: '',
        edit: false
      },
      page: 1,
      perPage: 5,
      totalPages: 0,
      courses: [],
      coursesSearch: [],
      coursesPagination: [],
      search: '',
      lastFilter: ''
    }
  },
  
  methods: {
    filterUsersBy(name) {
      if (this.lastFilter == name) {
        this.courses = this.courses.reverse();
      } else {
        this.lastFilter = name;
        this.courses = this.courses.sort((a, b) => {
          let inputA, inputB;
          switch (name) {
            case 'name':
              inputA = a.name;
              inputB = b.name;
              break;

            case 'id':
              inputA = a.id;
              inputB = b.id;
              break;
          }

          if (inputA.charAt(0) > inputB.charAt(0)) return 1;
          if (inputA.charAt(0) < inputB.charAt(0)) return -1;
          return 0;
        });
      }
      this.page = 1;
      this.updateData();
    },

    changePage(page) {
      this.page = page;
      this.updateData();
    },

    updateData() {
      if (Math.ceil(this.coursesSearch.length / this.perPage) > this.totalPages) {
        this.page = 1;
      }
      this.totalPages = Math.ceil(this.coursesSearch.length / this.perPage);
      let from = (this.page - 1) * this.perPage;
      let to = from + this.perPage;
      this.coursesPagination = this.coursesSearch.slice(from, to);
    },

    searchItems() {
      this.coursesSearch = this.courses.filter((e) => e.name.toLowerCase().search(this.search.toLowerCase()) != -1 || e.id.toLowerCase().search(this.search.toLowerCase()) != -1);
      this.changePage(1);
      this.updateData();
    },

    addNew() {
      let newItem = this.add;
      newItem._id = `f${(~~(Math.random()*1e8)).toString(16)}`;
      this.courses.push(newItem);

      this.coursesSearch = this.courses;
      this.updateData();
      this.add = {
        id: '',
        _id: '',
        name: ''
      }
      this.saveToLocalStorage();
    },
    
    deleteItem(id) {
      this.courses = this.courses.filter((e) => e._id !== id);
      this.coursesSearch = this.coursesSearch.filter((e) => e._id !== id);
      this.coursesPagination = this.coursesPagination.filter((e) => e._id !== id);
      this.saveToLocalStorage();
      this.updateData();
    },

    saveToLocalStorage() {
      let result = JSON.stringify(Array.from(new Set(this.coursesPagination.concat(this.courses))));
      localStorage.setItem('courses', result)
    }
  },

  created() {
    this.courses = JSON.parse(localStorage.getItem('courses'));
  },

  mounted() {
    this.courses = this.courses.map((e) => {
      let newId = `f${(~~(Math.random()*1e8)).toString(16)}`;
      return {
        _id: newId,
        edit: false,
        id: e.id,
        name: e.name,
      }
    });
    this.coursesSearch = this.courses;
    this.filterUsersBy('id');
    this.updateData();
  },

  template: '#courses-template' 
});

const routes = [
  { path: '/', component: Home },
  { path: '/users', component: Users },
  { path: '/courses', component: Courses }
]

const router = new VueRouter({
  // mode: 'history',
  routes
})

new Vue({
  router
}).$mount('#app')
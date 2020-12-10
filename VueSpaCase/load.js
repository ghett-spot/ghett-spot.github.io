(function(){
	let users = [
	  {
      "name":"Gary",
			"surname":"Busey",
			"email":"busey@mail.com",
      "status":true
    },
		{
      "name":"Jeff",
			"surname":"Bridges",
			"email":"bridges@mail.com",
      "status":false
    },
	  {
      "name":"Michael",
			"surname":"Cimino",
			"email":"cimino@mail.com",
      "status":true
    },
		{
      "name":"Roger",
			"surname":"Corman",
			"email":"corman@mail.com",
      "status":true
    },
		{
      "name":"Don",
			"surname":"Rickles",
			"email":"don@mail.com",
      "status":false
    },
		{
      "name":"Harold J",
			"surname":"Stone",
			"email":"stone@mail.com",
      "status":true
    },
		{
      "name":"John",
			"surname":"Hoyt",
			"email":"hoyt@mail.com",
      "status":true
    },
		{
      "name":"Ray",
			"surname":"Milland",
			"email":"ray@mail.com",
			"status":false},
		{
      "name":"Bruno",
			"surname":"Dumont",
			"email":"dumont@mail.com",
      "status":true
    },
		{
      "name":"Alane",
			"surname":"Delhaye",
			"email":"alane@mail.com",
      "status":true
    },
		{
      "name":"Bernard",
			"surname":"Pruvost",
			"email":"bernard@mail.com",
      "status":true
    },
		{
      "name":"Lucy",
			"surname":"Caron",
			"email":"caron@mail.com",
      "status":true
    },
		{
      "name":"Philipe",
			"surname":"Jore",
			"email":"jore@mail.com",
      "status":false
    },
		{
      "name":"Robert",
			"surname":"Wiene",
			"email":"wiene@mail.com",
      "status":true
    },
		{
      "name":"Werner",
			"surname":"Krauss",
			"email":"krauss@mail.com",
      "status":true
    }
	];

	let courses = [
		{
      "name":"Python-Base",
      "id":"P012345"
    },
		{
      "name":"Python-Database",
      "id":"P654321"
    },
		{
      "name":"HTML",
      "id":"H123286"
    },
		{
      "name":"Java-Base",
      "id":"J151366"
    },
		{
      "name":"JavaScript-Base",
      "id":"JS321233"
    }
	];

	users = users.concat(users);
	users = users.concat(users);

	courses = courses.concat(courses);
	courses = courses.concat(courses);
	
	if (localStorage.getItem('users') == null) {
		let strngUsers = JSON.stringify(users);
		localStorage.setItem('users',strngUsers);
	}

	if (localStorage.getItem('courses') == null) {
		let strngCourses = JSON.stringify(courses);
		localStorage.setItem('courses',strngCourses);
	}
})();
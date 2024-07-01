const express = require('express')
const bodyParser = require('body-parser')
const mysql = require('mysql')
const users = [{
	userName: "Aditya Gupta",
	userEmail: "aditya@gmail.com",
	designation: "HR",
	userAge: "22",
	number: '6843214836',
	bloodgrp: 'O+ve',
	ratetype: 'Hourly',
	salary: '1000',
	address: 'Anna Nagar',
	userUniqueId: '1'
},
{
	userName: "Vanshita Jaiswal",
	userEmail: "vanshita@gmail.com",
	designation: "Developer",
	userAge: "21",
	number: '8716932652',
	bloodgrp: 'AB-ve',
	ratetype: 'Monthly',
	salary: '35000',
	address: 'Ramapuram',
	userUniqueId: '2'
},
{
	userName: "Harjinder Singh",
	userEmail: "Harjinder@gmail.com",
	designation: "Team Leader",
	userAge: "27",
	number: '7655559353',
	bloodgrp: 'B+ve',
	ratetype: 'Monthly',
	salary: '40000',
	address: 'Pallikaranai',
	userUniqueId: '3'
},
{
	userName: "Bhargavan",
	userEmail: "bhargav18@gmail.com",
	designation: "Backend Support",
	userAge: "25",
	number: '8523641797',
	bloodgrp: 'A+ve',
	ratetype: 'Hourly',
	salary: '1200',
	address: 'Guindy',
	userUniqueId: '4'
}
]

const app = express()

app.set('view engine', 'ejs')

// const db = mysql.createConnection({
//   host: 'localhost',       // e.g., 'localhost'
//   user: 'root',   // Your MySQL username
//   password: '', // Your MySQL password
//   database: 'user_details',
//   port: '3306',  // Your MySQL database name
//   authPlugins: {
//     mysql_clear_password: () => () => Buffer.from('root')
//   }
// });

// db.query(`select * from details`, (error, result, fields) =>{
// 	console.log(error);
// 	console.log(result);
// 	console.log(fields);
// });


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}))

app.get("/", function (req, res) {
	res.render("home", {
		data: users
	})
})

// app.get("/", function (req, res) {
// 	db.query('SELECT * FROM details', (error, results) => {
// 	  if (error) {
// 		console.error('Error querying the database:', error);
// 		res.status(500).send('Database error');
// 		return;
// 	  }
// 	  res.render("home", {
// 		data: results
// 	  });
// 	});
//   });

app.post("/", (req, res) => {
	const inputUserName = req.body.userName
	const inputUserEmail = req.body.userEmail
	const inputDesignation = req.body.designation
	const inputUserAge = req.body.userAge
	const inputUserNumber = req.body.number
	const inputUserBloodGroup = req.body.bloodgrp
	const inputUserRateType = req.body.ratetype
	const inputUserSalary = req.body.salary
	const inputUserAddress = req.body.address
	const inputUserUniqueId = req.body.userUniqueId
	

	users.push({
		userName: inputUserName,
		userEmail: inputUserEmail,
		designation: inputDesignation,
		userAge: inputUserAge,
		number: inputUserNumber,
		bloodgrp:inputUserBloodGroup,
		rateype: inputUserRateType,
		salary: inputUserSalary,
		address: inputUserAddress,
		userUniqueId: inputUserUniqueId
	})

	res.render("home", {
		data: users
	})
})

app.post('/delete', (req, res) => {
	var requestedUserUniqueId = req.body.userUniqueId;
	var j = 0;
	users.forEach(user => {
		j = j + 1;
		if (user.userUniqueId === requestedUserUniqueId) {
			users.splice((j - 1), 1)
		}
	})
	res.render("home", {
		data: users
	})
})

app.post('/update', (req, res) => {
	const inputUserName = req.body.userName
	const inputUserEmail = req.body.userEmail
	const inputDesignation = req.body.designation
	const inputUserAge = req.body.userAge
	const inputUserNumber = req.body.number
	const inputUserBloodGroup = req.body.bloodgrp
	const inputUserRateType = req.body.ratetype
	const inputUserSalary = req.body.salary
	const inputUserAddress = req.body.address
	const inputUserUniqueId = req.body.userUniqueId

	var j = 0;
	users.forEach(user => {
		j = j + 1;
		if (user.userUniqueId === inputUserUniqueId) {
			user.userName = inputUserName
			user.designation = inputDesignation
			user.userEmail = inputUserEmail
			user.userAge = inputUserAge
			user.number = inputUserNumber
			user.bloodgrp = inputUserBloodGroup
			user.ratetype = inputUserRateType
			user.salary = inputUserSalary
			user.address = inputUserAddress
		}
	})
	res.render("home", {
		data: users
	})
})

app.listen(3000, (req, res) => {
	console.log("App is running on port 3000")
})
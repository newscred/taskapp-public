curl -v -H 'Content-Type: application/json' -X POST http://localhost:8080/login -d '{"username":"admin","password":"123456"}'

curl -v -H 'Content-Type: application/json' -X POST http://localhost:8080/sign-up -d '{"username":"jeremiah","password":"123456","firstName":"Jeremiah","lastName":"Malina"}'
]
curl -v -H 'Content-Type: application/json' -H 'Authorization: Bearer 7629a0a1cf03a1015eaa2326269f9be89597c16caccded78aa957273fc8420c6' -X DELETE http://localhost:8080/users/2

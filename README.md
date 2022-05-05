# cv-builder
Web-sovelluskehitys 1 -kurssin ryhmä projekti 
Tekijät: Niko Ahonen, Riku Koski ja Otto Palssa

## Miten sovellusta käytetään
1. Lataa dependencyt
2. Kirjoita terminaaliin $ node cv-builder/server/connection.js
3. Käynnistä index.html ide:n kautta TAI kirjoita selaimen hakukenttään localhost:3000/index
4. Valmis

## REST API
method: 'POST'  
endpoint: http://localhost:3000/api/:message/:email/:phone/:city/:items/:introduction'  
response: JSON object  
parameters: message, email, phone, city, items, introduction  

method: 'POST'  
endpoint: http://localhost:3000/api/getcv/:id  
response: JSON object  
parameters: id  

method: 'GET'  
endpoint: http://localhost:3000/index  
response: html.file  
parameters: none  

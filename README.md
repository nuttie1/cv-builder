# cv-builder
Web-sovelluskehitys 1 -kurssin ryhmä projekti 
Tekijät: Niko Ahonen, Riku Koski ja Otto Palssa

## Miten sovellusta käytetään
1. Lataa dependencyt
2. Käynnistä Metropolian vpn
3. Kirjoita terminaaliin $ node cv-builder/server/connection.js
4. Käynnistä index.html ide:n kautta TAI kirjoita selaimen hakukenttään localhost:3000/index
5. Valmis

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
response: html file  
parameters: none  

## Kuvankaappaus etusivusta
![image](https://user-images.githubusercontent.com/69677612/166965811-e15631f2-c553-4c29-82c4-390d9e903fa8.png)

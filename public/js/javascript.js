"use strict";
let app = new Vue({
    el: '#app',
    data: {
        message: 'test', email: 'giga.chad@meme.fi', phone: '044 1245 678',
        city: 'Espoo', color: '#000000',introduction: 'Hello this is person',
        items: [
            {
                Name: 'Prisma, Iso-Omena23', time: '2018 - 2020', type: 'Hyllyttäjä',
                text: 'Olin kaksi vuotta prismalla töiussä.' +
                    ' In aliquet sapien aliquam lacus vulputate fringilla. In cursus sodales augue a mattis. ' +
                    'Aliquam consectetur mauris nec leo blandit, ut gravida massa imperdiet. In eget arcu id enim mattis ultrices. Mauris venenatis luctus luctus.'
            },
            {
                Name: 'Prisma, Iso-Omena444', time: '2018 - 2020', type: 'Hyllyttäjä',
                text: 'Olin kaksi vuotta prismalla töiussä.' +
                    ' In aliquet sapien aliquam lacus vulputate fringilla. In cursus sodales augue a mattis. ' +
                    'Aliquam consectetur mauris nec leo blandit, ut gravida massa imperdiet. In eget arcu id enim mattis ultrices. Mauris venenatis luctus luctus.'
            }
        ]

    },
    methods: {
        ui: function(msg){
            this.message = msg;
        },
        xd: function () {
            var json;

            console.log("savetus");
            var xmlhttp = new XMLHttpRequest();
            xmlhttp.onreadystatechange = function () {
                if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
                    console.log(xmlhttp.response);
                    console.log("Kaikki ok!")
                }
            };
            let jsonItems = JSON.stringify(this.items);
            xmlhttp.open("POST", "http://localhost:3000/api/" + this.message + "/" + this.email + "/" +
                this.phone + "/" + this.city + "/" + jsonItems + "/" + this.introduction, true);



            xmlhttp.send();
        },
        zippaus: function(){
            var zip = new JSZip();
            zip.file("Hello.txt", "Hello World\n");
            zip.file("Hello2.txt", "Hello World\n");
            var img = zip.folder("images");
            zip.file("gigachad.jpg",'.jpg');
            img.file("chad.webp").async("arraybuffer");
            zip.generateAsync({type:"blob"})
            .then(function(content) {
                // see FileSaver.js
                saveAs(content, "example.zip");
            });

        }

    },
    mounted: function () {


        console.log("Haku");
        let tiedot;
        let xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
                tiedot = JSON.parse(xmlhttp.response);
                console.log(xmlhttp.response);
                console.log("Kaikki ok!")
                console.log(tiedot);
                console.log(tiedot[0].name);
                let lista =  JSON.parse(tiedot[0].items);
                console.log(lista[0].Name);
                app.items = lista;
                app.message = tiedot[0].name;
                app.email = tiedot[0].email;
                app.phone = tiedot[0].phone;
                app.city = tiedot[0].residence;
                app.introduction = tiedot[0].introduction;

            }
        };


        xmlhttp.open("POST", "http://localhost:3000/api/getcv/:" + "39", true);
        xmlhttp.send();

    }


});


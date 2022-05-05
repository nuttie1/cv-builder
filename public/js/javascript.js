"use strict";
let app = new Vue({
    el: '#app',
    data: {
        message: 'test', email: 'giga.chad@meme.fi', phone: '044 1245 678',
        city: 'Espoo', color: '#000000', introduction: 'Hello this is person',
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
        saveFunc: function () {
            console.log("savetus");

            /**
             * Funktio lähettää post pyynnöllä vuen muuttujat, jotka vastaanottaja connection.js -tiedostossa tallentaa tietokantaan.
             * */
            let xmlhttp = new XMLHttpRequest();
            xmlhttp.onreadystatechange = function () {
                if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
                    console.log(xmlhttp.response);
                    console.log("Kaikki ok!")

                } else {
                    console.log("Tallentamisessa meni jokin pieleen koodi: " + xmlhttp.status)
                }
            };

            let jsonItems = JSON.stringify(this.items);
            xmlhttp.open("POST", "http://localhost:3000/api/" + this.message + "/" + this.email + "/" +
                this.phone + "/" + this.city + "/" + jsonItems + "/" + this.introduction, true);

            xmlhttp.send();
        }
    },

    /* Mounted kutsutaan kun vue on käynnistynyt */
    mounted: function () {
        console.log("Haku");

        /**
         * Haetaan tiedot connection.js:stä, joka tekee tietokanta haun annetun id:n avulla.
         * Saadut tiedot annetaan vuen muuttujille.
         *
         * Ohjelmassa käytetään XMLHttpRequestia, koska se on tietoturvallista syistä paras projektiimme.
         * */

        let tiedot;
        let xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
                tiedot = JSON.parse(xmlhttp.response);
                console.log(xmlhttp.response);
                console.log("Tietokannasta haku: ok!")

                app.items = JSON.parse(tiedot[0].items);
                app.message = tiedot[0].name;
                app.email = tiedot[0].email;
                app.phone = tiedot[0].phone;
                app.city = tiedot[0].residence;
                app.introduction = tiedot[0].introduction;

            } else {
                console.log("Jokin meni pieleen post hakemisessa koodi: " + xmlhttp.status)
            }
        };

        xmlhttp.open("POST", "http://localhost:3000/api/getcv/:" + "39", true);
        xmlhttp.send();

    }
});


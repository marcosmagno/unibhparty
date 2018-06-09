        var map;
        var mylocations = [
            { lat: -33, lng: 27 },
            { lat: -33, lng: 28 },
            { lat: -33, lng: 29 },
            { lat: -33, lng: 30 },
        ];



        var mymarkers = [];

        function getMarkersFromAPI() {

            // Dica: FaÃ§a uma requisiÃ§Ã£o ajax

            // Ã‰ preciso enviar uma requisiÃ§Ã£o do tipo POST, E NÃƒO GET

            // Use Jquery se souber, apesar que nÃ£o Ã© nem necessÃ¡rio, nem recomendado.

            // Lembre-se tambÃ©m que o tipo de conteÃºdo do post Ã©: application/x-www-form-urlencoded (isso Ã© definido em um header)

            // Escute o evento de criado pelo ajax, e chame a funÃ§Ã£o UpdateMarkers com os dados presentes nele.

            // Se tiver dÃºvidas, consulte o JoÃ£o em jm@cddc.com.br, (31) 98815-5941
  
            /*
                Autor: Marcos Magno de Carvalho
                Date: 05/05/2018

            */
            var objXml = new XMLHttpRequest();
            
            objXml.open("POST", 'https://ffr6qacj9d.execute-api.us-east-1.amazonaws.com/prod/prova-dev-m03', true);
            objXml.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            objXml.onreadystatechange = function () {
                if (this.readyState != 4) return; // Verify status of the site.
                if (this.status == 200) {
                    var data = JSON.parse(this.responseText); // Get data and JSON parse.
                    console.log(data)
                    updateMarkers(data)
                }

            };

            objXml.send("mapa=true");            


        }

        // RECEBE APENAS OBJETOS. VOCÃŠ TERÃ QUE FAZER PARSE DE STRINGS PARA TRANSFORMA-LAS EM JSON ANTES DE CHAMAR A FUNÃ‡AO
        function updateMarkers(newmarkers) {
            // clearing old markers
            mymarkers.forEach(marker => {
                marker.setMap(null);
                

            })
            mymarkers = [];

            // populate the map with the new markerks
            mymarkers = newmarkers.map(newmarker => {
                return new google.maps.Marker({
                    position: { lat: newmarker.lat, lng: newmarker.lng },
                    //icon: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png',
                    map: map
                });
            });
            
            
            // Bonus points for colored markers :) `http://maps.google.com/mapfiles/ms/icons/${marker.color}-dot.png`   
            /*
                Autor: Marcos Magno de Carvalho
                Date: 05/05/2018

            */
            console.log(mymarkers.length)        
            for (var i = 0; i < mymarkers.length; i++) {
                color = newmarkers[i].color;
                mymarkers[i].setIcon('http://maps.google.com/mapfiles/ms/icons/'+ color + '-dot.png'); // Set up new colors for the markers
            }

            
            avgLat = newmarkers.reduce((total, e) => total + e.lat, 0) / newmarkers.length;
            avgLng = newmarkers.reduce((total, e) => total + e.lng, 0) / newmarkers.length;

            var newCenter = { lat: avgLat, lng: avgLng };


            map.panTo(newCenter);

        }

        function initMap() {
            // Creates the map
            map = new google.maps.Map(document.getElementById('map'), {
                center: { lat: -33, lng: 28 },
                zoom: 8
            });

            // Populates the map with initial data.
            updateMarkers(mylocations);

            // Fetches markers from API
            // Ã‰ ESSA FUNÃ‡AO QUE VOCE TERÃ QUE FAZER
            getMarkersFromAPI();

            // Bonus points for updating markers every 5 seconds.
            setInterval( function() {
                getMarkersFromAPI();          
            }, 5000 );

        }
//get logInModel DOM
var modal = document.getElementById('popUp');

//modal close button
// var span = document.getElementsByClassName("close")[0];


//click event for modal
function clickEventM() {
    event.target.innerHTML == 'Log out'
    provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithRedirect(provider).then(function (result) {
        console.log(result);
        console.log("success")

        // ...
    }).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
    });


}


//log in function for navbar
function clickEvent() {
    if (event.target.innerHTML == 'Log in') {
        event.target.innerHTML == 'Log out'
        provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithRedirect(provider).then(function (result) {
            console.log(result);
            console.log("success")

            // ...
        }).catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
        });

    } else {
        event.target.innerHTML == 'Log in'
        firebase.auth().signOut().then(function () {
            // Sign-out successful.
        }).catch(function (error) {
            // An error happened.
        });

    }

}




var directionsRenderer;
// APIs that we are going to use
var googleAPIKey = "";


var map, infoWindow;
var startPoint = document.getElementById("start").value;

//initialize database
const database = firebase.database();

//Session for user - if user logged in, load their favorite list
firebase.auth().onAuthStateChanged(function (user) {
    if (user) {

        logInStuff = document.getElementById('logInStuff')
        logInStuff.innerHTML = 'Log out'

        userName = document.getElementById('userName')
        userName.innerHTML = `Hey, ${user.displayName}`


        //hide modal 
        modal.style.display = "none";

        // User is signed in.
        const userUid = database.ref(user.uid + "/favList");

        console.log("User is signed in.")
        userUid.on('value', function (snapshot) {
            document.getElementById("attCards").innerHTML = `<att-card v-for="info in placeInfo" :info="info"></att-card>`;
            document.getElementById("barCards").innerHTML = `<att-card v-for="info in barInfo" :info="info"></att-card>`;
            document.getElementById("foodCards").innerHTML = `<att-card v-for="info in foodInfo" :info="info"></att-card>`;
            document.getElementById("accCards").innerHTML = `<att-card v-for="info in accInfo" :info="info"></att-card>`;

            displayCards(user.uid);
        });

    } else {

        logInStuff = document.getElementById('logInStuff')
        logInStuff.innerHTML = 'Log in'


        userName = document.getElementById('userName')
        userName.innerHTML = `Hey, stranger, please login!`
        // No user is signed in.
        //make modal appear
        modal.style.display = "block";
        console.log("No user is signed in.")
        document.getElementById("attCards").innerHTML = `Please log in before using this page`;
        document.getElementById("barCards").innerHTML = `Please log in before using this page`;
        document.getElementById("foodCards").innerHTML = `Please log in before using this page`;
        document.getElementById("accCards").innerHTML = `Please log in before using this page`;
    }
});

// Card component
Vue.component('att-card', {
    props: ['info'],
    data: function () {
        return {
            placeUrl: "http://" + this.info.officialWebsite,
            placeImage: "../img/favourites/merlion.jpg",
            apiKey: '',

            location: this.info.location,
            uuid: this.info.uuid,

        }
    },
    methods: {
        checkImage: function () {
            if (this.info.images.length == 0) {
                image = this.placeImage;
                return image
            } else if (this.info.images[0].uuid == '') {
                if ('url' in this.info.images[0]) {
                    image = this.info.images[0].url
                    if (image.includes('http')) {
                        return image
                    } else {
                        image = this.placeImage
                        return image
                    }

                }
            } else {
                imgUUID = this.info.images[0].uuid
                image = `https://tih-api.stb.gov.sg/media/v1/download/uuid/${imgUUID}?apikey=${this.apiKey}`
                return image
            }
        },
        getDirection(location) {
            var lat = location.latitude;
            var lng = location.longitude;
            var endPoint = new google.maps.LatLng(lat, lng)
            document.getElementById("des").value = event.target.value
            var modeTrans = document.getElementById("mode").value;

            // convert location object into string to pass it into hidden input value for sendBtn function
            var locStr = JSON.stringify(location);
            document.getElementById("hidDes").value = locStr;

            display(startPoint, endPoint, modeTrans);
        },
        remove(val) {
            //get key from database through query statement based on uuid value
            userUid = document.getElementById("userID").value;
            database.ref(userUid + '/favList').orderByValue().equalTo(val).on('value', snapshot => {
                if (snapshot.val() != null) {
                    var key = Object.keys(snapshot.val())[0];
                    database.ref(userUid + '/favList').child(key).remove()
                }

            })
        }

    },
    template: `
    <div class='col-xl-4 col-lg-6 col-md-12 mb-4 '>
        <div class="card mx-auto card-wrap">
            <div class="inner">
                <a @click="remove(uuid)" class="remove-image">&times;</a>
                <a :href='placeUrl' target='_blank'>
                    <img :src="checkImage()" width="100%" height="260" class="card-img-top" alt="">
                </a>
            </div> 
            <div class="card-body">
                <h5 class="card-title"><b>{{ info.name }}</b></h5>
                <p><a :href='placeUrl' target='_blank'>Click to visit website</a></p>
                <hr>
                <a href='#directionInput'><button @click='getDirection(location)' :value="info.name" class='btn directBtn m-0'>Get directions</button></a>
                <div class="row justify-content-center">
                    <div class="col text-center">
                    
                    </div>
                </div>
                
                
            </div>
        </div>
    </div>
    `
});

function checkFilter(category) {
    var attTab = document.getElementById("attTab");
    var barTab = document.getElementById("barTab");
    var foodTab = document.getElementById("foodTab");
    var accTab = document.getElementById("accTab");


    if (category == "att") {
        attTab.className = "active";
        barTab.className = "";
        foodTab.className = "";
        accTab.className = "";
    } else if (category == "bar") {
        barTab.className = "active";
        attTab.className = "";
        foodTab.className = "";
        accTab.className = "";
    } else if (category == "food") {
        foodTab.className = "active"
        attTab.className = "";
        barTab.className = "";
        accTab.className = "";
    } else if (category == "acc") {
        accTab.className = "active"
        foodTab.className = "";
        attTab.className = "";
        barTab.className = "";
    }

    if (attTab.className == "active") {
        barTab.className = "";
        foodTab.className = "";
        document.getElementById("attCards").className = "row"
        document.getElementById("barCards").className = "row d-none"
        document.getElementById("foodCards").className = "row d-none"
        document.getElementById("accCards").className = "row d-none"
    } else if (barTab.className == "active") {
        attTab.className = "";
        foodTab.className = "";
        document.getElementById("attCards").className = "row d-none"
        document.getElementById("barCards").className = "row"
        document.getElementById("foodCards").className = "row d-none"
        document.getElementById("accCards").className = "row d-none"
    } else if (foodTab.className == "active") {
        attTab.className = "";
        barTab.className = "";
        document.getElementById("attCards").className = "row d-none"
        document.getElementById("barCards").className = "row d-none"
        document.getElementById("foodCards").className = "row"
        document.getElementById("accCards").className = "row d-none"
    } else if (accTab.className == "active") {
        document.getElementById("accCards").className = "row"
        document.getElementById("attCards").className = "row d-none"
        document.getElementById("barCards").className = "row d-none"
        document.getElementById("foodCards").className = "row d-none"

    }



}



// retrieve cards from database based on userUid
function displayCards(userUidd) {
    const userUid = database.ref(userUidd + "/favList");
    userUid.once('value').then(
        function (snapshot) {

            arr = snapshot.val();
            var gotoURL = "https://lingering-butterfly-c754.scaper65.workers.dev/?https://tih-api.stb.gov.sg/content/v1/attractions?apikey=A4dcssGA4035eGJbqZVu6vCcNqelWle1";
            // var gotoURL = `https://lingering-butterfly-c754.scaper65.workers.dev/?https://tih-api.stb.gov.sg/content/v1/attractions?apikey=${this.apiKey}`;


            for (items in arr) {
                gotoURL += "&uuid=" + arr[items]
            }

            var barURL = "https://lingering-butterfly-c754.scaper65.workers.dev/?https://tih-api.stb.gov.sg/content/v1/bars-clubs?apikey=A4dcssGA4035eGJbqZVu6vCcNqelWle1";
            // var barURL = `https://lingering-butterfly-c754.scaper65.workers.dev/?https://tih-api.stb.gov.sg/content/v1/bars-clubs?apikey=${this.apiKey}`;

            for (items in arr) {
                barURL += "&uuid=" + arr[items]
            }

            var foodURL = "https://lingering-butterfly-c754.scaper65.workers.dev/?https://tih-api.stb.gov.sg/content/v1/food-beverages?apikey=A4dcssGA4035eGJbqZVu6vCcNqelWle1";
            // var foodURL = `https://lingering-butterfly-c754.scaper65.workers.dev/?https://tih-api.stb.gov.sg/content/v1/food-beverages?apikey=${this.apiKey}`;

            for (items in arr) {
                foodURL += "&uuid=" + arr[items]
            }

            var accURL = "https://lingering-butterfly-c754.scaper65.workers.dev/?https://tih-api.stb.gov.sg/content/v1/accommodation?apikey=A4dcssGA4035eGJbqZVu6vCcNqelWle1";
            // var accURL = `https://lingering-butterfly-c754.scaper65.workers.dev/?https://tih-api.stb.gov.sg/content/v1/accommodation?apikey=${this.apiKey}`;

            for (items in arr) {
                accURL += "&uuid=" + arr[items]
            }
            // append url to 4 different vue instance
            const vm = new Vue({
                el: "#att",
                data: {
                    placeInfo: [],
                    userUid: userUidd,

                },
                mounted: function () {
                    axios.get(gotoURL)
                        .then(response => {
                            this.placeInfo = response.data.data;

                        })
                        .catch(error => {

                        })
                }
            })

            const bar = new Vue({
                el: "#bar",
                data: {
                    barInfo: [],
                    userUid: userUidd,


                },
                mounted: function () {
                    axios.get(barURL)
                        .then(response => {
                            this.barInfo = response.data.data;

                        })
                        .catch(error => {

                        })
                }
            })

            const food = new Vue({
                el: "#food",
                data: {
                    foodInfo: [],
                    userUid: userUidd
                },
                mounted: function () {
                    axios.get(foodURL)
                        .then(response => {
                            this.foodInfo = response.data.data;

                        })
                        .catch(error => {

                        })
                }
            })

            const acc = new Vue({
                el: "#acc",
                data: {
                    accInfo: [],
                    userUid: userUidd
                },
                mounted: function () {
                    axios.get(accURL)
                        .then(response => {
                            this.accInfo = response.data.data;

                        })
                        .catch(error => {

                        })
                }
            })




        })
}


function sendBtn() {
    var location = document.getElementById("hidDes").value;
    var locObj = JSON.parse(location);
    var lat = locObj.latitude;
    var lng = locObj.longitude;
    var endPoint = new google.maps.LatLng(lat, lng)
    var modeTrans = document.getElementById("mode").value;
    display(startPoint, endPoint, modeTrans);

}

// Initialize and add the map
function display(start, end, mode) {
    const directionsRenderer = new google.maps.DirectionsRenderer();
    const directionsService = new google.maps.DirectionsService();
    map = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: -34.397,
            lng: 150.644
        },
        zoom: 12
    });
    infoWindow = new google.maps.InfoWindow;

    directionsRenderer.setMap(map);

    if (document.getElementById("right-panel").innerHTML.length != 0) {
        document.getElementById("right-panel").innerHTML = "";
    }
    // Try HTML5 geolocation.
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };

            infoWindow.setPosition(pos);
            infoWindow.setContent('You are here!');
            infoWindow.open(map);
            map.setCenter(pos);
            document.getElementById("right-panel").innerHTML += `<div class="box text-center w-100 h-50 m-auto rounded border border-dark m-10" style="background: #00b894; color: white; font-size:1rem; font-weight: bold;">
                        <p class="my-auto py-auto">Route directions</p> 
                    </div>`;
            directionsRenderer.setPanel(document.getElementById("right-panel"));
            calculateAndDisplayRoute(directionsService, directionsRenderer, start, end, mode, pos);
        }, function () {
            handleLocationError(true, infoWindow, map.getCenter());
        });
    } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
    }

}

function calculateAndDisplayRoute(directionsService, directionsRenderer, start, end, mode, pos) {
    stPoint = start
    if (start == "Your location") {
        stPoint = pos
    }

    directionsService.route({
            origin: stPoint,
            destination: end,
            // new google.maps.LatLng(1.2911354, 103.8501524),
            travelMode: google.maps.TravelMode[mode],
        },
        (response, status) => {
            if (status === "OK") {
                directionsRenderer.setDirections(response);

            } else {
                window.alert("Directions request failed due to " + status + "\nUnable to find route to Destination");
            }
        }
    );
}

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: -34.397,
            lng: 150.644
        },
        zoom: 12
    });
    infoWindow = new google.maps.InfoWindow;
    // Try HTML5 geolocation.
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude

            };


            infoWindow.setPosition(pos);
            infoWindow.setContent('You are here!');
            infoWindow.open(map);
            map.setCenter(pos);
        }, function () {
            handleLocationError(true, infoWindow, map.getCenter());
        });
    } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
    }
}



function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
        'Error: The Geolocation service failed.' :
        'Error: Your browser doesn\'t support geolocation.');
    infoWindow.open(map);
}
//get logInModel DOM
var modal = document.getElementById('popUp');

//modal close button
// var span = document.getElementsByClassName("close")[0];


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


//modal close functions
// span.onclick = function() {
//     modal.style.display = "none";
// }

// window.onclick = function(event) {
//     if (event.target == modal) {
//         modal.style.display = "none";
//     }
// }










//read more event handler
function readMore(dotId, moreId, linkId) {
    //console.log(dotId,moreId,linkId)
    //for some reason , instead of getting the ids, I get the dom object of the corresponding Id  
    //probably a result of mixing vue and vanilla javascript
    //from now on , I will treat the dotId,moreId,linkId as dom objects instead of id
    //kill me
    dots = dotId
    aText = linkId
    moreText = moreId

    if (dots.style.display === "none") {
        dots.style.display = "inline";
        aText.innerHTML = "Read more";
        moreText.style.display = "none";
    } else {
        dots.style.display = "none";
        aText.innerHTML = "Read less";
        moreText.style.display = "inline";
    }
}

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

//database root 
const database = firebase.database();

//database favlist
// const favList=database.ref('favList');

firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        logInStuff = document.getElementById('logInStuff')
        logInStuff.innerHTML = 'Log out'
        // User is signed in.
        console.log("User is signed in.")
        // alert(user.displayName)
        mainVue(user.uid)

        //hide modal 
        modal.style.display = "none";



    } else {

        logInStuff = document.getElementById('logInStuff')
        logInStuff.innerHTML = 'Log in'
        // No user is signed in.
        console.log("No user is signed in.")

        //make modal appear
        modal.style.display = "block";



    }
});


Vue.component('include-cards', {
    props: ['place', 'dataKeys', 'userUid', 'sendPlace'],
    data: function () {
        return {
            placeUrl: '',
            apiKey: '',

            isWebsite: '',
            placeImage: "../img/places/singapore.jpg",
            uuid: this.place.uuid,
            arrDataBaseKey: '',
            keyWithStop: this.place.location.latitude.toString() + this.place.location.longitude.toString(),
            btnId: 0,
            rating: this.place.rating,
            reviewsDiv: '',
            fiveStars: 0,
            fourStars: 0,
            threeStars: 0,
            twoStars: 0,
            oneStars: 0
        }
    },

    computed: {
        //key creation to serve as  a key to unique uuid for each place in the database 
        key: function () {
            a = this.place.name + this.keyWithStop
            a = a.replace(/\s/g, '')
            a = a.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '');
            a = this.sendPlace + a
            return a
        },

        //return true of false based on whether the place exist in the database
        isFav: function () {
            return this.dataKeys.includes(this.key)
        },

    },

    methods: {
        //check if API has image link otherwise use a placeholder image 
        checkImage: function () {
            if (this.place.images.length == 0) {
                image = this.placeImage;
                return image
            } else if (this.place.images[0].uuid == '') {
                if ('url' in this.place.images[0]) {
                    image = this.place.images[0].url
                    if (image.includes('http')) {
                        return image
                    } else {
                        image = this.placeImage
                        return image
                    }
                }

            } else {
                imgUUID = this.place.images[0].uuid
                image = `https://tih-api.stb.gov.sg/media/v1/download/uuid/${imgUUID}?apikey=${this.apiKey}`
                return image
            }

        },

        //check if website link is given to a result from the api. if no website exists , 
        checkWeb: function () {
            if (this.place.officialWebsite != '') {
                this.placeUrl = "http://" + this.place.officialWebsite
                return true

            } else {
                return false
            }

        },

        //click event handler to set or remove data from database
        clickLike: function () {
            if (!this.isFav) {
                database.ref(this.userUid + '/favList').child(this.key).set(this.uuid)

            } else {

                database.ref(this.userUid + '/favList').child(this.key).remove()

            }

        },

        //make long descriptions collapsable 
        collapseDes: function () {
            des = this.place.description

            initial = des.slice(0, 101)
            latter = des.slice(101)

            dotId = this.key + 'dot'
            moreId = this.key + 'more'
            linkId = this.key + 'a'



            if (latter.length == 0) {
                moreSpan = ''
                readA = ``

            } else {
                moreSpan = `<span id='${moreId}' style='display:none' >${latter}</span>`
                readA = `<a onclick='readMore(${dotId},${moreId},${linkId})' id='${linkId}' style='cursor: pointer; color:#2F4F4F; text-decoration: underline;' >Read more<i class="fas fa-angle-double-right ml-2" style="font-size:10px"></i></a>`
                // readA = `<a href="#" class="mt-auto ml-2 read">Read more<i class="fas fa-angle-double-right ml-2" style="font-size:10px"></i></a>`
            }


            if (latter.length == 0) {
                dotSpan = `<span id='${dotId}'></span>`
            } else {
                dotSpan = `<span id='${dotId}'>...</span>`
            }


            // str = `
            //     <p>
            //         ${initial}${dotSpan}${moreSpan} ${readA}
            //     </p>

            // `
            str = `
                <p class="card-text">
                    ${initial}${dotSpan}${moreSpan} ${readA}
                </p>

            `
            return str

        },

        showContacts: function () {
            str = ``
            contactObj = this.place.contact

            for (contact in contactObj) {
                if (contact == 'primaryContactNo') {
                    title = 'Primary Contact No.'
                }

                if (contact == 'secondaryContactNo') {
                    title = 'Secondary Contact No.'

                }
                if (contactObj[contact] == '') {

                    str += `<div><span class=''>${title}</span> : Unavailable</div>`
                } else {
                    str += `<div><span class=''>${title}</span> : ${contactObj[contact]}</div>`
                }

            }

            var email = this.place.officialEmail

            if (email == '') {
                email = 'Unavailable'
            }

            str += `<div><span class=''>Email</span> : ${email}</div>`



            return str
        },



        ratingsReviews: function () {
            collapseId = this.key + 'col'
            reviewsSection = ''
            reviews = ''

            reviewsArr = this.place.reviews
            reviewLen = reviewsArr.length



            if (reviewsArr.length == 0) {
                str = ` 
                <p>
                    <span class='font-weight-bold'>Overall Ratings</span> <span class="badge badge-pill badge-warning">Unavailable</span> 
                </p>`


            } else {
                ratingsDict = {
                    '0': 0,
                    '1': 0,
                    '2': 0,
                    '3': 0,
                    '4': 0,
                    '5': 0
                }
                // str = ` 
                // <p>
                //     <span class='font-weight-bold'>Overall Ratings</span> <span class="badge badge-pill badge-warning">${this.rating}</span>
                //     <button class="btn btn-primary" type="button" data-toggle="collapse" data-target="#${collapseId}" onclick="this.blur()">Show reviews</button>
                // </p>`
                str = ` 
                <p>
                    <span class='font-weight-bold'>Overall Ratings</span> <span class="badge badge-pill badge-warning">${this.rating}</span>
                    <button class="btn" type="button" data-toggle="collapse" data-target="#${collapseId}" onclick="this.blur()" style="text-decoration: underline;">Show reviews</button>
                </p>`

                reviewsSection = `<div id='${collapseId}' class="collapse p-1">
                <hr>
                `



                for (review of reviewsArr) {
                    name = review.authorName
                    rat = review.rating
                    img = review.profilePhoto
                    text = review.text
                    // console.log(name,rat,img)
                    ceilRat = Math.ceil(rat)
                    ratingsDict[ceilRat.toString()] += 1

                    reviews += `
                        <div class='p-2'>
                            <img src='${img}' style='width:40px;height:auto'> ${name}<br/>
                            Rating: <span class="badge badge-pill badge-warning">${rat}</span><br/>
                            Review: ${text}
                        </div>
                        <hr>
                    `

                }
                //dic to close off reviewsSection
                reviews += '</div>'

                this.fiveStars = (ratingsDict['5'] / reviewLen) * 100
                this.fourStars = (ratingsDict['4'] / reviewLen) * 100
                this.threeStars = (ratingsDict['3'] / reviewLen) * 100
                this.twoStars = (ratingsDict['2'] / reviewLen) * 100
                this.onceStars = (ratingsDict['1'] / reviewLen) * 100

                reviewsSection += `
                    <span class='ml-1'>Rated ${this.rating} out of 5</span> <br/><br/>

                    <div class='container-fluid'>
                `

                starArr = [this.fiveStars, this.fourStars, this.threeStars, this.twoStars, this.oneStars]

                count = 5
                for (val of starArr) {
                    reviewsSection += `
                    <div class="row mb-2"> 
                        <div class="col-lg-1"><span class="font-weight-bold">${count} star</span></div>

                        <div class='col-lg'> <div class='bg-light'  style='height: 50px'> <div class='bg-primary' style='width: ${val}% ;height: 50px'></div></div>   </div>

                        <div class="col-lg-1 font-weight-bold"> ${val}%  </div>
                    </div>
                    `
                    count -= 1
                }

                reviewsSection += `<div><hr>`


            }



            // console.log(this.reviewsDiv)
            this.reviewsDiv = reviewsSection + reviews
            // console.log(reviewsStr)
            return str
        },

        getAddress: function () {
            str = ''
            addObj = this.place.address

            for (comp in addObj) {
                str += addObj[comp] + ' '
            }
            return str
        }
    },

    template: `
    <div class="card animate__animated animate__pulse my-4 rounded">
        <div class="row">
            <!-- Image start -->
            <div class="image col-12 col-lg-5 d-flex flex-column justify-content-between">
                <div>
                    <img :src="checkImage()" alt="image" class="img-fluid" object-fit="scale-down">
                </div>
                <div class="rating-div d-flex flex-row align-items-center my-3 justify-content-center">
                    <p style="font-weight:bold;" class="my-auto text-center mr-3">Like this place?</p>
                    <button v-if='isFav' class="btn btn-danger btn-sm" :value='uuid' v-on:click="clickLike()" onclick="this.blur();"><i class="fa fa-heart" v-on:click="clickLike()" value></i></button>
                    <button v-else class="btn btn-outline-danger btn-sm" :value='uuid' v-on:click="clickLike()" onclick="this.blur();"><i class="fa fa-heart" v-on:click="clickLike()"></i></button>
                </div>
            </div>
            <!-- End of image -->
            <!-- Details start -->
            <div class="col-12 col-lg-7 px-3">
                <div class="card-block px-5 pt-4 pb-4">
                    <h4 class="card-text">{{ place.name }}</h4>
                    <div v-html='ratingsReviews()'></div>
                    <p class="card-text" v-html='collapseDes()'>
                    </p>
                    <p>
                    <i class="fas fa-map-marked-alt mr-2"></i>
                        Address: <span>{{getAddress()}}</span>
                    </p>
                    <p class="mb-1">
                    <i class="fas fa-address-book mr-2"></i>
                        Contacts <p class="ml-4" v-html='showContacts()'></p>

                    </p>
                    <a :href='placeUrl' v-if='checkWeb()' target="_blank">
                    <i class="fas fa-paper-plane mr-2"></i>
                        Visit Website
                    </a>
                </div>
            </div>
            <!-- End details -->
        </div>
        <div class="row px-3">
            <div v-html='reviewsDiv' class="card reviews-div"></div>
        </div>
    </div>
    `

});





function mainVue(userUid) {
    // alert(userUid)
    const searchPage = new Vue({
        el: '#searchPage',

        data: {
            cards: '',
            warning: '',
            apiKey: '',

            proxyServer: 'https://lingering-butterfly-c754.scaper65.workers.dev/?',
            //placeholder image
            placeImage: "../resource/singapore.jpg",
            //place url 
            placeURL: "https://tih-api.stb.gov.sg/content/v1/accommodation/search?",
            //keyword entered on text field 
            keyword: 'Popular',
            places: [],
            dataKeys: [],
            isAttraction: true,
            isBarClub: false,
            isFoodBev: false,
            userUid: userUid,
            sendPlace: 'acc'
        },

        //return a snapshot of the database EVERYTIME the database changes. Given that the computed properties executes everytime their reactive dependencies change 
        //isFav in the card vue component executes everytime the snapshot function executes 
        created: function () {
            fullURL = encodeURI(`${this.proxyServer}${this.placeURL}&apikey=${this.apiKey}&keyword=popular`)
            this.ajaxCall(fullURL)

            database.ref(this.userUid + '/favList').on('value', snapshot =>

                {
                    if (snapshot.val() != null) {
                        this.dataKeys = Object.keys(snapshot.val())
                        console.log(this.dataKeys)
                    } else {
                        this.dataKeys = []
                    }

                }


            )

        },

        methods: {
            //return popular places
            popularFunc: function () {
                fullURL = encodeURI(`${this.proxyServer}${this.placeURL}&apikey=${this.apiKey}&keyword=popular`)
                this.ajaxCall(fullURL)
            },

            //sending keyword to ajax function 
            sendKeyword: function () {
                if (this.keyword == '') {
                    this.cards = ''
                    this.warning = `<p class='text-danger text-center'>Please enter your keyword</p>`
                    return
                }
                this.warning = ''
                fullURL = encodeURI(`${this.proxyServer}${this.placeURL}&apikey=${this.apiKey}&keyword=${this.keyword}`)
                this.ajaxCall(fullURL)

            },

            // ajax call
            ajaxCall: function (fullURL) {
                axios.get(fullURL)
                    .then(
                        response => {
                            // console.log(fullURL)
                            this.places = response.data.data
                            // console.log(this.places)
                        }
                    )
                    .catch(
                        error => {
                            // console.log(error)
                            this.cards = ''
                            this.warning = `<p class='text-danger text-center'>Results can't be found. Please try another keyword</p>`
                        }
                    )
            },
        }

    })
}
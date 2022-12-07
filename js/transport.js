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
    //insertCards
    insertCards = document.getElementById('insertCards')


    if (user) {
        // User is signed in.

        logInStuff = document.getElementById('logInStuff')
        logInStuff.innerHTML = 'Log out'

        // alert(user.displayName)
        // alert("User is signed in.")

        userUid = user.uid

        showCards = true

        // mainVue(user.uid)


        //hide modal 
        modal.style.display = "none";






    } else {
        logInStuff = document.getElementById('logInStuff')
        logInStuff.innerHTML = 'Log in'

        // No user is signed in.
        // alert('User is not signed in ')
        console.log("No user is signed in.")

        //make modal appear
        modal.style.display = "block";

        // alert("hello")
        console.log(modal)
        // alert(modal)


        //please add the homepage url here 
        // window.location.href='https://www.google.com/'



    }
});

//modal close functions
// span.onclick = function() {
//     modal.style.display = "none";
// }

// window.onclick = function(event) {
//     if (event.target == modal) {
//         modal.style.display = "none";
//     }
// }

var mybutton = document.getElementById("return-to-top");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function () {
    scrollFunction()
};

function scrollFunction() {
    if (document.body.scrollTop > 150 || document.documentElement.scrollTop > 150) {
        document.getElementById("return-to-top").style.display = "block";
    } else {
        document.getElementById("return-to-top").style.display = "none";
    }
}

function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}
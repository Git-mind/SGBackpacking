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


//handling of read more and read less
function display(obj) {
  var no = obj.id.charAt(obj.id.length - 1)
  console.log(no)
  var dots = document.getElementById("dots" + no);
  var moreText = document.getElementById("more" + no);
  var btnText = document.getElementById("read" + no);

  if (dots.style.display === "none") {
    dots.style.display = "inline";
    btnText.innerHTML = "Read more";
    moreText.style.display = "none";
  } else {
    dots.style.display = "none";
    btnText.innerHTML = "Read less";
    moreText.style.display = "inline";
  }
}

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







function buyM1() {
  document.getElementById("m1location").style.display = "inline-block";
}

function exitM1() {
  document.getElementById("m1location").style.display = "none";
}

function buySingtel() {
  document.getElementById("singtellocation").style.display = "inline-block";

}

function exitSingtel() {
  document.getElementById("singtellocation").style.display = "none";


}


function buyStarHub() {
  document.getElementById("starhublocation").style.display = "inline-block";
}

function exitStarHub() {
  document.getElementById("starhublocation").style.display = "none";
}



function topUpStarHub() { //open starhub top up - pop up

  document.getElementById("starhubTopUp").style.display = "inline-block";

}

function closeStarhub() { //close starhub top up - pop up

  document.getElementById("starhubTopUp").style.display = "none";
}


function topUpSingtel() { //open singtel top up - pop up
  document.getElementById("singtelTopUp").style.display = "inline-block";
}

function closeSingtel() { //close singtel top up - pop up

  document.getElementById("singtelTopUp").style.display = "none";
}

function topUpM1() { //open m1 top up - pop up
  document.getElementById("M1TopUp").style.display = "inline-block";
}

function closeM1() { //close starhub top up - pop up
  document.getElementById("M1TopUp").style.display = "none";
}


var additionalCountries = ["Macau", "Myanmar", "New Zealand", "Philippines", "South Korea",
  "Taiwan", "United Kingdom", "United States of America"
]


function expand() {
  var countryList = document.getElementById("countries");

  for (country of additionalCountries) {
    var li = document.createElement("li");
    var node = document.createTextNode(country);
    li.appendChild(node);
    li.id = country
    console.log(li)
    countryList.appendChild(li);
  }

  var expand = document.getElementById("expandBtn")
  expand.style.display = "none";

  var close = document.getElementById("closeBtn")
  close.style.display = "inline-block"

}


function reduce() {
  for (country of additionalCountries) {
    var li = document.getElementById(country);
    li.remove();
  }
  var expand = document.getElementById("expandBtn")
  expand.style.display = "inline-block"

  var close = document.getElementById("closeBtn")
  close.style.display = "none"
}



function show(obj) {
  document.getElementById("reminder").style.display = "none"

  var tableId = obj.id + "Table";
  var results = document.getElementById("results");
  results.textContent = ""; // remove existing table

  if (tableId == "sevendaysTable") {
    results.innerHTML =
      `
      <div class="table-responsive">
      <table  id = "sevendaysTable" class="table mx-auto w-50 table-bordered">
   
      <tr style="text-align:center">
        <th>Prepaid Sim</th>
        <th>Validity</th>
        <th>Price</th>
        <th>Local Data</th>
        <th>Roaming Data</th>
        <th>Local Calls</th>
        <th>International calls</th>
        <th>Local SMS</th>
        <th>Top up?<th>
        Where to buy?
      </tr>
      

      <tr>
        <td>
          <h4>Starhub Travel 4G prepaid sim</h4>
          <img id="starhubsim1" src="../img/wifi/12-travel-sim.jpg">
        </td>
        <td>7 days</td>
        <td>$12</td>
        <td>100GB</td>
        <td>1GB in <br>           
            <ul id="countries">
                <li>Australia</li>
                <li>Indonesia</li>
                <li>Malaysia</li>
                <li>Thailand</li>
                <li>Canada</li>
                <li>China</li>
                <li>Hong Kong</li>
                <li>India</li>
            </ul>
            <a class ="button" onclick="expand()" id="expandBtn" style="color: #00b894;font-weight:bold"> Show More Countries</a>
            <br>
            <a style ="display: none;color: #00b894;font-weight:bold" class ="button" onclick="reduce()" id="closeBtn"> Show Less Countries</a>
        </td>
        <td>500 mins outgoing calls</td>
        <td>30mins</td>
        <td>100</td>
        <td>
          Yes
          <a style=" color:  #00b894;font-weight:bold"class="btn"onclick="topUpStarHub()">(More information)</a>
        </td>
        <td>
            <a style=" color:  #00b894;font-weight:bold"class="btn" onclick="buyStarHub()">Click here</a>
        </td>
      </tr>

      <tr>
        <td>
          <h4>$12 hi!Tourist SIM</h4>
          <img id="singtelsim1" src="../img/wifi/Singtel hi!Tourist EZ-Link SIM Card.png">
        </td>
        <td>7 days</td>
        <td>$12</td>
        <td>100GB</td>
        <td>1GB in <br>
            <ul>
                <li>Australia</li>
                <li>Indonesia</li>
                <li>Malaysia</li>
                <li> Thailand</li>
            </ul>
        </td>
        <td>500 mins outgoing calls</td>
        <td>30 mins</td>
        <td>100</td>
        <td>
          No
        </td>
        <td>
            <a style=" color:  #00b894;font-weight:bold"class="btn" onclick="buySingtel()">Click here</a>
        </td>
      </tr>


      <tr>
        <td>
          <h4>Prepaid Tourist 4G SIM Card</h4>
          <img id="m1sim1" src="../img/wifi/big-201804254ntkpnNaxp.png">
        </td>
        <td>7 days</td>
        <td>$12</td>
        <td>100GB</td>
        <td>1GB in <br>
            <ul>
                <li>Malaysia</li>
                <li>Indonesia</li>
                <li>Hong Kong</li>
                <li>Macau</li>
                <li>Taiwan</li>
            </ul>
        </td>
        <td>500 mins outgoing calls</td>
        <td>20 mins</td>
        <td>100</td>
        <td>
          No
        </td>
        <td>
        <a style=" color:  #00b894;font-weight:bold"class="btn" onclick="buyM1()">Click here</a>
        </td>
      </tr>

    </table>
    </table> `

  } else if (tableId == "twelvedaysTable") {
    results.innerHTML =

      `
      <div class="table-responsive">
      <table id = "twelvedaysTable" class="table table-bordered mx-auto w-50">
   
      <tr style="text-align:center">
        <th>Prepaid Sim</th>
        <th>Validity</th>
        <th>Price</th>
        <th>Local Data</th>
        <th>Roaming Data</th>
        <th>Local Calls</th>
        <th>International calls</th>
        <th>local SMS</th>
        <th>top up?<th>
        Where to buy?
      </tr>
      

      <tr>
        <td>
          <h4>Starhub Travel 4G prepaid sim</h4>
          <img id="starhubsim1" src="../img/wifi/32-travel-sim.jpg">
        </td>
        <td>12 days</td>
        <td>$32</td>
        <td>100GB</td>
        <td>3GB in <br>
             <ul id="countries">
                <li>Australia</li>
                <li>Indonesia</li>
                <li>Malaysia</li>
                <li>Thailand</li>
                <li>Canada</li>
                <li>China</li>
                <li>Hong Kong</li>
                <li>India</li>
            </ul>
            <a class ="button" onclick="expand()" id="expandBtn" style="color: #00b894;font-weight:bold"> Show More Countries</a>
            <br>
            <a style ="display: none;color: #00b894;font-weight:bold"class ="button" onclick="reduce()" id="closeBtn"> Show Less Countries</a>
        </td>
        <td>3000 mins outgoing calls</td>
        <td>90mins</td>
        <td>5000</td>
        <td>
          Yes
          <a style=" color:  #00b894;font-weight:bold"class="btn" onclick="topUpStarHub()">(More information)</a>
        </td>
        <td>
        <a style=" color:  #00b894;font-weight:bold"class="btn" onclick="buyStarHub()">Click here</a>
        </td>
      </tr>

      <tr>
        <td>
          <h4>$30 hi!Tourist SIM</h4>
          <img id="singtelsim1" src="../img/wifi/30-hi-tourist-card.png">
        </td>
        <td>12 days</td>
        <td>$30</td>
        <td>100GB</td>
        <td>3GB in <br> 
            <ul>
                <li>Australia</li>
                <li>Indonesia</li>
                <li>Malaysia</li>
                <li> Thailand</li>
            </ul>
        </td>
        <td>Unlimited</td>
        <td>90 mins</td>
        <td>Unlimited</td>
        <td>
          Yes
          <a style=" color: #00b894;font-weight:bold"class="btn" onclick="topUpSingtel()">(More information)</a>
        </td>
        <td>
            <a style=" color: #00b894;font-weight:bold"class="btn" onclick="buySingtel()">Click here</a>
        </td>
      </tr>


      <tr>
        <td>
          <h4>Prepaid Tourist 4G SIM Card</h4>
          <img id="m1sim1" src="../img/wifi/Screenshot 2020-10-09 164409.png">
        </td>
        <td>12 days</td>
        <td>$30</td>
        <td>100GB</td>
        <td>3GB in<br> 
            <ul>
                <li>Malaysia</li>
                <li>Indonesia</li>
                <li>Hong Kong</li>
                <li>Macau</li>
                <li>Taiwan</li>
            </ul>
        </td>
        <td>3000 mins outgoing calls</td>
        <td>50 mins</td>
        <td>5000</td>
        <td>
          Yes
          <a style="color:  #00b894;font-weight:bold"class="btn" onclick="topUpM1()">(More information)</a>
        </td>
        <td>
            <a style=" color:  #00b894;font-weight:bold"class="btn" onclick="buyM1()">Click here</a>
        </td>
      </tr>

      </table>
      </table>`

  } else if (tableId == "fourteendaysTable") {
    results.innerHTML =
      `
      <div class="table-responsive">
      <table  id = "fourteendaysTable" class="table table-bordered mx-auto w-50" >
   
      <tr style="text-align:center">
        <th>Prepaid Sim</th>
        <th>Validity</th>
        <th>Price</th>
        <th>Local Data</th>
        <th>Roaming Data</th>
        <th>Local Calls</th>
        <th>International calls</th>
        <th>local SMS</th>
        <th>top up?<th>
        Where to buy?
      </tr>

      <tr>
        <td>
          <h4>$50 hi!Tourist SIM</h4>
          <img id="singtelsim1" src="../img/wifi/Screenshot 2020-10-09 164141.png">
        </td>
        <td>14 days</td>
        <td>$50</td>
        <td>100GB</td>
        <td>5GB in <br>
            <ul>
                <li>Australia</li>
                <li>Indonesia</li>
                <li>Malaysia</li>
                <li> Thailand</li>
            </ul>
        </td>
        <td>Unlimited</td>
        <td>90 mins</td>
        <td>Unlimited</td>
        <td>
          Yes 
          <a style=" color:  #00b894;font-weight:bold"class="btn" onclick="topUpSingtel()">(More information)</a
        </td>
        <td>
          <a style=" color:  #00b894;font-weight:bold"class="btn" onclick="buySingtel()">Click here</a>
        </td>
      </tr>


      <tr>
        <td>
          <h4>Prepaid Tourist 4G SIM Card</h4>
          <img id="m1sim1" src="../img/wifi/Screenshot 2020-10-09 164641.png">
        </td>
        <td>14 days</td>
        <td>$50</td>
        <td>100GB</td>
        <td>5GB in <br>
            <ul>
                <li>Malaysia</li>
                <li>Indonesia</li>
                <li>Hong Kong</li>
                <li>Macau</li>
                <li>Taiwan</li>
            </ul>
        </td>
        <td>3000 mins outgoing calls</td>
        <td>50 mins</td>
        <td>5000</td>
        <td>
          Yes
          <a style=" color: #00b894;font-weight:bold"class="btn" onclick="topUpM1()">(More information)</a>
        </td>
        <td>
            <a style=" color: #00b894;font-weight:bold"class="btn" onclick="buyM1()">Click here</a>
        </td>
      </tr>
    </table>
    </table>
    `

  }
}
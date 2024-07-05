import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://realtime-database-49fd1-default-rtdb.firebaseio.com/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const endorsementListInDB = ref(database, "endorsementList")

const inputFieldEl = document.getElementById("input")
const fromFieldEl = document.getElementById("from")
const toFieldEl = document.getElementById("to")
const publishButtonEl = document.getElementById("publish-btn")
const endorsementListEl = document.getElementById("endorsement-list")

publishButtonEl.addEventListener("click", function() {
    let inputValue = inputFieldEl.value
    let fromValue = fromFieldEl.value
    let toValue = toFieldEl.value

    let inputObj = {
        from: fromValue,
        value: inputValue,
        to: toValue
    }

    push(endorsementListInDB, inputObj)

    clearInputField()
})

onValue(endorsementListInDB, function(snapshot) {
    if (snapshot.exists()) {
        let endorsArray = Object.entries(snapshot.val())

        clearEndorsementListEl()

        for (let i = 0; i < endorsArray.length; i++) {
            let currentItem = endorsArray[i]

            appendEndorsementToList(currentItem)
        }
    }
})

function clearEndorsementListEl() {
    endorsementListEl.innerHTML = ""
}

function clearInputField(){
    inputFieldEl.value = ""
    fromFieldEl.value = ""
    toFieldEl.value = ""
}

function appendEndorsementToList(arr){
    let obj = arr[1]

    let newEl = document.createElement("li")
    newEl.innerHTML = `<strong>To ${obj.to}</strong>
                        <br>
                        ${obj.value}
                        <br>
                        <strong>From ${obj.from}</strong>`
    endorsementListEl.append(newEl)
}
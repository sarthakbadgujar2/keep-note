let database;

const taskStore = "Tasks";
const completedTaskStore = "CompletedTasks";

function Task(title) {
    this.title = title;
}

function CompletedTask(title) {
    this.title = title;
    this.completedDate = getCurrentDate();
}


window.onload = function() {
    let req = window.indexedDB.open("GetItDoneAppDB", 1);

    req.onsuccess = function() {
        database = req.result;
    }

    req.onerror = function(event) {
        alert("There was an error", event);
    }

    req.onupgradeneeded = function(event) {
        let db = req.result;
        console.log("Created Stores");
        let objectStore = db.createObjectStore(taskStore, { keyPath: "id", autoIncrement: true });
        let objectStore2 = db.createObjectStore(completedTaskStore, { keyPath: "id", autoIncrement: true });
    }
}

let defaultError = function() {
  console.log("Soeting went wrong");
}

function addTask(store, task, success, error = defaultError {
  let transaction = database.transaction([store],"readwrite");
  let objectStore = transaction.objectStore(store);
  let request = objectStore.add(task);
  request.onerror = error;
  request.onsuccess = success;
}

function readTasks(store,success, error = defaultError {
  let transaction = database.transaction([store],"readonly");
  let objectStore = transaction.objectStore(store);
  let request = objectStore.openCursor();
  request.onerror = error;
  let tasks = [];
  request.onsuccess = function() {
    let cursor = event.target.result;
    if (cursor){
      let task = cursor.value;
      task.push(task);
      cursor.continue();
    }else {
      success(tasks);
    }
  };
}

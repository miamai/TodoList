# Quote Generator + Todo List

> [website](https://qoute-todolist.netlify.app/) display on Netify

## 關鍵要點

> Qoute Generator

1. AddEventListener
2. Fetch()

> Todo List

1. AddEventListener
2. Local Storage
3. JSON stringify and parse

## 基礎語法

1. `fetch()` : 執行送出 request，成功會回傳帶有 response 已實現 Promise 物件

因為 api 檔案為 json 格式，所以在 fetch 取得檔案之後，透過 json()接收為 JS 可讀的 Promise 物件，接著傳遞到下一層

```javascript
fetch("http://api.quotable.io/random")
  .then((res) => res.json())
  .then((result) => {
    quoteText.innerText = result.content;
    authorName.innerText = result.author;
    quoteBtn.innerText = "New Quote";
    quoteBtn.classList.remove("loading");
  });
```

2. `navigator.clipboard.writeText()` : 取得瀏覽器 Clipboard 物件，屬性 writeText()可以寫入特定字串到系統剪貼版

3. `localStorage`

- `localStorage.setItem(key, value)` : 儲存資料
- `localStorage.getItem(key)` : 讀取資料

4.

### 解惑

> `res.jason()` `JSON.parse()`差別?
> `res.jason()` is asynchronous and returns a Promise object that resolves to a JavaScript object. `JSON.parse()` is synchronous can parse a string to a JavaScript object.

### Todo List 如何搭配本地儲存?

因為 localStorage 儲存格式 key, value 只接受字串，一開始嘗試宣告 tasks 物件包含 name, status 資料，並透過 setItem()將 tasks 儲存到本地，但因為非字串，所以會回傳[object Object]。

因此透過 JSON.stringify() 方法，將要儲存的資料轉換為 JSON 格式的字串；要取出資料時，再透過 JSON.parse() 方法，將資料轉換回原本的格式：

```javascript
// get localstorage to-do list, parse ls data to js object
let tasks = JSON.parse(localStorage.getItem("todo-list"));

todoInput.addEventListener("keyup", (e) => {
  let userTodo = todoInput.value.trim();
  if (e.key == "Enter" && userTodo) {
    if (!isEdited) {
      if (!tasks) {
        tasks = [];
      }
      let todoInfo = { name: userTodo, status: "pending" };
      tasks.push(todoInfo);
    } else {
      isEdited = false;
      tasks[editId].name = userTodo;
    }

    todoInput.value = "";
    localStorage.setItem("todo-list", JSON.stringify(tasks)); //save to localstorage with todo-list name, then have to convert data into string
    showTasks("all");
  }
});
```

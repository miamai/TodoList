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

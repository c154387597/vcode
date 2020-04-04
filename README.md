## 安全验证

```javascript
  new $vcode({
    type: 1,
    close: function () {
      console.log('slide trigger')
    },
    success: function () {
      console.log('verifiede')
    }
  })
```

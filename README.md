# facebook2ghost

Import posts from fanpage into ghost blog

## Requirements
```javascript
npm install fb
npm install async
npm install moment
```

On linux ENV variable must be set:

```
export FB_SITE=''
export FB_ACCESSTOKEN=''
```

FB_SITE format
```
export FB_SITE='/mysite/posts'
export FB_SITE='/1231234234234/posts'
```

## Running
```javascript
nodejs import.js
```

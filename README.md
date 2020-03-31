# Electron-tray-tips

![](https://img.shields.io/badge/build-passing-brightgreen)
![](https://img.shields.io/badge/stable-v0.1.1-blue)
[![](https://img.shields.io/badge/downloads-4.57%20KB-orange)](https://packagist.org/packages/ar414/redis-lock)
![](https://img.shields.io/badge/coverage-47%25-green)
![](https://img.shields.io/badge/license-MIT-brightgreen)


Used to display preview window when Electron.Tray cursor is focused on tray

## effect
![electron-tray-tips-bottom](https://cdn.ar414.com/electron-tray-tips-bottom.gif)


## Install
```
npm install electron-tray-tips
```

## Usage
```javascript
...
const { Tray } = require('electron');
const ElectronTrayTips = require('electron-tray-tips');

let tray = new Tray('tray26.ico');
let isBalloonShow = false;
tray.setToolTip('ar414');
const ElectronTrayTipsClass = new ElectronTrayTips(tray);
this.tray.addListener('mouse-move',((event, position) => {
    
     if(!this.isBalloonShow){
         ElectronTrayTipsClass.showTrayTips(`file://...tips.html')}`,
         () => {
            isBalloonShow = false;
         });
     }
     
}));

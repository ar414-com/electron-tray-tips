const { screen,BrowserWindow } = require('electron');

class ElectronTrayTips {

    constructor(tray) {
        this.tray = tray;
        this.tipsWin = null;
        this.tipShowTimerId = null;
    }


    showTrayTips(loadUrl = '',closeCallBack) {

        if(!this.tipsWin){

            const taskArea = this.getTrayArea();
            const trayPosition = this.tray.getBounds();
            const workAreaSize = screen.getPrimaryDisplay().workAreaSize;
            let x = 0;
            let y = 0;
            switch (taskArea) {
                case 39:
                    x = workAreaSize.width - 230;
                    y = trayPosition.y - 40;
                    break;
                case 40:
                    x = trayPosition.x - 95;
                    y = workAreaSize.height - 115;
                    break;
                case 37:
                    x = this.screenSize.width - workAreaSize.width;
                    y = trayPosition.y - 35;
                    break;
                default:
                    x = trayPosition.x - 110;
                    y = this.screenSize.height - workAreaSize.height;
                    break;
            }

            this.tipsWin = new BrowserWindow({
                width: 230,
                height: 115,
                x:x,
                y:y,
                skipTaskbar:true,
                alwaysOnTop:true,
                frame:false,
                show: false
            });
            this.tipsWin.loadURL(loadUrl);
            this.tipsWin.once('ready-to-show', () => {
                this.tipsWin.show();
            });
        }

        if(this.tipShowTimerId === null){
            this.tipShowTimerId = setInterval(() => {
                const cursorPosition = screen.getCursorScreenPoint();
                const trayPosition = this.tray.getBounds();
                const tipWinPosition = this.tipsWin.getBounds();

                //托盘icon
                if((cursorPosition.x >  trayPosition.x && cursorPosition.x <= trayPosition.x + trayPosition.width) && (cursorPosition.y >  trayPosition.y && cursorPosition.y <= trayPosition.y + trayPosition.height))
                {
                    return;
                }

                //消息框
                if((cursorPosition.x >  tipWinPosition.x && cursorPosition.x <= tipWinPosition.x + tipWinPosition.width) && (cursorPosition.y >  tipWinPosition.y && cursorPosition.y <= tipWinPosition.y + tipWinPosition.height))
                {
                    return;
                }

                this.closeTrayTips(closeCallBack);
            }, 250);
        }

    }

    closeTrayTips(closeCallBack) {
        if(this.tipsWin){
            this.tipsWin.close();
            this.tipsWin = null;
            clearInterval(this.tipShowTimerId);
            this.tipShowTimerId = null;
            closeCallBack();
        }
    }


    getTrayArea() {

        if(!this.tray){
            throw Error('tray not create');
        }

        //可显示区域
        const workAreaSize = screen.getPrimaryDisplay().workAreaSize;

        //app托盘位置信息
        const trayPosition = this.tray.getBounds();

        //屏幕信息
        const screenSize = screen.getPrimaryDisplay().size;

        if(workAreaSize.height < screenSize.height)
        {
            if(trayPosition.y < screenSize.height / 2)
            {
                return 38;
            }
            else
            {
                return 40;
            }
        }
        else if(workAreaSize.height === screenSize.height)
        {
            if(trayPosition.x > -100 && trayPosition.x < screenSize.width / 2)
            {
                return 37;
            }
            else
            {
                return 39;
            }
        }

        throw Error('get task area error');

    }

}

module.exports = ElectronTrayTips;
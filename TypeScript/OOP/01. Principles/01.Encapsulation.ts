class Television {
    private _hight: number;
    private _width: number;
    private _screenSize: number;
    private _maxVolume: number;
    private _volume: number;
    private _power: boolean;
    
    public constructor(hight: number, width: number, screenSize?: number, maxVolume?: number, volume?: number, power?: boolean) {
        this._hight = hight;
        this._width = width;
        this._screenSize = screenSize;
        this._maxVolume = maxVolume;
        this._volume = volume;
        this._power = power;
    }


    public channelTunning(channel: number) {
        switch (channel) {
            case 1: return 34.56;
            case 2: return 54.89;
            case 3: return 73.89;
            case 4: return 94.98;
        }
        return 0;
    }
    public increaseVolume() {
        if (this._maxVolume > this._volume) this._volume++;
        return this._volume;
    }
    public decreaseVolume() {
        if (0 < this._volume) this._volume--;
        return this._volume;
    }
    public powerSwitch() {
        this._power = !this._power;
    }
}
const television = new Television(10.5, 7.9);
television.powerSwitch();
television.channelTunning(2);
television.increaseVolume();
television.decreaseVolume();
// television.width = 12; // error

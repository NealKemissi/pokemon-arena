export default class Sprite {

  /** constructeur **/
  constructor(
    public _name?: string,
    public _front?: string,
    public _back?: string,
  ) {
      if(!_front || !_back) {
          this._front = '../../assets/img/'+ this._name +'_front.gif';
          this._back = '../../assets/img/'+ this._name +'_back.gif';
      }
  }
}

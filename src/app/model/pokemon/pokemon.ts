import Attack from '../attack/attack';

export default class Pokemon {
    
    /** constructeur **/
    constructor(
        public _name? : string, 
        public _speed? : number, 
        public _pv? : number, 
        public _attacks? : Array<Attack>,//= new Array(4)
        public _level? : number,
        public _offensiveStat? : number,
        public _defensiveStat? : number
        ) {
    }

    get attacks() {
        return this._attacks;
    }
    set attacks(attacks : Array<Attack>) {
        if(attacks.length > 4) {
            throw new Error('le Pokemon ne peut pas avoir plus de 4 capacité !')
        }
        this._attacks = attacks;
    }

    /**
     * modifie la vie du pokemon
     * @param damage 
     */
    public modifyHealth(damage: number){
        this._pv -= damage;
    }
    /**
     * lance une attaque au hasard
     * @return l'attaque à lancer
     */
    public selectRandomAttack() : Attack {
        return this._attacks[Math.floor(Math.random() * 3)];
    }
    /**
     * lance une attaque en particulier
     * @param id
     * @return l'attaque à lancer
     */
    public selectAttack(id : number) : Attack {
        return this._attacks[id];
    }
    /**
     * degats subit lors d'une attaque
     * @param attack 
     * @return les pv restants
     */
    public hitByAttack(attack : Attack) : number {
        this._pv = this._pv - attack._damage;
        return this._pv;
    }
}
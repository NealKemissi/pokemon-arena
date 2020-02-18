import Attack from '../attack/attack';

export default class Pokemon {
    
    /** nom du pokemon **/
    private name : string;
    /** vitesse du pokemon **/
    private speed : number;
    /** vie du pokemon **/
    private pv : number;
    /** niveau du pokemon **/
    private level: number;
    /** niveau stats offensives  **/
    private offensiveStat: number;
    /** niveau stats defensives  **/
    private defensiveStat: number;
    /** liste d'attaque **/
    private attacks : Array<Attack> = new Array(4);
    
    /** constructeur **/
    constructor(_name : string, 
        _speed : number, 
        _pv : number, 
        _attacks : Array<Attack>,
        _level: number = 1,
        _offensiveStat: number = 10,
        _defensiveStat: number = 10
        ) {
        this.name = _name;
        this.speed = _speed;
        this.pv = _pv;
        this.attacks = _attacks;
        this.level = _level;
        this.offensiveStat= _offensiveStat;
        this.defensiveStat= _defensiveStat;
    }

    public getName() : string {
        return this.name;
    }
    public getSpeed() : number {
        return this.speed;
    }
    public getPv() : number {
        return this.pv;
    }
    public getAttacks() : Array<Attack> {
        return this.attacks;
    }
    public getLevel() : number{
        return this.level;
    }
    public getOffensiveStat(): number{
        return this.offensiveStat;
    }
    public getDefensiveStat(): number{
        return this.defensiveStat;
    }

    /**
     * modifie la vie du pokemon
     * @param damage 
     */
    public modifyHealth(damage: number){
        this.pv -= damage;
    }
    /**
     * lance une attaque au hasard
     * @return l'attaque à lancer
     */
    public selectRandomAttack() : Attack {
        return this.attacks[Math.floor(Math.random() * 3)];
    }
    /**
     * lance une attaque en particulier
     * @param id
     * @return l'attaque à lancer
     */
    public selectAttack(id : number) : Attack {
        return this.attacks[id];
    }
    /**
     * degats subit lors d'une attaque
     * @param attack 
     * @return les pv restants
     */
    public hitByAttack(attack : Attack) : number {
        this.pv = this.pv - attack.getDamage();
        return this.pv;
    }
}
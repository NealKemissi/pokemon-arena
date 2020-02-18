import Attack from '../attack/attack';

export default class Pokemon {
    
    /** nom du pokemon **/
    private name : string;
    /** vitesse du pokemon **/
    private speed : number;
    /** vie du pokemon **/
    private pv : number;
    /** liste d'attaque **/
    private attacks : Array<Attack> = new Array(4);

    /** constructeur **/
    constructor(name : string, speed : number, pv : number, attacks : Array<Attack>) {
        this.name = name;
        this.speed = speed;
        this.pv = pv;
        this.attacks = attacks;
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
     *  @return l'attaque à lancer
     */
    public selectAttack(id : number) : Attack {
        return this.attacks[id];
    }
    /**
     * degats subit lors d'une attaque
     * @param attack 
     */
    public hitByAttack(attack : Attack) : number {
        this.pv = this.pv - attack.getDamage();
        return this.pv;
    }
}
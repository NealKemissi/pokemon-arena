export default class Attack {

    /** nom de l'attaque  **/
    private name : string;
    /** degat de l'attaque  **/
    private damage : number;

    /** constructeur **/
    constructor(name : string, damage : number) {
        this.name = name;
        this.damage = damage;
    }

    public getName() : string {
        return this.name;
    }
    public getDamage() : number{
        return this.damage;
    }
}
export default class User{
    constructor(user){
        this.user = user;
        this.opp = user === "user1" ? "user2" : "user1"
        this.currentTurn = false;
        this.points = 0;
        this.blocks = [true, true, true, true, true, true, true, true, true]
    }

    increasePoint = () => this.points++;

    changeTurn = () => {
        this.currentTurn = !this.currentTurn;
    }

    getName = () => this.name;
    getTurn = () => this.currentTurn;
    getPoints = () => this.points;

}
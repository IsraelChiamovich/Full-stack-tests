enum BeeperStatus {
    Manufactured = "manufactured",
    Assembled = "assembled",
    Shipped = "shipped",
    Deployed = "deployed",
    Detonated = "detonated"
  }
  
  class Beeper {
    public id: number;
    public status: BeeperStatus;
    public created_at: Date;
    public detonated_at?: Date;
    public latitude?: number;
    public longitude?: number;
  
    constructor(public name: string) {
        this.id = Number(Math.random().toString().split(".")[1]);
        this.status = BeeperStatus.Manufactured;
        this.created_at = new Date();
    }
  }
  
  export {Beeper, BeeperStatus}
  
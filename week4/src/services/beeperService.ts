import { getFileData, saveFileData } from "../config/fileDataLayer";
import { Beeper, BeeperStatus } from "../models/beeperModel";

class BeeperService {
  public static async getAllBeepers(): Promise<Beeper[]> {
    try {
      return (await getFileData("beepers")) as Beeper[];
    } catch (err) {
      throw new Error("Failed to get beepers");
    }
  }

  public static async getBeeperById(id: number): Promise<Beeper | undefined> {
    try {
      const beepers: Beeper[] = await this.getAllBeepers();
      return beepers.find((beeper) => beeper.id === id);
    } catch (err) {
      throw new Error(`beeper with id ${id} not found`);
    }
  }

  public static async createBeeper(name: string): Promise<Beeper> {
    try {
      const newBeeper = new Beeper(name);
      const beepers: Beeper[] = await this.getAllBeepers();
      beepers.push(newBeeper);
      await saveFileData("beepers", beepers);
      return newBeeper;
    } catch (err) {
      throw new Error("Error creating new beeper");
    }
  }

  public static async updateBeeperStatus(
    id: number,
    status: BeeperStatus,
    latitude?: number,
    longitude?: number
  ): Promise<Beeper | undefined> {
    const beepers = await this.getAllBeepers();
    const beeper = beepers.find((beeper) => beeper.id === id);

    if (!beeper || !this.isValidStatusUpdate(beeper.status, status)) {
      throw new Error(`Invalid beeper or status update for id ${id}`);
    }

    beeper.status = status;

    if (status === BeeperStatus.Deployed) {
      if (!(latitude && longitude)) {
        throw new Error("please enter latitude and longitude");
      }

      if (!this.isValidPositionToUpdate(longitude, latitude)) {
        throw new Error("invalid position");
      }

      beeper.latitude = latitude;
      beeper.longitude = longitude;
      this.timerBeeperDetonation(beeper);
    } else if (status === BeeperStatus.Detonated) {
      beeper.detonated_at = new Date();
    }

    await saveFileData("beepers", beepers);
    return beeper;
  }

  private static isValidPositionToUpdate(long: number, lat: number): boolean {
    return (
      long >= 34.59793 && long <= 36.59793 && lat >= 33.01048 && lat <= 34.6793
    );
  }

  private static isValidStatusUpdate(
    currentStatus: BeeperStatus,
    newStatus: BeeperStatus
  ): boolean {
    const statusOrder = [
      BeeperStatus.Manufactured,
      BeeperStatus.Assembled,
      BeeperStatus.Shipped,
      BeeperStatus.Deployed,
      BeeperStatus.Detonated,
    ];
    const currentStatusIndex = statusOrder.indexOf(currentStatus);
    const newStatusIndex = statusOrder.indexOf(newStatus);

    return newStatusIndex > currentStatusIndex;
  }

  private static timerBeeperDetonation(beeper: Beeper): void {
    setTimeout(async () => {
      const beepers = await this.getAllBeepers();
      const updatedBeeper = beepers.find((b) => b.id === beeper.id);

      if (updatedBeeper) {
        updatedBeeper.status = BeeperStatus.Detonated;
        updatedBeeper.detonated_at = new Date();
        await saveFileData("beepers", beepers);
        console.log(`Beeper ${beeper.id} has been detonated`);
      }
    }, 10000);
  }

  public static async deleteBeeper(id: number): Promise<boolean> {
    try {
      const beepers = await this.getAllBeepers();
      const updatedBeepers = beepers.filter((beeper) => beeper.id !== id);
      if (updatedBeepers.length !== beepers.length) {
        await saveFileData("beepers", updatedBeepers);
        return true;
      }
      return false;
    } catch (err) {
      throw new Error(`Failed to delete beeper with id ${id}`);
    }
  }

  public static async getBeepersByStatus(
    status: BeeperStatus
  ): Promise<Beeper[]> {
    try {
      const beepers = await this.getAllBeepers();
      return beepers.filter((beeper) => beeper.status === status);
    } catch (err) {
      throw new Error(`Failed to get beepers with status ${status}`);
    }
  }
}

export default BeeperService;

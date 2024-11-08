export class Player {
  public id: number;
  public name: string;
  public balance: number;
  private onNotify: (event: string, data: any) => void;

  constructor({
    id,
    name,
    balance,
    onNotify,
  }: {
    id: number;
    name: string;
    balance: number;
    onNotify: (event: string, data: any) => void;
  }) {
    this.id = id;
    this.name = name;
    this.balance = balance;
    this.onNotify = onNotify;
  }

  // Notify method to pass event and data to the player's onNotify handler
  public notify(event: string, data: any) {
    this.onNotify(event, data);
  }
}

import { IStreamLogger } from "../../core/handlers/stream-handler.types";

export class ConsoleLogger implements IStreamLogger {
  private static instance: ConsoleLogger | null = null;

  private constructor() {}

  public static getInstance() {
    if (!this.instance) {
      this.instance = new ConsoleLogger();
    }

    return this.instance;
  }

  log(...args: any[]) {
    console.log(...args);
  }

  error(...args: any[]) {
    console.error(...args);
  }

  end() {
    console.log("Ready");
  }
}

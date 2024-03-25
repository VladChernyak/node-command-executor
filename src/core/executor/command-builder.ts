import { ICommand } from "./command-executor.types";

export abstract class CommandBuilder {
  protected abstract command: ICommand;
  public abstract build(): ICommand;
}

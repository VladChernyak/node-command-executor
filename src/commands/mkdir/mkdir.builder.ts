import { CommandBuilder } from "../../core/executor/command-builder";
import { ICommand } from "../../core/executor/command-executor.types";

export class MkdirBuilder extends CommandBuilder {
  protected command: ICommand = { name: "mkdir", args: [] };
  private path: string;
  private fileName: string;

  public setPath(path: string) {
    this.path = path;
    return this;
  }

  public setName(name: string) {
    this.fileName = name;
    return this;
  }

  public build() {
    if (!this.path) {
      throw new Error("Directory path is not assigned");
    }

    if (!this.fileName) {
      throw new Error("Directory name is not assigned");
    }

    this.command.args.push(`${this.path}/${this.fileName}`);
    return this.command;
  }
}

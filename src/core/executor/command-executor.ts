import { ChildProcessWithoutNullStreams } from "child_process";
import { IStreamLogger } from "../handlers/stream-handler.types";
import { type ICommand } from "./command-executor.types";

export abstract class CommandExecutor<Input> {
  constructor(private logger: IStreamLogger) {}

  public async execute() {
    const promptValue = await this.prompt();
    const command = await this.build(promptValue);
    const stream = await this.spawn(command);

    this.processStream(stream, this.logger);
  }

  protected abstract prompt(): Promise<Input>;
  protected abstract build(promptValue: Awaited<Input>): ICommand;
  protected abstract spawn(command: ICommand): ChildProcessWithoutNullStreams;
  protected abstract processStream(stream: ChildProcessWithoutNullStreams, logger: IStreamLogger): void;
}

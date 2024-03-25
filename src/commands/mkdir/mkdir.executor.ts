import { ChildProcessWithoutNullStreams, spawn } from "child_process";
import { MkdirBuilder } from "./mkdir.builder";
import { IMkdirInput } from "./mkdir.types";
import { CommandExecutor } from "../../core/executor/command-executor";
import { IStreamLogger } from "../../core/handlers/stream-handler.types";
import { PromptService } from "../../core/prompt/prompt.service";
import { PromptTypes } from "../../core/prompt/prompt.types";
import { ICommand } from "../../core/executor/command-executor.types";
import { StreamHandler } from "../../core/handlers/stream-handler";

export class MkdirExecutor extends CommandExecutor<IMkdirInput> {
  constructor(logger: IStreamLogger) {
    super(logger);
  }

  protected async prompt() {
    const promptService = new PromptService();

    const path = await promptService.input<PromptTypes.input>(PromptTypes.input, { message: "Parrent folder path" });
    const name = await promptService.input<PromptTypes.input>(PromptTypes.input, { message: "Name" });

    return { path, name };
  }

  protected build({ path, name }: IMkdirInput) {
    return new MkdirBuilder().setPath(path).setName(name).build();
  }

  protected spawn(command: ICommand): ChildProcessWithoutNullStreams {
    return spawn(command.name, command.args);
  }

  protected processStream(stream: ChildProcessWithoutNullStreams, logger: IStreamLogger) {
    const handler = new StreamHandler(logger);
    handler.processOutput(stream);
  }
}

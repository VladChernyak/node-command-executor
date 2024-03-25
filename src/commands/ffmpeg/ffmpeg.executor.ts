import { ChildProcessWithoutNullStreams, spawn } from "child_process";
import { CommandExecutor } from "../../core/executor/command-executor";
import { FilesService } from "../../core/files/files.service";
import { IStreamLogger } from "../../core/handlers/stream-handler.types";
import { PromptService } from "../../core/prompt/prompt.service";
import { PromptTypes } from "../../core/prompt/prompt.types";
import { StreamHandler } from "../../core/handlers/stream-handler";
import { FfmpegBuilder } from "./ffmpeg.builder";
import { IFfmpegCommand, IFfmpegInput } from "./ffmpeg.types";

export class FfmpegExecutor extends CommandExecutor<IFfmpegInput> {
  private fileService = new FilesService();

  constructor(logger: IStreamLogger) {
    super(logger);
  }

  protected async prompt() {
    const promptService = new PromptService();

    const path = await promptService.input<PromptTypes.input>(PromptTypes.input, { message: "Input file path" });
    const width = await promptService.input<PromptTypes.input>(PromptTypes.input, { message: "Output width?" });
    const height = await promptService.input<PromptTypes.input>(PromptTypes.input, { message: "Output height?" });
    const name = await promptService.input<PromptTypes.input>(PromptTypes.input, { message: "Output file name" });

    return { path, width, height, name };
  }

  protected build({ path, width, height, name }: IFfmpegInput): IFfmpegCommand {
    const output = this.fileService.getFilePath(path, name, "mp4");

    const command = new FfmpegBuilder()
      .setInputPath(path)
      .setResolution(Number(width), Number(height))
      .setOutputPath(output)
      .build();

    return { ...command, output };
  }

  protected spawn(command: IFfmpegCommand) {
    this.fileService.deleteFilesIfExist(command.output);
    return spawn(command.name, command.args);
  }

  protected processStream(stream: ChildProcessWithoutNullStreams, logger: IStreamLogger) {
    const handler = new StreamHandler(logger);
    handler.processOutput(stream);
  }
}

import { CommandBuilder } from "../../core/executor/command-builder";
import { ICommand } from "../../core/executor/command-executor.types";

export class FfmpegBuilder extends CommandBuilder {
  protected command: ICommand = { name: "ffmpeg", args: ["-i"] };
  private options: Map<string, string> = new Map();
  private inputPath: string;
  private outputPath: string;

  constructor() {
    super();
    this.options.set("-c:v", "libx264");
  }

  public setInputPath(path: string) {
    this.inputPath = path;
    return this;
  }

  public setOutputPath(path: string) {
    this.outputPath = path;
    return this;
  }

  public setResolution(width: number, height: number) {
    this.options.set("-s", `${width}x${height}`);
    return this;
  }

  public build(): ICommand {
    if (!this.inputPath) {
      throw new Error("Input path is not assigned");
    }

    if (!this.outputPath) {
      throw new Error("Output path is not assigned");
    }

    this.command.args.push(this.inputPath);
    this.options.forEach((value, key) => {
      this.command.args.push(key, value);
    });
    this.command.args.push(this.outputPath);

    return this.command;
  }
}

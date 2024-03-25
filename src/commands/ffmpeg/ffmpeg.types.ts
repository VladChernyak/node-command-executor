import { ICommand } from "../../core/executor/command-executor.types";

export interface IFfmpegInput {
  path: string;
  width: string;
  height: string;
  name: string;
}

export interface IFfmpegCommand extends ICommand {
  output: string;
}

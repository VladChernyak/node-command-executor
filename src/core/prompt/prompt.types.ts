import { input, select, confirm } from "@inquirer/prompts";

export enum PromptTypes {
  input = "input",
  confirm = "confirm",
  select = "select",
}

export interface IPromptTypesOptions {
  [PromptTypes.input]: Parameters<typeof input>[0];
  [PromptTypes.select]: Parameters<typeof select>[0];
  [PromptTypes.confirm]: Parameters<typeof confirm>[0];
}

export type PromptReturnType = Promise<string | number | boolean>;

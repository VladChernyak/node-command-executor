import { input, select, confirm } from "@inquirer/prompts";
import { PromptTypes, type IPromptTypesOptions, type PromptReturnType } from "./prompt.types";

export class PromptService {
  public input<T extends PromptTypes.input>(type: T, options: IPromptTypesOptions[T]): Promise<string>;
  public input<T extends PromptTypes.select>(type: T, options: IPromptTypesOptions[T]): Promise<string | number>;
  public input<T extends PromptTypes.confirm>(type: T, options: IPromptTypesOptions[T]): Promise<boolean>;
  public async input<T extends PromptTypes>(type: T, options: IPromptTypesOptions[T]): PromptReturnType {
    const promptHandlers = {
      input,
      select,
      confirm,
    };

    return await promptHandlers[type](options as any);
  }
}

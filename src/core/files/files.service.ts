import { promises } from "fs";
import { dirname, join } from "path";

export class FilesService {
  private async isExist(path: string) {
    try {
      await promises.stat(path);
      return true;
    } catch {
      return false;
    }
  }

  public getFilePath(path: string, name: string, ext: string) {
    return join(`${dirname(path)}/${name}.${ext}`);
  }

  public async deleteFilesIfExist(path: string) {
    if (await this.isExist(path)) {
      promises.unlink(path);
    }
  }
}

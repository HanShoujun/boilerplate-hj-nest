/**
 * @description:
 * @author:Hsj
 * @Date:2020-09-10 09:33:19
 */

export abstract class OutputDto {
  get description() {
    return this.toString();
  }
}

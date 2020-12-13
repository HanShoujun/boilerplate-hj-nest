/**
 * @description:
 * @author:Hsj
 * @Date:2020-09-08 14:50:28
 */

import bcrypt from 'bcrypt';

export class UtilsService {
  /**
   * convert entity to dto class instance
   * @param {{new(): T}} dtoType
   * @param {E[] | E} entity
   * @returns {T[] | T}
   */
  public static toDto<T extends E, E>(dtoType: new () => T, entity: E ): T {
    return Object.assign(new dtoType(), entity);
  }
  public static toDtos<T extends E, E>(dtoType: new () => T, entitys: E[]): T[] {
    return entitys.map(u => Object.assign(new dtoType(), u));
  }
  /**
   * convert dto to entity class instance
   * @param {{new(): E}} entityType
   * @param {T[] | T} dto
   * @returns {E[] | E}
   */
  public static toEntity<T extends E, E>(entityType: new () => E, dto: T): E {
    return Object.assign(new entityType(), dto);
  }
  public static toEntitys<T extends E, E>(entityType: new () => E, dtos: T[]): E[] {
    return dtos.map(u => Object.assign(new entityType(), u));
  }

  /**
     * validate text with hash
     * @param {string} password
     * @param {string} hash
     * @returns {Promise<boolean>}
     */
    static validateHash(password: string, hash: string): Promise<boolean> {
      return bcrypt.compare(password, hash || '');
  }
}

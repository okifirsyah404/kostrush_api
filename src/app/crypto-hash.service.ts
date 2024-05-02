import * as bcrypt from 'bcrypt';

export class CryptoHashService {
  /**
   *
   * This function is used to hash a password.
   *
   * @param password
   *
   * @returns { Promise<string> }
   *
   * @example
   * const hashedPassword = await this.cryptoHashService.hashPassword(password);
   */
  async hashPassword(password: string): Promise<string> {
    const saltRounds: number = parseInt(process.env.SALT_ROUNDS || '10');
    const salt = await bcrypt.genSalt(saltRounds);
    return await bcrypt.hash(password, salt);
  }

  /**
   *
   * This function is used to compare a password with a hash.
   *
   * @param password
   * @param hash
   *
   * @returns { Promise<boolean> }
   *
   * @example
   * const isPasswordMatched = await this.cryptoHashService.comparePassword(password, hash);
   */
  async comparePassword(password: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(password, hash);
  }
}

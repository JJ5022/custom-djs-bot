import fsPromises from 'fs/promises';
import logger from '../utils/logger';

export class GuildConfig {
  private static configs: GuildConfig[];
  private guildId: string;
  private prefix: string;
  private featureId: string[];

  public static async load() {
    if (!GuildConfig.configs) {
      try {
        const json = await fsPromises.readFile('./db/guildConfig.json', 'utf8');
        GuildConfig.configs = JSON.parse(json);
      } catch {
        logger.warn("Couldn't load db: guildConfig");
        GuildConfig.configs = [];
        this.save();
      }
    }
  }

  private static async save() {
    await fsPromises.writeFile(
      './db/guildConfig.json',
      JSON.stringify(GuildConfig.configs)
    );
  }

  private static async insertConfig(
    guildId: string,
    prefix: string
  ): Promise<GuildConfig> {
    if (!GuildConfig.configs) GuildConfig.load();
    const prevConfig = GuildConfig.configs.findIndex(
      config => config.getGuildId() === guildId
    );

    if (prevConfig !== -1) {
      return GuildConfig.configs[prevConfig];
    } else {
      const config = new GuildConfig(guildId, prefix);
      GuildConfig.configs.push(config);
      await GuildConfig.save();
      return config;
    }
  }

  private static async removeConfig(guildId: string) {
    if (!GuildConfig.configs) GuildConfig.load();
    const index = GuildConfig.configs.findIndex(
      config => config.getGuildId() === guildId
    );
    if (index !== -1) {
      GuildConfig.configs.splice(index, 1);
      await GuildConfig.save();
    }
  }

  private constructor(guildId: string, prefix: string) {
    this.guildId = guildId;
    this.prefix = prefix;
    this.featureId = [];
  }

  public getGuildId(): string {
    return this.guildId;
  }

  public getPrefix(): string {
    return this.prefix;
  }

  public getFeatureId(): string[] {
    return this.featureId;
  }

  public setPrefix(prefix: string): void {
    this.prefix = prefix;
  }

  public setFeatureId(featureId: string[]): void {
    this.featureId = featureId;
  }

  public isFeatureEnabled(featureId: string): boolean {
    return this.getFeatureId().some(id => id.startsWith(featureId));
  }
}

export default GuildConfig;

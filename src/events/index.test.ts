import path from 'path';
import getModules from '../utils/getModules';

//prettier-ignore
const allEventName = ["apiRequest","apiResponse","applicationCommandCreate","applicationCommandDelete","applicationCommandUpdate","channelCreate","channelDelete","channelPinsUpdate","channelUpdate","debug","emojiCreate","emojiDelete","emojiUpdate","error","guildBanAdd","guildBanRemove","guildCreate","guildDelete","guildIntegrationsUpdate","guildMemberAdd","guildMemberAvailable","guildMemberRemove","guildMembersChunk","guildMemberUpdate","guildScheduledEventCreate","guildScheduledEventDelete","guildScheduledEventUpdate","guildScheduledEventUserAdd","guildScheduledEventUserRemove","guildUnavailable","guildUpdate","interaction","interactionCreate","invalidated","invalidRequestWarning","inviteCreate","inviteDelete","message","messageCreate","messageDelete","messageDeleteBulk","messageReactionAdd","messageReactionRemove","messageReactionRemoveAll","messageReactionRemoveEmoji","messageUpdate","presenceUpdate","rateLimit","ready","roleCreate","roleDelete","roleUpdate","shardDisconnect","shardError","shardReady","shardReconnecting","shardResume","stageInstanceCreate","stageInstanceDelete","stageInstanceUpdate","stickerCreate","stickerDelete","stickerUpdate","threadCreate","threadDelete","threadListSync","threadMembersUpdate","threadMemberUpdate","threadUpdate","typingStart","userUpdate","voiceStateUpdate","warn","webhookUpdate"];

describe('Testing event', () => {
  it('should be able to import event', async () => {
    const modules = getModules(__dirname, path.join('.', 'build', 'events'));
    for await (const module of modules) {
      const event = await import(`${module}`);
      expect(event.name).toBeDefined();
      expect(event.default).toBeDefined();
      expect(allEventName.includes(event.name)).toBeTruthy();
    }
  });
});

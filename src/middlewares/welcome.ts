import { Client, GuildMember } from 'discord.js';

export async function guildMemberAdd(client: Client, member: GuildMember) {
  const guild = member.guild;
  const channel = guild.channels.cache.find(
    channel => channel.name === 'general'
  );
  if (!channel) {
    return;
  }
  if (channel.isText())
    await channel.send(`Welcome to ${guild.name}, ${member.user.username}!`);
}

import { Interaction } from 'discord.js';
import { Bot } from '../models/bot';
import { Event } from '../models/event';

export const event: Event = {
	async exec(client: Bot, interaction: Interaction) {
		if (interaction.isChatInputCommand()) {
			const commandName = interaction.commandName;
			const command = client
				.getSlashCommands()
				.find((cmd) => cmd.data.name == commandName);
			if (command) {
				command.exec(interaction);
			}
		} else if (interaction.isUserContextMenuCommand()) {
			const commandName = interaction.commandName;
			const command = client
				.getContextMenus()
				.find((cmd) => cmd.data.name == commandName);
			if (command) {
				command.exec(interaction);
			}
		} else if (interaction.isButton()) {
			const interactionData = interaction.customId.split('_');
			const commandName = interactionData[0];
			const buttonId = interactionData[1];

			const command = client
				.getSlashCommands()
				.find((cmd) => cmd.data.name == commandName);
			if (command && command.execButtons) {
				command.execButtons(interaction, buttonId, client);
			}
		} else if (interaction.isContextMenuCommand()) {
			const commandName = interaction.commandName;

			const command = client
				.getContextMenus()
				.find((cmd) => cmd.data.name == commandName);

			if (command) {
				command.exec(interaction);
			}
		}
	},

	settings: {
		enabled: true,
	},
};

export default event;

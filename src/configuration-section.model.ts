import { ConfigurationEntry } from "./configuration-entry.model";

export interface ConfigurationSection {
	key: string;
	entries: ConfigurationEntry[];
}
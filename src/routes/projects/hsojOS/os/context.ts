// src/routes/projects/hsojOS/os/context.ts
// Lets an app component talk to the window it is rendered in.
import { getContext, setContext } from 'svelte';

const KEY = Symbol('hsojos-window');

export type WindowContext = {
	readonly id: string;
	/** True when this is the focused window (use it to ignore keyboard input otherwise) */
	readonly active: boolean;
	readonly minimized: boolean;
	close: () => void;
	/** Restore if minimized and bring to the front */
	focus: () => void;
	/** Every app, for things like the terminal's open and close commands */
	readonly apps: { id: string; title: string }[];
	/** Close all windows of an app. Returns false if it wasn't open. */
	closeApp: (appId: string) => boolean;
	/** Open another app by its id (e.g. 'guestbook') */
	open: (appId: string) => void;
	/** Change the title shown in the title bar */
	setTitle: (title: string) => void;
};

export const setWindowContext = (ctx: WindowContext) => setContext(KEY, ctx);
export const getWindowContext = () => getContext<WindowContext>(KEY);
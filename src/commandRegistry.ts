type CommandHandler = () => void;

type HostCommandRegistry = {
  handlers: Map<string, CommandHandler>;
  registered: Set<string>;
};

type RegisterCommandPaletteOnceArgs = {
  host: object;
  pluginId: string;
  key: string;
  register: (action: CommandHandler) => void;
  handler: CommandHandler;
};

const hostRegistries = new WeakMap<object, HostCommandRegistry>();

function getNamespacedKey(pluginId: string, key: string): string {
  return `${pluginId}:${key}`;
}

function getRegistry(host: object): HostCommandRegistry {
  const existing = hostRegistries.get(host);
  if (existing) {
    return existing;
  }

  const created: HostCommandRegistry = {
    handlers: new Map<string, CommandHandler>(),
    registered: new Set<string>(),
  };
  hostRegistries.set(host, created);
  return created;
}

export function registerCommandPaletteOnce({
  host,
  pluginId,
  key,
  register,
  handler,
}: RegisterCommandPaletteOnceArgs): boolean {
  const registry = getRegistry(host);
  const namespacedKey = getNamespacedKey(pluginId, key);

  registry.handlers.set(namespacedKey, handler);

  if (registry.registered.has(namespacedKey)) {
    return false;
  }

  register(() => {
    registry.handlers.get(namespacedKey)?.();
  });
  registry.registered.add(namespacedKey);
  return true;
}

export function clearCommandHandlers(host: object, pluginId: string): void {
  const registry = hostRegistries.get(host);
  if (!registry) {
    return;
  }

  const prefix = `${pluginId}:`;

  for (const key of registry.handlers.keys()) {
    if (key.startsWith(prefix)) {
      registry.handlers.delete(key);
    }
  }

  for (const key of registry.registered.keys()) {
    if (key.startsWith(prefix)) {
      registry.registered.delete(key);
    }
  }
}

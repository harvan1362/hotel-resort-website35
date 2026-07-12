export function cn(...inputs: (string | undefined | null | boolean)[]) {
  return inputs.filter(Boolean).join(" ").replace(/\s+/g, " ").trim()
}

/**
 * Safely parse a JSON string, returning a fallback value when the input is
 * empty or malformed instead of throwing. Parsing failures are logged so the
 * error is surfaced rather than silently swallowed.
 */
export function safeJsonParse<T>(value: string | null | undefined, fallback: T, context?: string): T {
  if (value === null || value === undefined) {
    return fallback
  }

  try {
    return JSON.parse(value) as T
  } catch (error) {
    console.error(`Failed to parse JSON${context ? ` for "${context}"` : ""}:`, error)
    return fallback
  }
}

export function cva(
  base: string,
  config?: {
    variants?: Record<string, Record<string, string>>
    defaultVariants?: Record<string, string>
  },
) {
  return (props?: Record<string, any>) => {
    if (!config || !props) return base

    let classes = base

    if (config.variants) {
      Object.entries(config.variants).forEach(([key, variants]) => {
        const value = props[key] || config.defaultVariants?.[key]
        if (value && variants[value]) {
          classes += ` ${variants[value]}`
        }
      })
    }

    return classes
  }
}

export type VariantProps<T extends (...args: any) => any> = {
  [K in keyof Parameters<T>[0]]?: Parameters<T>[0][K]
}

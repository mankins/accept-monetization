/**
 * Parses fields like `Accept`, `Accept-Language`, etc. orders them by 
 * qualities high to low.
 */
export function parse(str: string): { item: string, quality: number };

/**
 * Parses fields like `Accept`, `Accept-Language`, etc. orders them by 
 * qualities high to low, and only return values.
 */
export function parseValue(str: string): string[];
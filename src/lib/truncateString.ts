const DEFAULT_STR_MAX_LENGTH = 10;

export const truncateString = (str: string, maxLength = DEFAULT_STR_MAX_LENGTH): string =>
    str.length > maxLength ? `${str.substring(0, maxLength)}...` : str;

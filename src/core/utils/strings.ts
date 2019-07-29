export function pluralize(str: string): string {
  return (
    [/([^aeiou])y$/, /()fe?$/, /([^aeiou]o|[sxz]|[cs]h)$/].map(
      (c, i) => (str = str.replace(c, `$1${'iv'[i] || ''}e`))
    ) && str + 's'
  );
}

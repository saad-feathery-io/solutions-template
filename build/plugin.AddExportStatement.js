// rollup-plugin-always-export.js
import { readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

function alwaysExport(options = {}) {
  const { include = ['*.ts'], exclude = [] } = options;

  return {
    name: 'always-export',
    order: "pre",

    async transform(code, id) {
      if (id.endsWith('.ts') && !exclude.some(pattern => id.includes(pattern))) {
        const shouldInclude = Array.isArray(include)
          ? include.some(pattern => id.endsWith(pattern))
          : id.endsWith(include);

        if (shouldInclude) {
          if (!code.includes('export {}')) {
            console.warn(`[${this.name}] Adding 'export {}' to: ${id}`);
            const newCode = code + '\nexport {};';
            writeFileSync(id, newCode, 'utf-8'); // Overwrite the file
            return { code: newCode, map: null };
          }
        }
      }
      return null;
    },
  };
}

export default alwaysExport;
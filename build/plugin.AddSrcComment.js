import path from 'path';

export default function addSourceComment() {
  return {
    name: 'add-source-comment',
    transform(code, id) {
      if (id.endsWith('.js') || id.endsWith('.ts')) {
        const rootDir = process.cwd();
        const relativePath = path.relative(rootDir, id).substring(4);;
        const comment = `// ${relativePath}\n`;
        return {
          code: comment + code,
          map: null,
        };
      }
      return null;
    },
  };
}
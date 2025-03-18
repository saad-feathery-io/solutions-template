
import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import addSourceComment from './build/plugin.AddSrcComment.js';
import path from "path"

const getFileList = () => {
    return [
        "src/example.ts"
    ]
}

const buildFileCfg = (file) => {
    const inFilePath = file.substring(4);
    const outFilePath = inFilePath.replace(".ts", ".js");

    return {
      input: inFilePath,
      output: {
        dir: "dist",
        format: 'esm',
        entryFileNames: outFilePath,
      },
      plugins: [
        addSourceComment(),
        resolve({
            extensions: ['.js', '.ts'],
            moduleDirectories: ["src"]
          }),
        typescript({
          tsconfig: './tsconfig.json',
        }),
      ],
      watch: {
        clearScreen: false,
      },
    }
}


export default getFileList().map(e => buildFileCfg(e));
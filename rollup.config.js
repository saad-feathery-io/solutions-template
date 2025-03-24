
import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import addSourceComment from './build/plugin.AddSrcComment.js';
import addExportStatement from './build/plugin.AddExportStatement.js';
import path from "path"
import fs from "fs";

const excludeDirs = [
    "_core",
    "_data",
    "types"
]

const getFileList = () => {
    const results = [];
  
    const recurseFiles = (currentDir) => {
      const files = fs.readdirSync(currentDir);
  
      files.forEach((file) => {
        const filePath = path.join(currentDir, file);
        const stat = fs.statSync(filePath);
        const isExclude = excludeDirs.reduce((acc, next) => {

            return acc || file.startsWith(next);
        }, false)

        if(isExclude || file.startsWith("_")) return;
  
        if (stat.isDirectory()) 
          recurseFiles(filePath);
        else if (file.endsWith(".ts") || file.endsWith(".js")) 
          results.push(filePath);
      });
    };
  
    recurseFiles("src");
    return results;
};

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
        addExportStatement(),
        resolve({
            extensions: ['.js', '.ts'],
            moduleDirectories: ["src"]
          }),
        typescript({
          tsconfig: './tsconfig.json',
        }),
      ],
      onwarn: (warning, warn) => {
        // You can also filter by message or other properties
        if (warning.message.includes('TS1375')) {
          return; // Suppress a specific error message
        }
    
        // For everything else, let Rollup handle the warning
        warn(warning);
      },
      watch: {
        clearScreen: false,
      },
    }
}

export default getFileList().map(e => buildFileCfg(e));
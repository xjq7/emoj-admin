/* eslint-disable no-unused-vars */
/// <reference types="vite/client" />

declare type AlignType = 'left' | 'center' | 'right';

interface ImportMetaEnv {
  readonly VITE_API: string;
  // 更多环境变量...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

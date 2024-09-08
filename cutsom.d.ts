declare module "*.png" {
  const value: string;
  export default value;
}
declare interface NodeRequire {
  context: (
    directory: string,
    useSubdirectories: boolean,
    regExp: RegExp
  ) => {
    keys: () => string[];
    <T>(id: string): T;
  };
}
declare module "*.jpg" {
  const value: string;
  export default value;
}

declare module "*.jpeg" {
  const value: string;
  export default value;
}

declare module "*.gif" {
  const value: string;
  export default value;
}
declare module "*.pdf" {
  const value: string;
  export default value;
}

declare module "*.svg" {
  const value: string;
  export default value;
}
declare module "*.ttf" {
  const value: string;
  export default value;
}

/**
 * @interface
 * morgan options
 */

export default interface IMorganOptions {
  developmentMode?: boolean;
  format?: 'string';
  files?: { all: string; error: string };
}

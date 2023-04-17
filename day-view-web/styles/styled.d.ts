import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    color: {
      bgColor: string;
      textColor: string;
      shadowColor: string;
      borderColor: string;
      redColor: string;
    };
    name: "light" | "dark";
  }
}

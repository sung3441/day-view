import 'styled-components';
import { common } from '@/shared/styles/theme';

type StyledType = typeof common;

declare module 'styled-components' {
  export interface DefaultTheme extends StyledType {}
}

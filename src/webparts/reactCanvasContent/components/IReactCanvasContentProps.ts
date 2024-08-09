import {SPHttpClient} from '@microsoft/sp-http';

export interface IReactCanvasContentProps {
  description: string;
  isDarkTheme: boolean;
  environmentMessage: string;
  hasTeamsContext: boolean;
  userDisplayName: string;
  siteUrl: string;
  context: any;
  spHttpClient: SPHttpClient;
}

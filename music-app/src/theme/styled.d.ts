import 'styled-components';

declare module 'styled-components' {
    export interface DefaultTheme {
        header: {
            bgColor: string;
            navigation: {
                linkColor: string;
            }
        }
    }
}

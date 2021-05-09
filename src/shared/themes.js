import { createGlobalStyle } from 'styled-components';

export const LIGHT_THEME = "light";

export const DARK_THEME = "dark";

export const DARK_STYLE = {
    body: "#1B1B1B",
    fontColor: "#FFFFFF",
    cardBackground: "#7A7A7A",
    cardFontColor: "#FFFFFF",
    headerBackground: "#A9A9A9",
    containerBackground: "#7A7A7A",
    buttonColor: "#272727"
}

export const LIGHT_STYLE = {
    body: "#FFFFFF",
    fontColor: "#000000",
}

export const GlobalStyles = createGlobalStyle`
	body {
		background-color: ${(props) => props.theme.body};
        color: ${(props) => props.theme.fontColor};
	}

    .primarybtn {
        background-color: ${(props) => props.theme.buttonColor}
    }

    .container {
        background-color: ${(props) => props.theme.containerBackground};
    }
    
    .card {
        background-color: ${(props) => props.theme.cardBackground};
    }

    .card__title {
        color: ${(props) => props.theme.cardFontColor};
    }

    .card__icons a {
        color: ${(props) => props.theme.cardFontColor};
    }

    .content__container {
        background-color: ${(props) => props.theme.cardBackground};
    }

    .cancelBtn {
        background-color: ${(props) => props.theme.buttonColor}
    }
`;
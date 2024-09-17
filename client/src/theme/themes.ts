import { createTheme, Theme } from '@mui/material'

export const globalTheme: Theme = createTheme({
    typography: {
        fontFamily: '"Bebas Neue Pro Regular", sans-serif',
        fontWeightRegular: '300',
    },
    breakpoints: {
        values: {
            xs: 0,
            sm: 480,
            md: 768,
            lg: 1025,
            xl: 1200,
        },
    },
})

export const lightTheme: Theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2', // Royal Blue
      light: '#63a4ff',
      dark: '#004ba0',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#ff6f00', // Amber
      light: '#ffa040',
      dark: '#c43e00',
      contrastText: '#ffffff',
    },
    error: {
      main: '#ff1744', // Red
      light: '#ff616f',
      dark: '#c4001d',
      contrastText: '#ffffff',
    },
    warning: {
      main: '#ffea00', // Yellow
      light: '#ffff56',
      dark: '#c7b800',
      contrastText: '#ffffff',
    },
    info: {
      main: '#00bcd4', // Cyan
      light: '#62efff',
      dark: '#008ba3',
      contrastText: '#ffffff',
    },
    success: {
      main: '#4caf50', // Green
      light: '#80e27e',
      dark: '#087f23',
      contrastText: '#ffffff',
    },
    text: {
      primary: '#333333', // Dark gray
      secondary: '#666666', // Gray
      disabled: '#999999', // Light gray
      // hint: '#999999', // Light gray
    },
    divider: '#cccccc', // Light gray
    background: {
      paper: '#ffffff', // White
      default: '#f0f0f0', // Light gray
      // level2: '#f2f2f2', // Lighter gray
      // level1: '#ffffff', // White
    },
    action: {
      active: '#1976d2', // Royal Blue
      hover: 'rgba(0, 0, 0, 0.04)',
      hoverOpacity: 0.04,
      selected: 'rgba(0, 0, 0, 0.08)',
      selectedOpacity: 0.08,
      disabled: 'rgba(0, 0, 0, 0.26)',
      disabledBackground: 'rgba(0, 0, 0, 0.12)',
      disabledOpacity: 0.38,
      focus: 'rgba(0, 0, 0, 0.12)',
      focusOpacity: 0.12,
      activatedOpacity: 0.12,
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
    fontSize: 14,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,
    htmlFontSize: 16,
    // Add your typography styles here...
  },
  // Add additional theme properties here...
});

export const darkTheme: Theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#512da8', // Deep Purple
      light: '#8559da',
      dark: '#140078',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#ff9100', // Deep Orange
      light: '#ffa733',
      dark: '#c56200',
      contrastText: '#ffffff',
    },
    error: {
      main: '#e53935', // Red
      light: '#e57373',
      dark: '#ab000d',
      contrastText: '#ffffff',
    },
    warning: {
      main: '#ffd600', // Yellow
      light: '#ffff52',
      dark: '#c7a500',
      contrastText: '#ffffff',
    },
    info: {
      main: '#00bcd4', // Cyan
      light: '#62efff',
      dark: '#008ba3',
      contrastText: '#ffffff',
    },
    success: {
      main: '#4caf50', // Green
      light: '#81c784',
      dark: '#388e3c',
      contrastText: '#ffffff',
    },
    text: {
      primary: '#ffffff', // White
      secondary: '#cccccc', // Light gray
      disabled: '#999999', // Gray
      // hint: '#999999', // Gray
    },
    divider: '#666666', // Gray
    background: {
      paper: '#121212', // Dark gray
      default: '#1e1e1e', // Darker gray
      // level2: '#333333', // Gray
      // level1: '#212121', // Dark gray
    },
    action: {
      active: '#512da8', // Deep Purple
      hover: 'rgba(255, 255, 255, 0.08)',
      hoverOpacity: 0.08,
      selected: 'rgba(255, 255, 255, 0.16)',
      selectedOpacity: 0.16,
      disabled: 'rgba(255, 255, 255, 0.3)',
      disabledBackground: 'rgba(255, 255, 255, 0.12)',
      disabledOpacity: 0.38,
      focus: 'rgba(255, 255, 255, 0.12)',
      focusOpacity: 0.12,
      activatedOpacity: 0.24,
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
    fontSize: 14,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,
    htmlFontSize: 16,
    // Add your typography styles here...
  },
  // Add additional theme properties here...
});
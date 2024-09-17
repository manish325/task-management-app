import { FC, PropsWithChildren } from 'react'
import { GlobalProvider } from './contexts/Global'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { LocalThemeProvider } from './theme/theme.provider'

export const Providers: FC<PropsWithChildren> = ({ children }) => {
    return (
        <GlobalProvider>
            <LocalThemeProvider>
                <LocalizationProvider dateAdapter={AdapterMoment}>
                    {children}
                </LocalizationProvider>
            </LocalThemeProvider>
        </GlobalProvider>
    )
}

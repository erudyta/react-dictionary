import { Box, createTheme, ThemeProvider, Container, Typography } from '@mui/material'
import Nav from './Components/Nav'
import { useEffect, useState } from 'react'
import CustomInput from './Components/CustomInput'
import { WordData } from './types/dictionaryTypes'
import DictionaryViewer from './Components/DictionaryViewer'

const App = () => {
	const [font, setFont] = useState<string>('')
	const [apiResult, setApiResult] = useState<WordData | null>(null)
	const [error, setError] = useState<null | string | undefined>(undefined)
	const [isDarkMode, setIsDarMode] = useState(false)

	const handleSwitch = (e: React.ChangeEvent<HTMLInputElement>) => {
		setIsDarMode(e.target.checked)
	}

	useEffect(() => {
		if (isDarkMode) {
			document.body.setAttribute('data-theme', 'dark')
		} else {
			document.body.setAttribute('data-theme', '')
		}
	}, [isDarkMode])

	const searchForText = async (text: string) => {
		setApiResult(null)
		setError(undefined)
		try {
			const res: Response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${text}`)

			if (!res.ok) {
				if (res.status === 404) {
					setError('Word not found')
					throw new Error('Word not found')
				}
			}

			const data = await res.json()
			setApiResult(data[0])
			setError(null)
		} catch {
			console.log('ERROR')
		}
	}

	const handleFontChange = (arg: string) => {
		setFont(arg)
	}
	const theme = createTheme({
		typography: {
			fontFamily: font,
		},
		breakpoints: {
			values: {
				xs: 480,
				sm: 768,
				md: 1024,
				lg: 1200,
				xl: 1284,
			},
		},
	})
	//display: 'flex', gap: '3rem', flexDirection: 'column', marginTop: '3rem', marginBottom: '2rem'
	return (
		<ThemeProvider theme={theme}>
			<Container
				maxWidth='lg'
				sx={theme => ({
					display: 'flex',
					gap: '2rem',
					flexDirection: 'column',
					marginTop: '1.5rem',
					marginBottom: '1rem',
					[theme.breakpoints.up('xs')]: {
						marginTop: '3rem',
						marginBottom: '2rem',
						gap: '3rem',
					}
				})}>
				<Box
					component='header'
					sx={theme => ({
						display: 'flex',
						gap: '10px',
						alignItems: 'center',
						justifyContent: 'space-between',
						flexDirection: 'column',
						[theme.breakpoints.up('xs')]: {
							flexDirection: 'row',
							alignItems: 'center',
						},
					})}>
					<Box
						component='i'
						sx={{
							display: 'flex',
							fontSize: '50px',
							color: isDarkMode ? '#ff6040' : 'black',
						}}
						className='bx bxs-book'></Box>
					<Nav darkMode={isDarkMode} handleSwitch={handleSwitch} font={font} setFont={handleFontChange}></Nav>
				</Box>
				<CustomInput darkMode={isDarkMode} searchForText={searchForText} />
				{error === null ? (
					<DictionaryViewer word={apiResult}></DictionaryViewer>
				) : (
					<Typography variant='h1'>{error}</Typography>
				)}
			</Container>
		</ThemeProvider>
	)
}

export default App

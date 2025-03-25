import { Box, createTheme, ThemeProvider, Container, Typography } from '@mui/material'
import Nav from './Components/Nav'
import { useState } from 'react'
import bookIcon from './assets/bookIcon.svg'
import CustomInput from './Components/CustomInput'
import { WordData } from './types/dictionaryTypes'
import DictionaryViewer from './Components/DictionaryViewer'

const App = () => {
	const [font, setFont] = useState<string>('')
	const [apiResult, setApiResult] = useState<WordData | null>(null)
	const [error, setError] = useState<null | string | undefined>(undefined)

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
	})

	return (
		<ThemeProvider theme={theme}>
			<Container maxWidth='lg' sx={{ display: 'flex', gap: '3rem', flexDirection: 'column', marginTop: '3rem', marginBottom: '2rem' }}>
				<header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
					<Box component='img' src={bookIcon} alt='Book Icon' sx={{ height: '50px', width: '50px' }}></Box>
					<Box>
						<Nav font={font} setFont={handleFontChange}></Nav>
					</Box>
				</header>
				<CustomInput searchForText={searchForText} />
				{error === null ? <DictionaryViewer word={apiResult}></DictionaryViewer> : <Typography variant='h1'>{error}</Typography>}
				
			</Container>
		</ThemeProvider>
	)
}

export default App

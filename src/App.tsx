import { Box, createTheme, ThemeProvider, Container } from '@mui/material'
import Nav from './Components/Nav'
import { useState } from 'react'
import bookIcon from './assets/bookIcon.svg'
import CustomInput from './Components/CustomInput'
import { WordData } from './types/dictionaryTypes'
import DictionaryViewer from './Components/DictionaryViewer'

const App = () => {
	const [font, setFont] = useState<string>('')
	const [apiResult, setApiResult] =  useState<WordData | null>(null)

	const searchForText = async (text: string) => {
		try {
			const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${text}`)
			const data = await res.json()
			setApiResult(data[0])
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
			<Container maxWidth='lg' sx={{ display: 'flex', gap: '3rem', flexDirection: 'column', marginTop: '3rem' }}>
				<Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
					<Box component='img' src={bookIcon} alt='Book Icon' sx={{ height: '50px', width: '50px' }}></Box>
					<Box>
						<Nav font={font} setFont={handleFontChange}></Nav>
					</Box>
				</Box>
				<CustomInput searchForText={searchForText}/>
				<DictionaryViewer word = {apiResult}></DictionaryViewer>
			</Container>
		</ThemeProvider>
	)
}

export default App

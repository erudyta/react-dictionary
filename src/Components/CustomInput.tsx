import { Input, Box } from '@mui/material'
import searchIcon from '../assets/searchIcon.svg'
import { useState } from 'react'

interface Props{
	searchForText: (arg:string) => void
}

const CustomInput = ({searchForText}: Props) => {
	const [text, setText] = useState('')

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if(e.key === 'Enter'){
			searchForText(text)
		}
	}

	return (
		<Box sx={{ display: 'flex', flexDirection: 'row', backgroundColor: '#ebebeb', borderRadius: '10px' }}>
			<Box component='img' src={searchIcon} alt='Search Icon' sx={{ padding: '0 1rem' }}></Box>
			<Input
				onChange={(e) => setText(e.target.value)}
				onKeyDown={handleKeyDown}
				disableUnderline
				sx={{ width: '100%', padding: '.7rem .7rem .7rem 0', fontSize: '1.3rem', fontWeight: '600' }}></Input>
		</Box>
	)
}

export default CustomInput

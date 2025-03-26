import { Input, Box } from '@mui/material'
import { useState } from 'react'

interface Props {
	darkMode: boolean
	searchForText: (arg: string) => void
}

const CustomInput = ({ darkMode ,searchForText }: Props) => {
	const [text, setText] = useState('')

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			searchForText(text)
		}
	}

	return (
		<Box sx={{ display: 'flex', flexDirection: 'row', backgroundColor: darkMode ? '#474747' : '#ebebeb', borderRadius: '10px' }}>
			<Box sx={{ display: 'flex', alignItems:'center', justifyContent:'center', padding:'1rem'}}>
				<i style={{fontSize: '30px', color: '#ff6040'}} className='bx bx-search-alt-2'></i>
			</Box>
			<Input
				onChange={e => setText(e.target.value)}
				onKeyDown={handleKeyDown}
				disableUnderline
				placeholder='Search'
				sx={{ width: '100%', padding: '.7rem .7rem .7rem 0', fontSize: '1.3rem', fontWeight: '600', color: darkMode ? '#d4d4d4' : 'black' }}></Input>
		</Box>
	)
}

export default CustomInput

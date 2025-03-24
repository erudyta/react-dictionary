import { Input, Box } from '@mui/material'
import { useState } from 'react'

interface Props {
	searchForText: (arg: string) => void
}

const CustomInput = ({ searchForText }: Props) => {
	const [text, setText] = useState('')

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			searchForText(text)
		}
	}

	return (
		<Box sx={{ display: 'flex', flexDirection: 'row', backgroundColor: '#ebebeb', borderRadius: '10px' }}>
			<Box sx={{ display: 'flex', alignItems:'center', justifyContent:'center', padding:'1rem'}}>
				<i style={{fontSize: '30px', color: '#ff6040'}} className='bx bx-search-alt-2'></i>
			</Box>
			<Input
				onChange={e => setText(e.target.value)}
				onKeyDown={handleKeyDown}
				disableUnderline
				sx={{ width: '100%', padding: '.7rem .7rem .7rem 0', fontSize: '1.3rem', fontWeight: '600' }}></Input>
		</Box>
	)
}

export default CustomInput

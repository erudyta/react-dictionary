import { Box } from '@mui/material/'
import FontPicker from './FontPicker'
import { useEffect, useState } from 'react'
import { MaterialUISwitch } from './Switch'

interface Props {
	font: string
	setFont: (arg: string) => void
}

const Nav = ({ font, setFont }: Props) => {
	const [darkMode, setDarMode] = useState(false)

	const handleSwitch = (e: React.ChangeEvent<HTMLInputElement>) => {
		setDarMode(e.target.checked)
	}

	useEffect(() => {
		if (darkMode) {
			document.body.setAttribute('data-theme', 'dark')
		} else {
			document.body.setAttribute('data-theme', '')
		}
	}, [darkMode])

	return (
		<Box sx={{ display: 'flex', alignItems: 'center', gap: '2rem', flexDirection:'row', height:'50px'}}>
			<FontPicker darkMode={darkMode} font={font} setFont={setFont} ></FontPicker>
			<Box sx={{ backgroundColor: '#aaaaaa', height:'50%', width:'1px'}}></Box>
			<MaterialUISwitch onChange={handleSwitch} />
		</Box>
	)
}

export default Nav

import { Box } from '@mui/material/'
import FontPicker from './FontPicker'
import { MaterialUISwitch } from './Switch'

interface Props {
	darkMode: boolean
	handleSwitch: (e: React.ChangeEvent<HTMLInputElement>) => void
	font: string
	setFont: (arg: string) => void
}

//

const Nav = ({ darkMode, handleSwitch, font, setFont }: Props) => {
	return (
		<Box
			sx={{
				display: 'flex',
				alignItems: 'center',
				gap: '2rem',
				flexDirection: 'row',
				height: '50px',
			}}>
			<FontPicker darkMode={darkMode} font={font} setFont={setFont}></FontPicker>
			<Box sx={{ backgroundColor: '#aaaaaa', height: '50%', width: '1px' }}></Box>
			<MaterialUISwitch onChange={handleSwitch} />
		</Box>
	)
}

export default Nav

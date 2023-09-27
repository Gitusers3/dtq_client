import useSettings from 'app/hooks/useSettings';
import dtq from '../../images/dtqu.png';
const MatxLogo = ({ className }) => {
  const { settings } = useSettings();
  const theme = settings.themes[settings.activeTheme];

  return <img src={dtq} style={{ width: '300px', margin: '-40px' }} />;
};

export default MatxLogo;

import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import ChristmasEffects from './ChristmasEffects';
import HalloweenEffects from './HalloweenEffects';
import ThanksgivingEffects from './ThanksgivingEffects';

export default function ThemeEffectsManager() {
  const { theme } = useTheme();

  // Render the theme effects based on the current theme
  return (
    <>
      {theme === 'christmas' && <ChristmasEffects />}
      {theme === 'halloween' && <HalloweenEffects />}
      {theme === 'thanksgiving' && <ThanksgivingEffects />}
    </>
  );
}
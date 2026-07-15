export * from './LogoGuitar';

export * from './Auth/AuthTitle';
export * from './Auth/DigitsGroupField';
export * from './Auth/FormButton';
export * from './Auth/PasswordField';
export * from './Auth/SecondaryText';
export * from './Auth/TextField';

export * from './Studio/BottomBar/AssistantDesktopButton';
export * from './Studio/BottomBar/AssistantMobileButton';
export * from './Studio/BottomBar/EffectsButton';
export * from './Studio/BottomBar/PreferencesButton';
export * from './Studio/BottomBar/RigsButton';

export * from './Studio/ControlBar/LockOpenStringButton';
export * from './Studio/ControlBar/RootChordSlider';
export * from './Studio/ControlBar/PauseButton';

export * from './Studio/Fretboard/FretCell';
export * from './Studio/Fretboard/FretMarkers';
export * from './Studio/Fretboard/FretNumbers';
export * from './Studio/Fretboard/GuitarNeck';
export * from './Studio/Fretboard/GuitarString';
export * from './Studio/Fretboard/OpenStringLabel';

export * from './Studio/Header/BurgerMenuButton';

export * from './Studio/Settings/TextContainer';
export * from './Studio/Settings/Preferences/AllowDifferentStringOverlapButton';
export * from './Studio/Settings/Preferences/AllowSameStringOverlapButton';
export * from './Studio/Settings/Preferences/AutoMuteButton';
export * from './Studio/Settings/Preferences/AutoMuteSlider';
export * from './Studio/Settings/Preferences/GuitarButton';
export * from './Studio/Settings/Preferences/GuitarImage';
export * from './Studio/Settings/Preferences/HoldToPlayButton';
export * from './Studio/Settings/Preferences/LoopModeButton';
export * from './Studio/Settings/Preferences/LoopModeSlider';
export * from './Studio/Settings/Preferences/ShowKeyboardButton';
export * from './Studio/Settings/Preferences/VolumeSlider';

export * from './Studio/Settings/Preferences/StringOrder/SortableStringItem';
export * from './Studio/Settings/Preferences/StringOrder/SortableStringsList';

export * from './Studio/Settings/Effects/EffectControlsContainer';

export * from './Studio/Settings/Effects/Fields/ChorusControls';
export * from './Studio/Settings/Effects/Fields/DistortionControls';
export * from './Studio/Settings/Effects/Fields/ReverbControls';
export * from './Studio/Settings/Effects/Fields/TremoloControls';
export * from './Studio/Settings/Effects/Fields/VibratoControls';
export * from './Studio/Settings/Effects/Fields/AutoFilterControls';
export * from './Studio/Settings/Effects/Fields/FreeverbControls';
export * from './Studio/Settings/Effects/Fields/FeedbackDelayControls';

export * from './Studio/Settings/Effects/EffectsOrder/EffectAddSelector';
export * from './Studio/Settings/Effects/EffectsOrder/SortableEffectsList';
export * from './Studio/Settings/Effects/EffectsOrder/SortableEffectItem';

// Esto trae redundancia
// export * from './Studio/Settings/Effects/Fields/Distortion/DistortionSlider';
// export * from './Studio/Settings/Effects/Fields/Distortion/OversampleSelectButtons';
// export * from './Studio/Settings/Effects/Fields/Distortion/WetSlider';

// En su lugar se importa el namespace completo
// Cada efecto de sonido tiene una propiedad 'Wet' que significa el porcentaje de efecto aplicado
export * as Distortion from './Studio/Settings/Effects/Fields/Distortion';
export * as Chorus from './Studio/Settings/Effects/Fields/Chorus';
export * as Reverb from './Studio/Settings/Effects/Fields/Reverb';
export * as Tremolo from './Studio/Settings/Effects/Fields/Tremolo';
export * as Vibrato from './Studio/Settings/Effects/Fields/Vibrato';
export * as Freeverb from './Studio/Settings/Effects/Fields/Freeverb';
export * as AutoFilter from './Studio/Settings/Effects/Fields/AutoFilter';
export * as FeedbackDelay from './Studio/Settings/Effects/Fields/FeedbackDelay';

export * from './Studio/Settings/Workspace/WorkspaceModal';
export * from './Studio/Settings/Workspace/WorkspaceEditModal';

export * from './Modal';
export * from './Studio/Settings/Workspace/WorkspaceBurgerMenuButton';
export * from './Studio/Settings/Workspace/PresetsCounterText';
export * from './Studio/Settings/Workspace/PresetModal';
export * from './Studio/Settings/Workspace/PresetBurgerMenuButton';
export * from './Studio/Settings/Workspace/PresetEditModal';
export * from './Studio/ActionMenu';

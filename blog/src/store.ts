import { atom } from 'nanostores';
import { persistentAtom, persistentMap } from '@nanostores/persistent'

export const zIndex = atom(1);

export const showPrivacyPolicy = atom(false);
export const showCookiePolicy = atom(false);

// export const blogHeight = persistentAtom(0);
export const blogHeight = persistentAtom<string>('blogHeight', '0');

export const blogWidth = persistentAtom<string>('blogWidth', '0');
export const blogExpanded = persistentAtom<string>('blogExpanded', 'false');
export const blogPositionDefault = persistentAtom<string>('blogPositionDefault', 'true');
export const blogPositionLeft = persistentAtom<string>('blogPositionLeft', '0');
export const blogPositionTop = persistentAtom<string>('blogPositionTop', '0');

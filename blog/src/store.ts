import { atom } from 'nanostores';
import { persistentAtom } from '@nanostores/persistent'

export const zIndex = atom(1);
export const hasSeenHello = persistentAtom<string>('seenHello', 'false');
export const useFunMode = persistentAtom<string>('useFunMode', 'true');

// TODO: switch to persistentMap someDay
export const blogHeight = persistentAtom<string>('blogHeight', '0');
export const blogWidth = persistentAtom<string>('blogWidth', '0');
export const blogExpanded = persistentAtom<string>('blogExpanded', 'false');
export const blogPositionDefault = persistentAtom<string>('blogPositionDefault', 'true');
export const blogPositionLeft = persistentAtom<string>('blogPositionLeft', '0');
export const blogPositionTop = persistentAtom<string>('blogPositionTop', '0');

export function resetStore() {
    blogHeight.set('0');
    blogWidth.set('0');
    blogExpanded.set('false')
    blogPositionDefault.set('true');
    blogPositionLeft.set('0');
    blogPositionTop.set('0');
}

import { MutableRefObject, useEffect, SetStateAction, Dispatch } from 'react';

const listenForOutsideClicks = (
  outsideClickActive: boolean,
  setOutsideClickActive: Dispatch<SetStateAction<boolean>>,
  menuRef: MutableRefObject<HTMLDivElement | null>,
  setIsOpen: Dispatch<SetStateAction<boolean>>
) => {
  useEffect(() => {
    if (outsideClickActive) return;
    if (!menuRef.current) return;
    setOutsideClickActive(true);

    const handleClickOutside = (evt: Event) => {
      if (menuRef.current?.contains(evt.target as Node)) {
        return;
      }
      setIsOpen(false);
      setOutsideClickActive(false);
    };

    ['click', 'touchstart'].forEach((eventType) => {
      document.addEventListener(eventType, handleClickOutside);
    });

    return () => {
      ['click', 'touchstart'].forEach((eventType) => {
        document.removeEventListener(eventType, handleClickOutside);
      });
    };
  }, [menuRef, setIsOpen, setOutsideClickActive]);
};

export default listenForOutsideClicks;

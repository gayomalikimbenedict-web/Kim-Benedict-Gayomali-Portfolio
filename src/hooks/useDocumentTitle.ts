import { useEffect } from 'react';

const SITE_NAME = 'Kim Benedict Gayomali';
const HOME_TITLE = `${SITE_NAME} | AI-Assisted Full-Stack Developer`;

/** Sets the browser tab title to the section being viewed, for example "Projects | Kim Benedict Gayomali". */
export const useDocumentTitle = (section: string) => {
  useEffect(() => {
    document.title = section === 'Home' ? HOME_TITLE : `${section} | ${SITE_NAME}`;
  }, [section]);
};

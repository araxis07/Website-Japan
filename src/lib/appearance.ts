export const appearanceKey = 'japan-travel-appearance'
export const themeInit = `try{var v=localStorage.getItem('${appearanceKey}');document.documentElement.dataset.theme=v==='dark'||v!=='light'&&matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'}catch{document.documentElement.dataset.theme=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'}`

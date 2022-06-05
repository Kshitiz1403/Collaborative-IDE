import React from 'react'
import LanguageBox from './LanguageBox'

const CreateLanguageBox = ({ languages }) =>
    <div style={{ display: 'flex', alignItems: 'normal', backgroundColor: '#fcfcfc', borderRadius: 4 }}>
        {languages.map(lang => <LanguageBox language={lang.language} onClick={lang.onClick} key={lang.language} />)}

    </div>

export default CreateLanguageBox
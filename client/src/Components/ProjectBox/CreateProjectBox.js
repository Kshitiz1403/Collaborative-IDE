import React from 'react'
import LanguageBox from './LanguageBox'

const CreateLanguageBox = ({ languages }) =>
    <div style={{ display: 'flex', alignItems: 'normal', borderRadius: 4, marginTop: 10, marginBottom: 10 }}>
        {languages.map(lang => <LanguageBox language={lang.language} onClick={lang.onClick} key={lang.language} />)}

    </div>

export default CreateLanguageBox
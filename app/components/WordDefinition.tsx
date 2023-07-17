import React from 'react'

interface WordDefinitionProps {
  word: string,
  defs: any,
}

const WordDefinition: React.FC<WordDefinitionProps> = ({ word, defs }) => {
  return (<>
    {
      defs[word] && defs[word].length > 0 && defs[word].map((def: any, index: number) => (
        <div key={index}>
          as a <strong>{def.partOfSpeech}</strong>
          {def.definitions.map((d: { definition: string }) => (
            <p key={d.definition}>
              {d.definition}
            </p>
          ))}
        </div>
      ))
    }
  </>)
}

export default WordDefinition
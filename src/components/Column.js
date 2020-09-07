import React, { useState, useEffect } from 'react'
import useKeyPress from './useKeyPress';


export default function Column({ columns, columnIndex, setColumns}) {
    const [name, setName] = useState(columns[columnIndex].name);
    const [isEditing, setEditing] = useState(false)

    const enter = useKeyPress('Enter');
    const esc = useKeyPress('Escape');
    
    useEffect(() => {
        if (isEditing) {
            if (enter) {
                // update column name
                const updatedColumns = [...columns];
                updatedColumns[columnIndex].name = name;
                setColumns(updatedColumns);
                setEditing(false);
            }
            if (esc) {
                // revert change
                const oldName = columns[columnIndex].name;
                setName(oldName);
                setEditing(false);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [enter, esc])

    function deleteColumn() {
        const updatedColumns = [...columns];
        updatedColumns.splice(columnIndex, 1);
        setColumns(updatedColumns);
    }

    return (
        <span>
            <span 
                className={`inline-text inline-text--${isEditing ? 'hidden' : 'active'}`}
                onClick={() => setEditing(true)}
            >{name}
            </span>
            <button 
                className={`inline-btn inline-btn==${isEditing ? 'hidden' : 'active'}`}
                onClick={() => deleteColumn()}>
                🗑
            </button>
            <input 
                autoFocus
                value={name}
                className={`inline-input inline-input--${isEditing ? 'active' : 'hidden'}`}
                onChange={e => setName(e.target.value)}
            />
        </span>
    )
}

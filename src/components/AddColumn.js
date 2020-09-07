import React, { useState, useEffect } from 'react'
import useKeyPress from './useKeyPress';

export default function AddColumn({ columns, setColumns }) {
    const [name, setName] = useState("");
    const [isEditing, setEditing] = useState(false);

    const enter = useKeyPress('Enter');
    const esc = useKeyPress('Escape');

    useEffect(() => {
        // effect
        if (isEditing) {
            if (enter) {
                const newColumn = { name: name, tasks: [] };
                const updatedColumns = [...columns, newColumn];
                setColumns(updatedColumns);
                setEditing(false);
            }
            if (esc) {
                setName("omg");
                setEditing(false);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [enter, esc])

    return (
        <span>
            <span className={`inline-text inline-text--${isEditing ? 'hidden' : 'active'}`}
                onClick={() => setEditing(true)}
            >+ Another Column
            </span>

            <input 
                className={`inline-input inline-input--${isEditing ? 'active' : 'hidden'}`}
                onChange={e => setName(e.target.value)} 
            />
        </span>
    )
}

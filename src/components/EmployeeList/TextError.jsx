import React from 'react';

export default function TextError(props) {
    return (
        <>
            <div>
                <span className="text-danger">{props.children}</span>
            </div>
        </>
    );
}

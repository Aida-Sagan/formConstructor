import React from 'react';

const Checkbox = ({ label }) => {
    return (
        <div>
            <input type="checkbox" />
            <label>{label}</label>
        </div>
    );
};

export default Checkbox;

import React from 'react';

const Select = ({ options }) => {
    return (
        <div>
            <select>
                {options.map((option, index) => (
                    <option key={index}>{option}</option>
                ))}
            </select>
        </div>
    );
};

export default Select;

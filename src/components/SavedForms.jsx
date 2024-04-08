import React, { useState, useEffect } from 'react';
import FormConstructor from './FormConstructor';

const SavedForms = () => {
    const [savedForms, setSavedForms] = useState([]);
    const [selectedForm, setSelectedForm] = useState(null);

    useEffect(() => {
        const savedFormsData = localStorage.getItem('savedForms');
        if (savedFormsData) {
            setSavedForms(JSON.parse(savedFormsData));
        }
    }, []);

    const handleLoadForm = (form) => {
        setSelectedForm(form);
    };

    if (savedForms.length === 0) {
        return <div className="saved-forms">Нет сохраненных форм</div>;
    }

    return (
        <div className="saved-forms">
            <h2>Saved Forms</h2>
            <ul>
                {savedForms.map((form, index) => (
                    <li key={index} onClick={() => handleLoadForm(form)}>
                        {form.formName}
                    </li>
                ))}
            </ul>
            {selectedForm && (
                <div>
                    <h2>{selectedForm.formName}</h2>
                    <FormConstructor formComponents={selectedForm.formComponents} />
                </div>
            )}
        </div>
    );
};

export default SavedForms;

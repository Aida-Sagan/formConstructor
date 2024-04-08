import React from 'react';
import SavedForms from '../components/SavedForms';

const SavedFormsPage = () => {
    return (
        <div className="page">
            <h1>Список сохраненных форм</h1>
            <SavedForms />
        </div>
    );
};

export default SavedFormsPage;

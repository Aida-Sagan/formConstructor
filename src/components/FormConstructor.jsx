import React, { useState, useEffect } from 'react';
import Radio from './Radio';
import Checkbox from './Checkbox';
import Select from './Select';
import TextInput from './TextInput';
import TextArea from './TextArea';
import styles from './FormConstructor.module.css';

const FormConstructor = () => {
    const [formComponentTypes, setFormComponentTypes] = useState([]);
    const [formName, setFormName] = useState('');
    const [formComponents, setFormComponents] = useState([]);

    useEffect(() => {
        // Load form data from localStorage if available
        const savedForm = localStorage.getItem('savedForm');
        if (savedForm) {
            const { formName, formComponents } = JSON.parse(savedForm);
            setFormName(formName);
            setFormComponents(formComponents);
        }
    }, []);

    const handleDragStart = (e, componentType, index) => {
        e.dataTransfer.setData('componentType', componentType);
        e.dataTransfer.setData('index', index);
    };

    const handleDragOver = (e, index) => {
        e.preventDefault();
        const draggedIndex = parseInt(e.dataTransfer.getData('index'));
        if (draggedIndex !== index) {
            const updatedComponents = [...formComponents];
            const draggedComponent = updatedComponents[draggedIndex];
            updatedComponents.splice(draggedIndex, 1);
            updatedComponents.splice(index, 0, draggedComponent);
            setFormComponents(updatedComponents);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        const componentType = e.dataTransfer.getData('componentType');
        setFormComponents(prevComponents => [...prevComponents, componentType]);
    };

    const handleFormNameChange = (e) => {
        setFormName(e.target.value);
    };

    const handleSaveForm = () => {
        const savedForms = JSON.parse(localStorage.getItem('savedForms')) || [];
        const form = { formName, formComponents };
        const updatedForms = [...savedForms, form];
        localStorage.setItem('savedForms', JSON.stringify(updatedForms));
        alert('Form saved successfully!');
    };


    return (
        <div className={styles.container}>
            <div className={styles.sidebar}>
                <h2>НАБОР КОМПОНЕНТОВ</h2>
                <p className={styles.greyText}>Можно мышкой перетянуть во вторую колонку любой компонент</p>
                <ul>
                    <li draggable onDragStart={(e) => handleDragStart(e, 'Radio')}>
                        Radio Button
                    </li>
                    <li draggable onDragStart={(e) => handleDragStart(e, 'Checkbox')}>
                        Checkbox
                    </li>
                    <li draggable onDragStart={(e) => handleDragStart(e, 'Select')}>
                        Select
                    </li>
                    <li draggable onDragStart={(e) => handleDragStart(e, 'TextInput')}>
                        Text Input
                    </li>
                    <li draggable onDragStart={(e) => handleDragStart(e, 'TextArea')}>
                        Textarea
                    </li>
                </ul>
            </div>
            <div className={styles.workArea} onDragOver={(e) => e.preventDefault()} onDrop={handleDrop}>
                <h2>НАША ФОРМА</h2>
                {formComponents.map((componentType, index) => (
                    <div
                        key={index}
                        draggable
                        onDragStart={(e) => handleDragStart(e, componentType, index)}
                        onDragOver={(e) => handleDragOver(e, index)}
                        onDragEnd={(e) => e.preventDefault()}
                    >
                        {componentType === 'Radio' && <Radio label="Radio Button" />}
                        {componentType === 'Checkbox' && <Checkbox label="Checkbox" />}
                        {componentType === 'Select' && <Select options={['Option 1', 'Option 2']} />}
                        {componentType === 'TextInput' && <TextInput placeholder="Text Input" />}
                        {componentType === 'TextArea' && <TextArea placeholder="Textarea" />}
                    </div>
                ))}
                <input
                    type="text"
                    placeholder="Enter form name"
                    value={formName}
                    onChange={handleFormNameChange}
                />
                <button onClick={handleSaveForm}>Save Form</button>
            </div>
        </div>
    );
};

export default FormConstructor;

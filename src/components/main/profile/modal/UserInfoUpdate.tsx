"use client";

import React, {useEffect, useState} from "react";
import Modal from "@/components/ui/modal/Modal";
import {CloseSvg} from "@/assets";

interface EditNameModalProps {
    isOpen: boolean;
    onClose: () => void;
    firstname: string;
    lastName: string;
    onSave: (newName: string, newLastName: string) => void;
}

const EditNameModal = ({ isOpen, onClose, firstname, lastName, onSave }: EditNameModalProps) => {
    const [name, setName] = useState(firstname);
    const [lastNameState, setLastName] = useState(lastName);

    useEffect(() => {
        setName(firstname);
        setLastName(lastName);
    }, [firstname, lastName]);

    const handleSave = () => {
        onSave(name, lastNameState);
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className="modal-header">
                <h3>Змінити ім’я і прізвище</h3>
                <button type="button" className="close_button" onClick={onClose}>
                    <CloseSvg className="icon_close_modal" />
                </button>
            </div>
            <div>
                <div className="form-group">
                    <label className="control-label">Ім’я</label>
                    <input
                        type="text"
                        name="text"
                        placeholder="Введіть ім’я"
                        className="form-control"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label className="control-label">Прізвище</label>
                    <input
                        type="text"
                        name="text"
                        placeholder="Введіть прізвище"
                        className="form-control"
                        value={lastNameState}
                        onChange={(e) => setLastName(e.target.value)}
                    />
                </div>
                <button onClick={handleSave} className="continue-button">Зберегти</button>
            </div>
        </Modal>
    );
};

export default EditNameModal;
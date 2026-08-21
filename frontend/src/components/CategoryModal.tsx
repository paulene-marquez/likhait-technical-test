/**
 * Modal for creating a new expense category
 */
import React, { useState } from "react";
import { Modal, TextField, Button } from "../vibes";

interface CategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (name: string) => Promise<void>;
}

export function CategoryModal({ isOpen, onClose, onAdd }: CategoryModalProps) {
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!name.trim()) {
      setError("Category name is required");
      return;
    }
    setIsSubmitting(true);
    setError("");
    try {
      await onAdd(name.trim());
      setName("");
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create category");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setName("");
    setError("");
    onClose();
  };

  const buttonGroupStyle: React.CSSProperties = {
    display: "flex",
    gap: "0.5rem",
    marginTop: "1rem",
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Add Category">
      <div>
        <TextField
          label="Category Name"
          type="text"
          placeholder="e.g. Pets"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            setError("");
          }}
          error={error}
          fullWidth
          required
        />
        <div style={buttonGroupStyle}>
          <Button type="button" variant="primary" onClick={handleSubmit} disabled={isSubmitting} fullWidth>
            {isSubmitting ? "Adding..." : "Add Category"}
          </Button>
          <Button type="button" variant="secondary" onClick={handleClose} disabled={isSubmitting}>
            Cancel
          </Button>
        </div>
      </div>
    </Modal>
  );
}
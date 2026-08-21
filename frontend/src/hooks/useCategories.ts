/**
 * Custom hook for fetching and creating expense categories
 */
import { useState, useEffect, useCallback } from "react";
import { fetchCategories, createCategory } from "../services/api";

interface Category {
  id: number;
  name: string;
}

export function useCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  const loadCategories = useCallback(async () => {
    try {
      setLoading(true);
      const data = await fetchCategories();
      setCategories(data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadCategories();
  }, [loadCategories]);

  const addCategory = useCallback(async (name: string) => {
    const newCategory = await createCategory({ name });
    setCategories((prev) =>
      [...prev, newCategory].sort((a, b) => a.name.localeCompare(b.name)),
    );
    return newCategory;
  }, []);

  return { categories, loading, addCategory, refetch: loadCategories };
}
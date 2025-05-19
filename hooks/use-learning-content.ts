import { useState, useEffect } from 'react';

export interface Tutorial {
    id: string;
    name: string;
    icon: string;
    description: string;
    level: string;
    popular: boolean;
}

export interface Category {
    id: string;
    name: string;
    color: string;
    tutorials: Tutorial[];
}

export function useLearningContent() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchContent() {
            try {
                const response = await fetch('/api/learn');
                if (!response.ok) {
                    throw new Error('Failed to fetch learning content');
                }
                const data = await response.json();
                setCategories(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An error occurred');
            } finally {
                setLoading(false);
            }
        }

        fetchContent();
    }, []);

    return { categories, loading, error };
}

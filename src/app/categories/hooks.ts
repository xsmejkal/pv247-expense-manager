export const deleteCategory = async (id: number): Promise<void> => {
    const response = await fetch(`/api/category/${id}`, {
        method: 'DELETE'
    });

    if (!response.ok) {
        throw new Error('Error deleting category');
    }
};

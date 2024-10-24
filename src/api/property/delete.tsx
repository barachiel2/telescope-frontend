export const deleteProperty = async (propertyId: number): Promise<boolean> => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/properties/${propertyId}/delete_property/`, {
      method: 'DELETE',
    });

    if (response.ok) {
      return true;
    } else {
      console.error('Failed to delete property');
      return false;
    }
  } catch (error) {
    console.error('Error deleting property:', error);
    return false;
  }
};

import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Button, Grid } from '@mui/material';
import { fetchProperties } from '../api/property/fetch'; // Replace with actual fetch call
import { Property } from '../api/property/types'; // Define types for properties
import CreateProperty from './CreateProperty'; // Add a component to create a property
import DeleteProperty from './DeleteProperty'; // Add a component to delete a property
import UpdateProperty from './UpdateProperty'; // Add a component to update a property

interface PropertyListProps {
  portfolioId: number;
}

const PropertyList: React.FC<PropertyListProps> = ({ portfolioId }) => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProperties = async () => {
      setLoading(true);
      setError(null);
      const fetchedProperties = await fetchProperties(portfolioId); // Fetch properties for the given portfolio
      if (fetchedProperties) {
        setProperties(fetchedProperties);
      } else {
        setError('Failed to fetch properties');
      }
      setLoading(false);
    };

    loadProperties();
  }, [portfolioId]);

  const reloadProperties = () => {
    const loadProperties = async () => {
      setLoading(true);
      setError(null);
      const fetchedProperties = await fetchProperties(portfolioId);
      if (fetchedProperties) {
        setProperties(fetchedProperties);
      } else {
        setError('Failed to fetch properties');
      }
      setLoading(false);
    };

    loadProperties();
  };

  if (loading) {
    return <Typography>Loading properties...</Typography>;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <div className="mt-4">
      <CreateProperty portfolioId={portfolioId} onPropertyCreated={reloadProperties} />
      <Grid container spacing={3} className="mt-4">
        {properties.map((property) => (
          <Grid item xs={12} sm={6} md={4} key={property.id}>
            <Card className="shadow-lg transition-transform transform hover:scale-105">
              <CardContent className="p-4">
                <Typography variant="h6" className="font-bold text-blue-500">
                  {property.address}
                </Typography>
                <Typography variant="body2" className="mt-2">
                  Value: ${property.estimated_value}
                </Typography>
                <Typography variant="body2" className="mt-2">
                  Square Footage: {property.square_footage} sq ft
                </Typography>
                <div className="flex justify-between mt-4">
                  <UpdateProperty property={property} onPropertyUpdated={reloadProperties} />
                  <DeleteProperty propertyId={property.id} onPropertyDeleted={reloadProperties} />
                </div>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default PropertyList;

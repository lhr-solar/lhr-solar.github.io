import { useEffect, useState } from 'react';
import { Container, Grid, Button, Loader } from '@mantine/core';
import { useNavigate } from 'react-router-dom';

import {MANIFEST_URL} from "../config.js";

export default function EPlan() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`${MANIFEST_URL}eplan-manifest.json`)
            .then((res) => res.json())
            .then((json) => {
                setData(json);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    if (loading) return <Loader size="xl" style={{ margin: '100px auto', display: 'block' }} />;

    const vehicles = data?.folders || [];

    return (
        <Container size="lg" style={{ paddingTop: 40 }}>
            <Grid gutter="xl">
                {vehicles.map((vehicle) => (
                    <Grid.Col key={vehicle.name} span="content">
                        <Button
                            size="xl"
                            color="green"
                            radius="md"
                            style={{ width: 200, height: 100 }}
                            onClick={() => navigate(`/eplan/${encodeURIComponent(vehicle.name)}`)}
                        >
                            {vehicle.name}
                        </Button>
                    </Grid.Col>
                ))}
            </Grid>
        </Container>
    );
}
